#!/bin/bash

echo "Lista de argumentos: $@"
echo "Cantidad de argumentos: $#"

mkdir -p foo/{dummy,empty}

if [ $# -eq 0 ]; then
  texto="bash"
else
  texto=$1
fi

echo "$texto" > foo/dummy/file1.txt
touch foo/dummy/file2.txt

cat foo/dummy/file1.txt > foo/dummy/file2.txt
mv foo/dummy/file2.txt foo/empty
