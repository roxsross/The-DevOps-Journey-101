#!/bin/bash
# Download nginx
docker pull nginx:1.22.1
# Run nginx 
docker run --name challenge03 -v /$(pwd)/web:/usr/share/nginx/html:ro -d -p 9999:80 nginx:1.22.1
docker exec challenge03 ls /usr/share/nginx/html
docker stop challenge03
docker rm challenge03