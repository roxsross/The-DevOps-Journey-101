##Descargamos UBUNTU
FROM ubuntu

##Actualizamos el sistema
RUN apt-get update

##Instalamos NGINX
RUN apt-get install -y nginx

##Creamos un archivo index.html en el directorio por defecto de nginx
RUN echo 'Ejemplo de POD con KUBERNETES y YAML' > /var/www/html/index.html

##Arrancamos NGINX a través de ENTRYPOINT para que no pueda ser modificado en la creación del contenedor
ENTRYPOINT ["/usr/sbin/nginx", "-g", "daemon off;"]

##Exponemos el Puerto 80
EXPOSE 80
