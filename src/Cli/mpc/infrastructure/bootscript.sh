#!/bin/bash

######## docker installation ########

/usr/bin/sudo apt-get update -y
/usr/bin/sudo apt-get install -y ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
/usr/bin/sudo apt-get update
/usr/bin/sudo apt-get install -y docker-ce docker-ce-cli containerd.io
/usr/bin/sudo /usr/sbin/usermod -aG docker ubuntu

######## docker-compose installation ########

/usr/bin/sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
/usr/bin/sudo chmod +x /usr/local/bin/docker-compose

######## mysql client installation ########

/usr/bin/sudo apt-get install mysql-client -y

######## jq installation ########

/usr/bin/sudo apt-get install jq -y

######## end ########
