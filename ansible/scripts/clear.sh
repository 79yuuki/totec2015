#!/bin/bash

export PATH=${PATH}:/usr/local/bin

cd /opt/totec/totec2015
git pull

rm -rf /opt/nginx/proxy_cache/*
service nginx restart

