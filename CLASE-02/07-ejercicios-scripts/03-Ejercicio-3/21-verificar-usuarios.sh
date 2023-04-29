#!/bin/bash

if [ $# -eq 0 ]; then
  echo "El script no recibió un parámetro."
else
  for user in $@; do
    myuser="$(grep -w "${user}" /etc/passwd | wc -l)"
    if [ $myuser -eq 0 ]; then
       echo "El usuario $user no existe en el sistema."
    else
       echo "El usuario $user existe en el sistema."
    fi
  done
fi
