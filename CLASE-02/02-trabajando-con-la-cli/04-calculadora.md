# Scripting calculadora

Vamos a crear una calculadora para ver muchas de las capacidades que nos permite el bash scripting.

La versión 1 va a ser algo muy muy simple que nos va a permitir ejecutar el script que nos muestre por pantalla el resultado de dos números _hardcodeados_. Llamaremos a nuestro script `calculadora.sh`:

```bash
echo $((20 + 7))
```

Para ejecutarlo escribiremos en la terminal:

```shell
$ bash calculadora.sh
27
```

También podemos utilizar el comando `.`:

```shell
$ . ./calculadora.sh
27
```

Uno de los problemas de esta aproximación es que podríamos utilizar un intérprete que no fuese el adecuado, por ejemplo si estoy sobre una shell BASH y el contenido de mi script está ejecutado en python el código no se ejecutará como esperamos:

```bash
#!/bin/bash

# Esto es un comentario
echo $((20 + 7))
```

Vamos a darle ahora permisos de ejecución para poder ser ejecutado por comandos como `source` o `.`:

```shell
$ chmod +x calculadora.sh
$ . ./calculadora.sh
27
```

## Variables

En BASH cualquier variable declarada es **global dentro del script**. Vamos a sustituir los valores _hardcodeados_ por variables. Para declarar una variable utilizaremos la sintaxis `<nombrevar>=<valor>` y para leerla antepondremos `$` al nombre de la variable.

Existen

Vamos a modificar nuestro script para utilizar variables:

```bash
#!/bin/bash

OP1=20
OP2=7

# En operaciones aritméticas con $(( )) podemos obviar el `$`
echo $(($OP1 + $OP2))
```

```shell
$ ./calculadora.sh
27
```

> Por convención se utilizan nombres de variables en mayúsculas aunque no es obligatorio.

Un script en BASH puede utilizar argumentos. Los argumentos son referenciados por el signo `$` y su posición numérica empezando por `1`. La variable `$0` indica la shell que ha ejecutado el script o el nombre del propio script.

Vamos a modificar nuestro script para utilizar los operandos como argumentos:

```bash
#!/bin/bash

# $1 representa el primer argumento
# $2 representa el segundo argumento
echo $(($1 + $2))
```

```shell
$ ./calculadora.sh 27 30
57
```

También tenemos otros tipos de parámetros especiales:

- `$@`: Representa todos los argumentos: "$1 $2 $3 ... $n"
- `$$`: Representa el PID del del proceso actual.
- `$#`: Representa el número de argumentos.
- `$?`: Representa el estado de salida del último comando ejecutado.

