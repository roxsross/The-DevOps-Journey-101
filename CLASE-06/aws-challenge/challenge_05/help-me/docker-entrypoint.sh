#!/bin/sh -e

set -e

chmod 777 /etc/php/7.2/apache2/php.ini
sed 's+;extension=mysqli+extension=mysqli+g' /etc/php/7.2/apache2/php.ini >> /etc/php/7.2/apache2/bk_php.ini
rm /etc/php/7.2/apache2/php.ini
mv /etc/php/7.2/apache2/bk_php.ini /etc/php/7.2/apache2/php.ini
sed 's+$host = "$DATABASE_DNS";+$host = "'"$DATABASE_DNS"'";+g' /var/www/html/Model/Credentials.php >> /var/www/html/Model/bk_Credentials.php
rm /var/www/html/Model/Credentials.php
mv /var/www/html/Model/bk_Credentials.php /var/www/html/Model/Credentials.php

echo "ServerName localhost" >> /etc/apache2/apache2.conf

#/etc/init.d/apache2 restart

# Start Apache in foreground
/usr/sbin/apache2 -DFOREGROUND