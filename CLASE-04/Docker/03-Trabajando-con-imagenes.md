# Trabajando con imágenes #

- Ver todas las imágenes en local hasta ahora
```
docker images
# o bien
docker image ls
```

- Filtrar por nombre del repositorio

`docker images nginx`

- Filtrar por nombre del repositorio y tag

`docker images mediawiki:1.39.3`

- Usando --filter

docker images --filter="label=maintainer=NGINX Docker Maintainers <docker-maint@nginx.com>"

### Pulling o descargar una imagen

- pull desde Docker Hub (Registro configurado por defecto)
```
docker pull mysql
```

- Ahora la imagen de mysql está descargada en tu local

`docker images`

> Al no especificar ninguna etiqueta se baja la por defecto, que es latest

#### Descargar una versión/tag específica de una imagen
```
docker pull redis:6.0.5

#Digest: es el hash específico para el contenido específico de una imagen

docker images --digests

#Descargar una imagen por su digest en lugar de por el tag

docker pull redis@sha256:800f2587bf3376cb01e6307afe599ddce9439deafbd4fb8562829da96085c9c5
```

#### Descargar todas las versiones/tags de una imagen

`docker pull -a jenkins`

#### Pull desde un registro diferente a Docker Hub
- Google

`docker run --rm gcr.io/google-containers/busybox echo "hello world"` ```

- Azure

`docker run mcr.microsoft.com/mcr/hello-world`

#### Buscar imágenes en Docker Hub
```
docker search microsoft
docker search google
docker search aws
```

> Al menos 50 estrellas

`docker search --filter=stars=50 --no-trunc nginx`

> Devuelve solo la oficial

`docker search --filter is-official=true nginx`

- Formateo de la salida usando Go

```
docker search --format "{{.Name}}: {{.StarCount}}" nginx

docker search --format "table {{.Name}}\t{{.Description}}\t{{.IsAutomated}}\t{{.IsOfficial}}" nginx

```

- El CLI no te devuelve los tags, pero puedes hacerlo así, instalando JQ (https://stedolan.github.io/jq/)


```
curl -s -S 'https://registry.hub.docker.com/v2/repositories/library/nginx/tags/' | jq '."results"[]["name"]' | sort
```

### Crear un contenedor a partir de una imagen de docker
```
docker run -d --rm -p 9090:80 nginx

#Crear múltiples contenedores de una imagen
docker run -d --rm -p 7070:80 nginx
docker run -d --rm -p 6060:80 nginx
```

#### Crear tu propia imagen ####

#### Dockerfile
[Dockerfile](Dockerfile)

```
cat Dockerfile

#Construccion de la imagen utilizando el Dockerfile

docker build . --tag simple-nginx:v1

#o bien
docker build . -t simple-nginx:v1

cd ..
docker build . -t simple-nginx:v1

#Le decimos dónde está el Dockerfile, pero sigue fallando

docker build . -f files/Dockerfile -t simple-nginx:v1

```


### docker images

- Ahora verás que tienes la imagen alpine descargada, al utilizarla como base, y una nueva llamada simple-nginx que tiene el tag v1

- Se ven todos los cambios que se han hecho para construir en esta imagen, tanto los que vienen 
#de la base como los hechos en el propio Docker file

`docker history simple-nginx:v1`

#### Inspeccionando la imagen puedes saber cuántas capas tiene la misma

`docker inspect simple-nginx:v1`

- Cada instrucción en el Dockerfile genera una capa


#### Ahora crea un contenedor con tu nueva imagen
```
docker run -d --name my_nginx -p 8080:80 simple-nginx:v1

docker ps
```
#### Etiquetar una imagen para subirla a Docker Hub
```
docker tag simple-nginx:v1 roxsross12/simple-nginx:v1

#Comprobamos que la nueva etiqueta se ha generado correctamente

docker images

```

#### Subirla a Docker Hub

`docker push roxsross12/simple-nginx:v1`

- Para comprobar que podemos utilizar nuestra imagen ya en Docker Hub, debemos eliminar la copia que tenemos en local:

- Borramos la imagen de local, utilizando el ID

`docker rmi simple-nginx:v1`

- No nos va a dejar porque tenemos un contenedor ejecutandose con dicha imagen

`docker rm -f my_nginx`

- Ahora debería de dejarnos

`docker rmi simple-nginx` 

#### Ahora intentamos crear un contenedor pero con la imagen que ahora está en Docker Hub

`docker run -d --name my_nginx -p 8080:80 roxsross12/simple-nginx:v1`

- Si intentamos eliminar una imagen y hay algún contenedor que la está utilizando no será posible, dará error, incluso si este ya terminó de ejecutarse.

`docker rmi simple-nginx:v1`

#### Eliminar una imagen
```
docker image rm roxsross12/simple-nginx:v1
docker rmi 0eb3967e4af2
docker image rm nginx roxsross12/simple-nginx:v1
```

#### Eliminar SOLO las imágenes que no se están utilizando
```
docker image prune -a 

#Listar los ids de las imágenes en local
docker images -q

#Eliminar todas las imágenes
docker rmi $(docker images -q) -f

#Automatizar una build a partir del código fuente de tu aplicación
```

#### Accede a https://hub.docker.com con tu usuario y selecciona el repositorio simple-nginx. 

