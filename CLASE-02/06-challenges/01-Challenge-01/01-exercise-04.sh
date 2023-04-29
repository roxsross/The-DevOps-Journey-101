#!/bin/bash

curl https://es.wikipedia.org/wiki/DevOps > fichero.txt

if [ $# -eq 0 ]; then
  texto="bash"
else
  texto=$1
fi

echo "texto: ${texto}"
line="$(cat fichero.txt | grep -w -n $texto | awk -F ':' '{ print $1 }')"

if [ -z "$line" ]; then
 echo "La palabra no aparece en el archivo"
else
 echo "${line}"
fi
