#!/bin/bash

export PATH=${PATH}:/usr/local/bin

cd /opt/totec/totec2015
git pull
npm install .
service nginx restart
/usr/local/bin/pm2 restart ./process.json