La lista completa podemos verla [aquí](https://www.gnu.org/software/bash/manual/html_node/Special-Parameters.html).

## Condicionales

Sintaxis:

```
if [ expression ]; then
  instructions
fi

if [ expression ]; then
  instructions
else
  instructions
fi

if [ expression ]; then
  instructions
elif [ expression ]; then
  instructions
fi
```

Los condicionales se pueden escribir de varias formas:

- `if [ expression ]; then`: Equivalente al comando `test`
- `if [[ expression ]]; then`: permite mayor funcionalidad que `[]` y admite operadores como `&&`, `||`, o `=~` (regex match) en vez de `-a` y `-o`.
- `if expression; then`: Evalua la expresión como resultado booleano `0` para `false` y `1` para `true`.
- `if (( expression )); then`: realiza una evaluación aritmética donde podemos usar operadores `<`, `>`, `<=`, `>=`, `==`, etc.

Existe una gran multitud de flags para usar en condiciones, en [este enlace](https://tldp.org/LDP/Bash-Beginners-Guide/html/sect_07_01.html) se detallan todos los casos.

Vamos a actualizar nuestro script para salir con un error si nos faltan argumentos:

```bash
#!/bin/bash

if [[ $# -lt 2 ]]; then
  echo "Error: missing arguments."
  exit 1
fi

echo $(($1 + $2))
```

> Más información sobre [codigos de salida](https://tldp.org/LDP/abs/html/exitcodes.html#EXITCODESREF).

```shell
$ ./calculadora.sh
Error: missing arguments
$ ./calculadora.sh 2
Error: missing arguments
$ ./calculadora.sh 2 10
12
```

## Bucles

Tipos de bucles:

```
for var in list; do
  block
done
```

```
for ((initializer; condition; increment)); do
  block
done
```

```
while [ condition ]; do
  block
done
```

```
until [ condition ]; do
  block
done
```

Vamos a modificar nuestro script para poder sumar un numero dinámico de argumentos.

```bash
#!/bin/bash

TOTAL=0
while [ $# -gt 0 ]; do
  TOTAL=$(($TOTAL + $1))

  # Utilizaremos el comando shift para mover los argumentos 1 a la izquierda.
  # Esto es útil para referenciar al siguiente argumento usando $1
  shift
done

echo $TOTAL
```

```shell
$ ./calculadora.sh
0
$ ./calculadora.sh 22 10
32
$ ./calculadora.sh {1..10}
55
```

## Funciones

Sintaxis:

```
function fun_name() {

}

fun_name() {

}
```

Dentro de una función los argumentos son también referenciados por `$1`, `$2`, etc. Para invocar a una función lo haremos sin paréntesis como si fuera otro comando más.

Vamos a refactorizar nuestra calculadora para usar una función helper:

```bash
#!/bin/bash

sum_numbers() {
  # Podemos declarar variables locales dentro de la función
  # que no son accesibles desde fuera

  local op1=$1
  local op2=$2
  local result=$(($op1 + $op2))
  echo $result
}

TOTAL=0
while [ $# -gt 0 ]; do
  # Recogeremos la salida de la función usando $()
  TOTAL=$(sum_numbers $TOTAL $1)

  # Utilizaremos el comando shift para mover los argumentos 1 a la izquierda.
  # Esto es útil para referenciar al siguiente argumento usando $1
  shift
done

echo $TOTAL
```

## set

El operador `set` se puede utilizar para habilitar ciertos flags para habilitar o deshabilitar diferentes funcionalidades. Para habilitar utilizaremos `set` `-` `<letra>` y para deshabilitar `set` `+` `<letra>`. Algunos ejemplos útiles pueden ser:

### Debugging

Utilizando `set -x` cada instrucción ejecutada se mostrará por consola:

```shell
#!/bin/bash

set -x

sum_numbers() {
  # Podemos declarar variables locales dentro de la función
  # que no son accesibles desde fuera

  local op1=$1
  local op2=$2
  local result=$(($op1 + $op2))
  echo $result
}

TOTAL=0
while [ $# -gt 0 ]; do
  # Recogeremos la salida de la función usando $()
  TOTAL=$(sum_numbers $TOTAL $1)

  # Utilizaremos el comando shift para mover los argumentos 1 a la izquierda.
  # Esto es útil para referenciar al siguiente argumento usando $1
  shift
done

echo $TOTAL
```

```shell
$ ./calculadora.sh 1 2 3
+ TOTAL=0
+ '[' 3 -gt 0 ']'
++ sum_numbers 0 1
++ local op1=0
++ local op2=1
++ local result=1
++ echo 1
+ TOTAL=1
+ shift
+ '[' 2 -gt 0 ']'
++ sum_numbers 1 2
++ local op1=1
++ local op2=2
++ local result=3
++ echo 3
+ TOTAL=3
+ shift
+ '[' 1 -gt 0 ']'
++ sum_numbers 3 3
++ local op1=3
++ local op2=3
++ local result=6
++ echo 6
+ TOTAL=6
+ shift
+ '[' 0 -gt 0 ']'
+ echo 6
6
```

Otro uso útil es poder cortar la ejecución del script si algún comando da error. Para esto utilizaremos `set -e`:

```shell
#!/bin/bash

set -xe

sum_numbers() {
  # Podemos declarar variables locales dentro de la función
  # que no son accesibles desde fuera

  local op1=$1
  local op2=$2
  local result=$(($op1 + $op2))
  echo $result
}

TOTAL=0
while [ $# -gt 0 ]; do
  # Recogeremos la salida de la función usando $()
  TOTAL=$(sum_numbers $TOTAL $1)

  # Vamos a introducir la ejecución de un comando erróneo
  if (( $# == 2 )); then
    ls -l /dev/unexistent
  fi


  # Utilizaremos el comando shift para mover los argumentos 1 a la izquierda.
  # Esto es útil para referenciar al siguiente argumento usando $1
  shift
done

echo $TOTAL
```

```shell
$ ./calculadora.sh {1..3}
+ TOTAL=0
+ '[' 3 -gt 0 ']'
++ sum_numbers 0 1
++ local op1=0
++ local op2=1
++ local result=1
++ echo 1
+ TOTAL=1
+ ((  3 == 2  ))
+ shift
+ '[' 2 -gt 0 ']'
++ sum_numbers 1 2
++ local op1=1
++ local op2=2
++ local result=3
++ echo 3
+ TOTAL=3
+ ((  2 == 2  ))
+ ls -l /dev/unexistent
ls: cannot access '/dev/unexistent': No such file or directory
```

Estos flags podemos añadirlos en el _shebang directamente_:

```bash
#!/bin/bash -xe
...
```

Podemos ver la lista de todas las opciones en [este enlace](https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html).
