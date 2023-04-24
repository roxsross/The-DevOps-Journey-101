#!/bin/bash

for i in 1 2 3 4 5
do
    #obtiene una cantidad aleatoria de número de lineas entre 1 y 20
    lineas=$(shuf -i 1-20 -n 1)
    #llama con curl a lipsum.com y le pasa como parámetro la cantidad de líneas
    lorem=$(curl -s https://www.lipsum.com/feed/xml\?amount\=$lineas | sed -n '/<lipsum>/,/<\/lipsum>/p' | sed -e 's/<lipsum>//g' -e 's/<\/lipsum>//g'
)   
    #crea un archivo con el contenido de la variable lorem
    echo "$lorem" >> git-loremipsum-$i.txt
done