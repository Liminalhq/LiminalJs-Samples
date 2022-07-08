#!/bin/bash

######## ip change ########

pubip=`/usr/bin/curl -4 icanhazip.com`

sed -i 's"tcp://node1:9000"tcp://'$pubip':9000"' /home/ubuntu/config/config.toml

######## docker compose run ########

/usr/local/bin/docker-compose up -d
/usr/local/bin/docker-compose logs >> out.log

######## end ########
