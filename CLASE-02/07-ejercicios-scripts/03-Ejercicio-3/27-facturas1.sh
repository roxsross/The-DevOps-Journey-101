#!/bin/bash

if [ $# -ne 1 ]; then
  echo "El script no recibió un parámetro."
elif [ ! -f "facturas.csv" ]; then
  echo "El archivo facturas.csv no existe en el directorio actual"
else
  facturas="$(awk -F ';' '{ print $1}' facturas.csv | grep $1 | wc -l)"
  if [ $facturas -eq 0 ]; then
     echo "El usuario $1 no tiene facturas disponibles." 
  else
     echo "El usuario $1 tiene $facturas facturas."
  fi
fi