#Imagen que voy a utilizar como base
FROM nginx:alpine

#Etiquetado
LABEL maintainer="roxsross"
LABEL project="devops2023"

#Como metadato, indicamos que el contenedor utiliza el puerto 80
EXPOSE 80

#Modificaciones sobre la imagen que he utilizado como base, en este caso alpine
COPY content/ /usr/share/nginx/html/