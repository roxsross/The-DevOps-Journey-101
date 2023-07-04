#!/bin/bash
# Download nginx
docker pull nginx:1.22.1
# Run nginx 
mkdir html
cd html
cat > index.html << EOF
<html><body>Challenge 01</body></html>
EOF
docker run --name challenge01 -v /root/html:/usr/share/nginx/html:ro -d -p 8080:80 nginx:1.22.1