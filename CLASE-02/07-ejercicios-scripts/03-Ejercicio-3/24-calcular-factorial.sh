#!/bin/bash

if [ $# -ne 1 ]; then
  echo "El script no recibió un parámetro."
else
  # Calcular el factorial del número recibido por parámetro
  factorial=1
  divisor=2
  while [ $divisor -le $1 ]; do
    factorial=$(($factorial*$divisor))
    let divisor=divisor+1
  done
  
  echo "El factorial de $1 es $factorial."
fi