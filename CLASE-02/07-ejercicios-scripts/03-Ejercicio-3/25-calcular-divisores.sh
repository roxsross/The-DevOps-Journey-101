#!/bin/bash

if [ $# -ne 1 ]; then
  echo "El script no recibió un parámetro."
else
  # Calcular divisores del número recibido por parámetro
  divisores="["
  divisor=1
  while [ $divisor -le $(($1)) ]; do
    if [ $(($1 % $divisor)) == 0 ]; then
      divisores+=" $divisor "
    fi
    let divisor=divisor+1
  done
  divisores+="]"
  
  echo "Los divisores de $1 son $divisores"
fi