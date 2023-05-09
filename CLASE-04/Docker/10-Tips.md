# Trucos

## Portainer

Portainer es una gestor de contenedores a través de una interfaz web. Para usarlo creamos un directorio donde guardar nuestro _docker-compose.yaml_.

    mkdir -p ~/Sites/portainer
    cd ~/Sites/portainer

Guardamos el siguiente fichero como _docker-compose.yaml_ en nuestro directorio:

    :::yaml
    version: '2'
    
    services:
      portainer:
        image: portainer/portainer
        command: -H unix:///var/run/docker.sock
        volumes:
          - /var/run/docker.sock:/var/run/docker.sock
          - portainer_data:/data
        ports:
          - 127.0.0.1:9000:9000
    volumes:
      portainer_data:

Y ejecutamos el contenedor:

    docker-compose up -d

## Limpieza

Para borrar objetos que no están en uso:

    docker system prune

Para borrar volúmenes que no están asociados a ningún contenedor:

    docker volume rm $(docker volume ls -q -f "dangling=true")

Para borrar contenedores que han terminado su ejecución:

    docker rm $(docker ps -q -f "status=exited")

Para borrar imágenes que no están etiquetadas:

    docker rmi $(docker images -q -f "dangling=true")

## Copias de seguridad

Para hacer una copia de seguridad:

    docker run --rm -v /tmp:/backup \
        --volumes-from <container-name> \
        busybox tar -cvf /backup/backup.tar <path-to-data>

Para restaurar:

    docker run --rm -v /tmp:/backup \
        --volumes-from <container-name> 
        busybox tar -xvf /backup/backup.tar <path-to-data>


## Fuentes de esta página:

1. [https://codefresh.io/docker-tutorial/everyday-hacks-docker/](https://codefresh.io/docker-tutorial/everyday-hacks-docker/)


## Imágenes base

Son las imágenes más conocidas por las que podemos usar para no partir desde cero para crear la nuestra.

* [phusion/baseimage](https://hub.docker.com/r/phusion/baseimage/): 209mb
* [centos](https://hub.docker.com/_/centos/): 200mb
* [debian](https://hub.docker.com/_/debian/): 101mb
* [ubuntu](https://hub.docker.com/_/ubuntu/): 84mb
* [alpine](https://hub.docker.com/_/alpine/): 4.4mb
* [busybox](https://hub.docker.com/_/busybox/): 1.16mb
