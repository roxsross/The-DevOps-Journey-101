### Ejemplos de scripts en bash para Despliegue de Aplicaciones Web


##Script básico de despliegue:

#!/bin/bash

# Variables de configuración
APP_DIR="/var/www/html/myapp"
GIT_REPO="https://github.com/myuser/myapp.git"

# Detener el servidor web
service apache2 stop

# Eliminar la versión anterior de la aplicación
rm -rf $APP_DIR

# Clonar el repositorio de Git
git clone $GIT_REPO $APP_DIR

# Reiniciar el servidor web
service apache2 start

echo "La aplicación ha sido desplegada correctamente."


##Script de despliegue con actualización de dependencias:

#!/bin/bash

# Variables de configuración
APP_DIR="/var/www/html/myapp"
GIT_REPO="https://github.com/myuser/myapp.git"

# Detener el servidor web
service apache2 stop

# Eliminar la versión anterior de la aplicación
rm -rf $APP_DIR

# Clonar el repositorio de Git
git clone $GIT_REPO $APP_DIR

# Instalar o actualizar dependencias
cd $APP_DIR
composer install

# Reiniciar el servidor web
service apache2 start

echo "La aplicación ha sido desplegada correctamente y las dependencias han sido actualizadas."


##Script de despliegue con migraciones de base de datos:

#!/bin/bash

# Variables de configuración
APP_DIR="/var/www/html/myapp"
GIT_REPO="https://github.com/myuser/myapp.git"

# Detener el servidor web
service apache2 stop

# Eliminar la versión anterior de la aplicación
rm -rf $APP_DIR

# Clonar el repositorio de Git
git clone $GIT_REPO $APP_DIR

# Ejecutar migraciones de base de datos
cd $APP_DIR
php artisan migrate

# Reiniciar el servidor web
service apache2 start

echo "La aplicación ha sido desplegada correctamente y las migraciones de base de datos han sido ejecutadas."


#Estos son solo ejemplos básicos y pueden requerir modificaciones dependiendo de tu entorno y las necesidades de tu #aplicación. Recuerda adaptar los scripts según las rutas de directorio, comandos y tecnologías que estés utilizando #en tu caso específico.

