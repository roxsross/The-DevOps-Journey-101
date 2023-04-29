#!/bin/bash

if [ $# -ne 1 ]; then
  echo "El script no recibió un parámetro."
elif [ ! -f "facturas.csv" ]; then
  echo "El archivo facturas.csv no existe en el directorio actual"
else
  total="$(awk -F ';' '{ print $1}' facturas.csv | grep $1 | wc -l)"
  if [ $total -eq 0 ]; then
     echo "El usuario $1 no tiene facturas disponibles." 
  else
     echo "$(awk -F ';' '{print $1,$2}' facturas.csv | grep $1)"
  fi
fi