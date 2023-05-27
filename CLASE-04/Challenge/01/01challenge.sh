#!/bin/bash
# Download mysql
docker pull mysql:5.7
# Download phpmyadmin
docker pull phpmyadmin:apache
# Run Mysql
docker run --name=challenge01-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=challenge01 -d mysql:5.7
# Run PhpMyAdmin
docker run --name=challenge01-phpmyadmin -p 8082:80 --link challenge01-db:db -d phpmyadmin:apache
docker stop challenge01-phpmyadmin
docker rm challenge01-phpmyadmin
docker stop challenge01-db
docker rm challenge01-db