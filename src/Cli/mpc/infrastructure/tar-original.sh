#!/bin/bash

cd /home/ubuntu

/usr/bin/sudo apt-get install zip -y

/usr/bin/zip --password passwd infrastructure-config.zip -r config

######## end ########
