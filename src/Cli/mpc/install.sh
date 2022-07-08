#!/bin/bash

######## get all AWS regions ########

reg=`aws ec2 describe-regions --all-regions | grep RegionName | awk '{print $2}' | awk -F'"' '{print $2}'`

areg=`echo $reg`

PS3="Select an AWS region: "

select region in $areg

do
    echo "Selected region is: $region"
    echo "Selected number: $REPLY"
    break;
done

echo "Selected region is $region"

######## get AZ against the selected region ########

zone=`aws ec2 describe-availability-zones --region $region | grep ZoneName | awk '{print $2}' | awk -F'"' '{print $2}'`

azone=`echo $zone`

PS3="Select a AZ: "

select az in $azone

do
    echo "Selected AZ is: $az"
    echo "Selected number: $REPLY"
    break;
done

echo "Selected Availability Zone is $az"

######## copy rds.tf and main.tf to a new file ########

/usr/bin/cp ./infrastructure/main.tf-original ./infrastructure/main.tf
/usr/bin/cp ./infrastructure/rds/rds.tf-original ./infrastructure/rds/rds.tf

######## get AWS AMI's ########

ami=`/usr/bin/aws ec2 describe-images --filters "Name=name,Values=ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64*" --query 'Images[*].[ImageId,CreationDate]' --output text --region $region | sort -k2 -r | head -n10 | tail -1 | awk '{print $1}'`

######## get security group of selected region ########

sg=`/usr/bin/aws ec2 describe-security-groups --region $region --group-names default | grep GroupId | head -1 | awk '{print $2}' | awk -F'"' '{print $2}'`

######## ssh key generation ########

/usr/bin/ssh-keygen -q -t rsa -N '' -f ./ssh/id_rsa

pubkey=`cat ./ssh/id_rsa.pub`

######## replace values in infrastructure/main.tf and infrastructure/rds/rds.tf ########

/usr/bin/sed -i 's"your-region"'$region'"' ./infrastructure/rds/rds.tf
/usr/bin/sed -i 's"your-region"'$region'"' ./infrastructure/main.tf
/usr/bin/sed -i 's"youraz"'$az'"' ./infrastructure/main.tf
/usr/bin/sed -i "s%pubkey%$pubkey%" ./infrastructure/main.tf
/usr/bin/sed -i 's"your-default-sg"'$sg'"' ./infrastructure/main.tf
/usr/bin/sed -i 's"amiid"'$ami'"' ./infrastructure/main.tf

######## terraform installation ########

/usr/bin/sudo apt-get update && sudo apt-get install -y gnupg software-properties-common curl

curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -

sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"

sudo apt-get update && sudo apt-get install -y terraform

######## rds creation ########

cd ./infrastructure/rds
/usr/bin/terraform init
/usr/bin/terraform apply -auto-approve

endpoint=`/usr/bin/terraform output -json myrds | awk -F'"' '{print $2}'`
rdspasswd=`/usr/bin/terraform output -json rdspasswd | awk -F'"' '{print $2}'`
encryptorpasswd=`/usr/bin/terraform output -json encryptormasterpasswd | awk -F'"' '{print $2}'`
tarpasswd=`/usr/bin/terraform output -json tarpass | awk -F'"' '{print $2}'`

echo $tarpasswd > ../../passwd.txt

######## update original config file ########

cd ..

/usr/bin/cp config-original.toml config.toml
/usr/bin/cp tar-original.sh tar.sh

sed -i 's"passwd"'$tarpasswd'"' tar.sh

sed -i 's"/tmp/tsmdb"liminal:'$rdspasswd'@tcp('$endpoint')/mpc?parseTime=true"' config.toml

sed -i 's/sqlite3/mysql/' config.toml

sed -i 's"ENCRYPTION_KEY"'$encryptorpasswd'"' config.toml

######## ec2 creation ########

/usr/bin/terraform init
/usr/bin/terraform apply -auto-approve

eip=`/usr/bin/terraform output -json EIP | awk -F'"' '{print $2}'`

sleep 1

/usr/bin/rm config.toml
/usr/bin/rm tar.sh

sleep 1

cd ..

/usr/bin/scp -i ./ssh/id_rsa -o StrictHostKeyChecking=no ubuntu@$eip:/home/ubuntu/infrastructure-config.zip ../
/usr/bin/scp -i ./ssh/id_rsa -o StrictHostKeyChecking=no ubuntu@$eip:/home/ubuntu/sdk-creds.json ../

######## end ########
