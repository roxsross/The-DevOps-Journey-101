#!/bin/bash
#Ejemplo 13: estructuras condicionales

if [ $# -ne 1 ]; then
	echo "Número de parámetros incorrecto"
	exit 1
fi

if [ ! -e "$1" ]; then
	echo "No existe el fichero"
	exit 1
fi
if [ -f "$1" ]; then
	echo "$1 es un fichero ordinario"
fi
if [ -r "$1" ]; then
	echo "$1 es un fichero legible"
fi
if [ -s "$1" ]; then
	echo "$1 es un fichero no vacío"
fi
if [ -w "$1" ]; then
	echo "$1 es un fichero modificable"
fi
if [ -x "$1" ]; then
	echo "$1 es un fichero ejecutable"
fi
exit 0

