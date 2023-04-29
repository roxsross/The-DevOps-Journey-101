#!/bin/bash

cd ~
mkdir nueva_carpeta
cd nueva_carpeta
> archivo_nuevo.txt
mv archivo_nuevo.txt archivo_viejo.txt

echo "Nueva línea de texto" > archivo_viejo.txt
chmod u+rwx,g+rwx,o+rwx archivo_viejo.txt

cd ..
ln -s nueva_carpeta/archivo_viejo.txt enlace.ln

# eliminar el directorio nueva carpeta
rm -rf ./nueva_carpeta
