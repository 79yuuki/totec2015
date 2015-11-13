#!/bin/bash

export PATH=${PATH}:/usr/local/bin

rm -rf /opt/nginx/proxy_cache/*
service nginx restart

