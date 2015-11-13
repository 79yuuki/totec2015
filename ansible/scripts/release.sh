#!/bin/bash

export PATH=${PATH}:/usr/local/bin

cd /opt/totec/totec2015
git pull
npm install .
rm -rf /opt/nginx/proxy_cache/*
service nginx restart
/usr/local/bin/pm2 restart ./process.json

