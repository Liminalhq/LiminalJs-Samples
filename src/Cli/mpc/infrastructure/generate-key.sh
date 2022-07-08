#!/bin/bash

######## tsm key generation ########

/usr/bin/mkdir /home/ubuntu/config

cd /home/ubuntu/config
/usr/bin/mv /home/ubuntu/config.toml /home/ubuntu/config/

/usr/bin/openssl ecparam -name P-256 -genkey -param_enc named_curve -outform DER -out private.key

/usr/bin/openssl ec -inform DER -in private.key -pubout -outform DER -out public.key

priv=`/usr/bin/openssl base64 -A -in private.key`
pub=`/usr/bin/openssl base64 -A -in public.key`

sed -i 's"privkey1"'$priv'"' config.toml
sed -i 's"pubkey1"'$pub'"' config.toml

sleep 2

######## docker-login ########

echo "3nlP91DZTIVZCe4BPvViE1uUiawWN6xr" | /usr/bin/docker login nexus.sepior.net:19001 --username=shivam --password-stdin

######## end ########
