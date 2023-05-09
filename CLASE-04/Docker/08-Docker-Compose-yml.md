# Ejemplo de un Docker-Compose 

Desarrollar sus aplicaciones con Docker Compose simplifica el proceso de configuración y control de versiones de su infraestructura. Para configurar nuestra aplicación de Laravel, escribiremos un archivo docker-compose que defina nuestro servidor web, nuestra base de datos y nuestros servicios de aplicación.

```
version: '3'
services:
  #Nginx Service
  webserver:
    image: nginx:alpine
    container_name: webserver
    restart: unless-stopped
    tty: true
    ports:
      - "80:80"
      - "443:443"
    networks:
      - app-network

  #MySQL Service
  db:
    image: mysql:5.7.22
    container_name: db
    restart: unless-stopped
    tty: true
    ports:
      - "3306:3306"
    environment:
      MYSQL_DATABASE: laravel
      MYSQL_ROOT_PASSWORD: your_mysql_root_password
      SERVICE_TAGS: dev
      SERVICE_NAME: mysql
    networks:
      - app-network

#Docker Networks
networks:
  app-network:
    driver: bridge
```    

Puedes encontrar todos los parámetros que podemos definir en la [documentación oficial](https://docs.docker.com/compose/compose-file/compose-file-v3/).

Algunos parámetros interesantes:

* Es escenario está formado por `services`. Cada uno ello va a crear un contenedor.
* `restart: always`: Indicamos la política de reinicio del contenedor si por cualquier condición se para. [Más información](https://docs.docker.com/compose/compose-file/compose-file-v3/#restart).
* `depend on`: Indica la dependencia entre contenedores. No se va a iniciar un contenedor hasta que otro este funcionando. [Más información](https://docs.docker.com/compose/compose-file/compose-file-v3/#depends_on).

Cuando creamos un escenario con `docker-compose` se crea una **nueva red definida por el usuario** donde se conectan los contenedores, por lo tanto, obtenemos resolución por dns que resuelve tanto el nombre del contenedor (por ejemplo, `mongo`) como el nombre del servicio (por ejemplo, `db`).
