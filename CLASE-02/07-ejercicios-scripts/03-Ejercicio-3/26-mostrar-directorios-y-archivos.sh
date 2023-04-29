#!/bin/bash

if [ $# -ne 1 ]; then
  echo "El script no recibió un parámetro."
else
  if [ ! -d $1 ]; then
     echo "El directorio $1 no existe";
  else 
     files="$(ls $1 -l | grep ^- | wc -l)"
     echo "Archivos en el directorio $1: $files"

     folders="$(ls $1 -al | grep ^d | wc -l)"
     echo "Directorios en el directorio $1: $(($folders-2))"
  fi
fi