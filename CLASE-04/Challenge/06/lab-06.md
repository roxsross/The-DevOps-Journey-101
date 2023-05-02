## Lab-06
---
Poke Python
=====================================

La intención es el uso de Dockerfiles y la construcción de imágenes en Docker.

- Muévete al directorio a través de la CLI y ejecuta el comando docker build para construir una nueva imágen de Docker en base al Dockerfile existente en el repositorio, por ejemplo `docker build -t roxsross12/pokepy-ejemplo:1.0 .`, donde roxsross12 es el nombre de usuario en DockerHub, pokepy-ejemplo es el nombre que le vas a poner a tu imagen (puede ser cualquiera, el que tu gustes), y 1.0 la versión de tu imagen (puedes utilizar cualquier versión para este ejemplo)

- Utiliza el comando docker images para que puedas listar todas las imágenes existentes en tu computadora o máquina host. Si te das cuenta, la nueva imagen que acabas de construir debería estar listada ahí

- Instancia un contenedor en base a esa nueva imagen utilizando docker run

- Verifica que tu contenedor está corriendo correctamente por medio de http://localhost:5000/

- Esta imágen existe solamente en tu máquina host, puedes proceder a subirla a tu cuenta de docker hub utilizando el comando docker push o bien, borrarla de tu máquina local con docker rmi <image-name>


### Entrega

- Crear Dockerfile
- La Aplicación se expone en el puerto 5000
- Contruir la imagen
- Pushear la Imagen a DockerHub

