#!/bin/bash

/usr/bin/rm ./passwd.txt

cd infrastructure
/usr/bin/terraform apply -destroy -auto-approve

sleep 2

/usr/bin/rm .terraform* terraform.tfstate* -rf

cd rds

/usr/bin/terraform apply -destroy -auto-approve

echo "resources destroyed successfully" > /dev/null

/usr/bin/rm .terraform* terraform.tfstate* -rf

######## remove ssh keys, main.tf and rds.tf ########

cd ../../

/usr/bin/rm ./ssh/id_rsa*
/usr/bin/rm ./infrastructure/main.tf
/usr/bin/rm ./infrastructure/rds/rds.tf

######## end ########
