# Para empezar a escribir scripts en bash, sigue estos pasos:

1) Abre un editor de texto: Puedes usar cualquier editor de texto en tu sistema operativo, como vim, nano, gedit, etc.

2) Especifica que es un script de bash: En la primera línea de tu archivo, agrega "#!/bin/bash" para indicar que se trata de un script en bash.

3) Escribe tus comandos: Después de la primera línea, escribe los comandos de bash que quieres ejecutar en el script.

4) Guarda el archivo: Guarda el archivo con una extensión ".sh" para identificarlo como un script.

5) Da permisos de ejecución al archivo: Usa el comando "chmod +x nombre_del_archivo.sh" para dar permisos de ejecución al archivo.

6) Ejecuta el script: Puedes ejecutar el script con el comando "./nombre_del_archivo.sh" en la terminal.

Estos son los pasos básicos para escribir y ejecutar un script en bash. A medida que vayas avanzando en la escritura de scripts, puedes aprender más sobre cómo manejar entrada de usuario, bucles, condicionales, funciones, etc. ¡Buena suerte!

## En bash, hay varias formas de manejar la entrada de usuario:

1) read: El comando "read" permite leer la entrada del usuario y asignarla a una variable. Por ejemplo:

```
echo "Introduce tu nombre:"
read nombre
echo "Hola $nombre"

```
2) $1, $2, ...: Los argumentos de línea de comandos se pueden acceder mediante los números $1, $2, etc. Por ejemplo:

```
echo "El primer argumento es: $1"
echo "El segundo argumento es: $2"

```
3) $@: Esta variable contiene todos los argumentos de línea de comandos. Por ejemplo:

```
echo "Todos los argumentos son: $@"

```
4) $#: Esta variable contiene la cantidad de argumentos de línea de comandos. Por ejemplo:


```
echo "Cantidad de argumentos: $#"

```
## En bash, los bucles se utilizan para repetir una acción una cantidad determinada de veces o hasta que se cumpla una condición específica. 
Hay dos tipos de bucles en bash: for y while.

1) Bucle for: Este tipo de bucle se utiliza para repetir una acción una cantidad determinada de veces. La sintaxis es la siguiente:

```
for variable in secuencia
do
  comandos
done
```

Por ejemplo, el siguiente bucle imprimirá los números del 1 al 5:

```
for i in 1 2 3 4 5
do
  echo $i
done

```

2) Bucle while: Este tipo de bucle se utiliza para repetir una acción mientras se cumpla una condición específica. La sintaxis es la siguiente:

```
while condición
do
  comandos
done

```
Por ejemplo, el siguiente bucle imprimirá los números del 1 al 5:

```
i=1
while [ $i -le 5 ]
do
  echo $i
  i=$((i + 1))
done
```

 


by @roxsross