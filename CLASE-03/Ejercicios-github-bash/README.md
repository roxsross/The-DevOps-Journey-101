<!-- loremipsum -->
# **`Ejercicio  - GitHub con Bash`** #

1. Crea un nuevo repositorio público de github ***`"loremipsum"`***
---
2. Clona el repositorio en tu local
---
3. Crea una nueva rama en tu repositorio local, llamada ***`"generarlipsum"`***.
---
4. Agrega  a tu repositorio el archivo ***`lipsum.sh`*** que se provee adjunto a esta tarea.
---
5. Genera los 5 archivos txt basándose en el sitio ***`lipsum.com`***,***`(ejecutando ./lipsum.sh).`***
---
6. Verifica que se crearon los cinco archivos y que tengan contenido.
---
7. Crea un commit con los archivos generados y el ***`lipsum.sh`***, luego haz un push a tu repositorio en github.
---
8. Codifica un nuevo archivo, ***`"contar.sh"`***, que lea cada uno de los txt generados y luego devuelva por cada archivo, la cantidad de líneas de ese archivo.
---
```
9.  Al ejecutar el archivo ( ./contar.sh), se deben mostrar la cantidad de líneas que tiene cada uno, por ejemplo:
    
    * git-loremipsum-1.txt tiene 4 líneas.
    * git-loremipsum-2.txt tiene 7 líneas.
    * git-loremipsum-3.txt tiene 15 líneas.
    * git-loremipsum-4.txt tiene 7 líneas.
    * git-loremipsum-5.txt tiene 16 líneas.
```
---
10. Crea un nuevo commit en la rama "generarlipsum" sumando el nuevo archivo "contar.sh"
Realiza un merge de tu rama "generarlipsum" a la rama principal de tu repositorio usando una Pull Request.
---

>## **`Comandos que te pueden servir para resolver este ejercicio:`** ##

* echo
* wc
* man {comando}


#### Salida
```
> tree
.
├── README.md
├── contar.sh
├── lipsum.sh
├── git-loremipsum-1.txt
├── git-loremipsum-2.txt
├── git-loremipsum-3.txt
├── git-loremipsum-4.txt
└── git-loremipsum-5.txt
```
