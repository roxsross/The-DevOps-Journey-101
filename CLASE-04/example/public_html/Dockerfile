FROM debian
RUN apt-get update -y && apt install -y apache2
COPY src/* /var/www/html/
CMD ["/usr/sbin/apache2ctl", "-D" , "FOREGROUND"]