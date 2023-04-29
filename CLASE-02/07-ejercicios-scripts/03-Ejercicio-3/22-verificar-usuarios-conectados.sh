#!/bin/bash

if [ $# -eq 0 ]; then
  echo "El script no recibió un parámetro."
else
  # Usuarios logueados
  loggedUsers="$(who -u)"
  for user in $@; do
    myuser="$(grep -w "${user}" /etc/passwd | wc -l)"
    if [ $myuser -eq 0 ]; then
       answer="El usuario $user no existe"
    else
       answer="El usuario $user existe"
       logged="$(echo $loggedUsers | grep -w "${user}" | wc -l)"
       if [ $logged -eq 0 ]; then
	 answer+=" y no está logueado en el sistema."
       else
	 answer+=" y está logueado en el sistema."
       fi
    fi
  echo $answer
  done
fi
