FROM ubuntu:18.04

#Enviroment
ENV TZ=America/Lima
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_RUN_DIR /var/run/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_SERVERADMIN admin@localhost
ENV APACHE_SERVERNAME localhost
ENV APACHE_DOCUMENTROOT /var/www/html
ENV APACHE_PID_FILE  /var/run/apache2/apache2.pid

#Application
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \
    apt-get update && \ 
    apt-get install php libapache2-mod-php -y && \
    apt-get install php-mysqli -y

#Copy
COPY . /var/www/html/

#Entrypoint
RUN chmod +x /var/www/html/Model/CoffeeModel.php
RUN chmod +x /var/www/html/docker-entrypoint.sh
ENTRYPOINT ["/var/www/html/docker-entrypoint.sh"]

#Expose
EXPOSE 80