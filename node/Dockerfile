###como buena practica siempre fijar versiones especificas de la imagen base
FROM node:alpine3.16
#Crear directorio de trabajo dentro del contenedor
WORKDIR /app
#Copio archivo de gestion de depedencia node
COPY ./ /app/
# Descargo dependencia
RUN npm install 
#Expone el puerto 8080 en el contenedor
EXPOSE 8080
#Establece el comando sobre como correra la aplicacion
CMD ["sh","-c","npm start"]
#CMD npm run start
#CMD ["npm", "run", "start"]
#CMD [node index.js]