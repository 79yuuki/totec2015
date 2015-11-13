#!/bin/bash

export PATH=${PATH}:/usr/local/bin

cd /opt/totec/totec2015
git pull
npm install .
pm2 restart ./process.json

