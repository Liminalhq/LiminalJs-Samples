#!/bin/bash

######## ip change ########

pubip=`/usr/bin/curl -4 icanhazip.com`

sed -i 's"http://localhost:8000"http://'$pubip':8000"' /home/ubuntu/config/user.json

######## add public key ########

pub=`/usr/bin/openssl base64 -A -in /home/ubuntu/config/public.key`

/usr/bin/jq --arg e "$pub" '.publicKey += [$e]' /home/ubuntu/config/user.json > /home/ubuntu/tmp-sdk-creds.json

######## add creds in sdk-creds.json ########

usrid=`/usr/bin/cat tmp-sdk-creds.json | grep userID | awk '{print $2}' | awk -F'"' '{print $2}'`
httpurl=`/usr/bin/cat tmp-sdk-creds.json | jq .urls | tr -d '[]' | awk -F'"' '{print $2}' | awk 'NF > 0'`
passwd=`/usr/bin/cat tmp-sdk-creds.json | jq .passwords | tr -d '[]' | awk -F'"' '{print $2}' | awk 'NF > 0'`
pubkey=`/usr/bin/cat tmp-sdk-creds.json | jq .publicKey | tr -d '[]' | awk -F'"' '{print $2}' | awk 'NF > 0'`


sed -i 's"usrid"'$usrid'"' /home/ubuntu/sdk-creds.json
sed -i 's"httpurl"'$httpurl'"' /home/ubuntu/sdk-creds.json
sed -i 's"passwd"'$passwd'"' /home/ubuntu/sdk-creds.json
sed -i 's"pubkey"'$pubkey'"' /home/ubuntu/sdk-creds.json

######## end ########
