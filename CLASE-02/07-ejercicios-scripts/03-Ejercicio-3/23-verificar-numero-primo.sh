#!/bin/bash

if [ $# -ne 1 ]; then
  echo "El script no recibió un parámetro."
else
  # Verificar si el número recibido por parámetro es primo
  mitad=$(($1/2));
  divisor=2
  esPrimo=1
  while [ $divisor -lt $(($mitad)) ]; do
    if [ $(($1 % $divisor)) == 0 ]; then
      esPrimo=0
    fi
    let divisor=divisor+1
  done
  
  if [ $esPrimo == 0 ]; then
    echo "El número $1 no es primo."
  else
    echo "El número $1 es primo."
  fi
fi
