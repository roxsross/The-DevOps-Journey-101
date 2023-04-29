#!/bin/bash

if [ $# -eq 1 ]; then
  if [ ! -f $1 ]; then
       echo "El archivo $1 no existe";
  elif [ ! -x $1 ]; then
       echo "El archivo $1 no tiene permisos de ejecución."
  else
       echo "El archivo $1 tiene permisos de ejecución."
  fi
else
  echo "El script no recibió un parámetro."
fi
