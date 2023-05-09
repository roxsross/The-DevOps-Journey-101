# Creación de contenedores desde imágenes

Si navegas un poco por las distintas imágenes que encuentras en el registro de Docker Hub, te darás cuenta, que existen tres tipos de imágenes según la utilidad que nos ofrecen.

* Ejecutaremos contenedores de distintos sistemas operativos (Ubuntu, CentOs, Debian, Fedora....).
* Ejecutaremos contenedores que tengan servicios asociados (Apache, MySQL, Tomcat....).
* Ejecutaremos contenedores que tengan servicios asociados y que tienen instalada alguna aplicación web (WordPress, Nextcloud,...)

Todas las imágenes tiene definidas un proceso que se ejecuta por defecto, pero en la mayoría de los casos podemos indicar un proceso al crear un contenedor.

Por ejemplo en la imagen `ubuntu` el proceso pode defecto es `bash`, por lo tanto podemos ejecutar:

```bash
$ docker run -it --name contenedor1 ubuntu 
```

Pero podemos indicar el comando a ejecutar en la creación del contenedor:

```bash
$ docker run ubuntu /bin/echo 'Hello world'
```

Otro ejemplo: la imagen `httpd:2.4` ejecuta un servidor web por defecto, por lo tanto al crear el contenedor:

```bash
$ docker run -d --name my-apache-app -p 8080:80 httpd:2.4
```