# Introducción a BASH

## Características básicas

Para utilizar el valor de una variable la prefijaremos con el carácter `$`:

### Redirección

Los comandos tienen una entrada y una salida. A la hora deje ejecutar cada comando podemos alterar su entrada y salida utilizando una notación especial reconocida por la _shell_. Cada redirección puede venir precedida por un **descriptor de fichero** en forma de número o palabra. Podemos ver los descriptores de ficheros dentro de `/dev/fd/`.

Existen diferentes descriptores:

- `0`: Representa la entrada estandar o STDIN
- `1`: Representa la salida estandar o STDOUT
- `2`: Representa la salida entandar de errores o STDERR
- del `3` al `9`: Reservados para abrir ficheros adicionales

Los operadores de redirección sólo pueden usados con un argumento, es decir, sólo puede haber un descriptor de entrada y un descriptor de salida. Si se intenta utilizar múltiples descriptores del mismo tipo BASH producirá un error.

### Operadores de salida estandar

El operador de redirección `>` se utiliza para redirigir la salida de un fichero descriptor a otro a la hora de ejecutar un comando. Si no añadimos este operador por defecto se utilizará el descriptor `/dev/fd/1`.

La siguiente sintaxis `command > filename` redirigirá la salida estándar producida por el comando `command` al fichero `file`. Es equivalente a escribir `command 1> filename`.

Caben destacar dos aspectos importantes de esta sintaxis:

- Si el fichero no existe será creado.
- Si el fichero existe su contenido será reemplazado por la salida del comando.

```shell
$ ls
$ echo "This is the content" > file.txt
$ ls
file.txt
$ cat file.txt
This is the content
```

Veamos qué ocurre si utilizamos la misma redirección pero con otro contenido:

```shell
$ ls
file.txt
$ echo "Now the content is different" > file.txt
$ ls
file.txt
$ cat file.txt
Now the content is different
```

El operador `>>` realiza la misma operación `>` con la diferencia que añade el contenido de la salida estandar al contenido del fichero en vez de reemplazarlo. Es equivalente a escribir `command 1>> filename`.

```shell
$ ls
file.txt
$ ls
file.txt
$ cat file.txt
Now the content is different
$ echo "This is a new line" >> file.txt
$ cat file.txt
Now the content is different
This is a new line
```

Si escribimos un `2` delante del comando de redirección indicaremos que queremos cambiar la salida estandar de errores a un fichero:

```shell
## El comando `ls` muestra un error si no puede acceder a un fichero especificado. En este caso STDOUT y STDERR son mostrados por consola.
$ ls file.txt unexistent.txt
ls: cannot access 'unexistent.txt': No such file or directory
-rw-rw-r-- 1 vagrant vagrant 48 Aug 29 20:33 file.txt
## Veamos qué ocurre si redirigimos STDOUT pero no STDERR.
$ ls -l file.txt unexistent.txt > file-stats.txt
ls: cannot access 'unexistent.txt': No such file or directory
$ cat file-stats.txt
-rw-rw-r-- 1 vagrant vagrant 48 Aug 29 20:33 file.txt
## Vamos a usar STDERR como salida a fichero en vez de STDOUT
$ ls -l file.txt unexistent.txt 2> file-stats.txt
-rw-rw-r-- 1 vagrant vagrant 48 Aug 29 20:33 file.txt
$ cat file-stats.txt
ls: cannot access 'unexistent.txt': No such file or directory
## Augararemos ahora las salidas de STDERR y STDOUT a diferentes ficheros
$ ls -l file.txt unexistent.txt > file-stats.txt 2> errors.txt
$ cat file-stats.txt
-rw-rw-r-- 1 vagrant vagrant 48 Aug 29 20:33 file.txt
$ cat errors.txt
ls: cannot access 'unexistent.txt': No such file or directory
```

Existe un _shorthand_ para redirigir ambos STDOUT y STDERR a un mismo fichero utilizando la sintaxis `command &> filename`:

```shell
$ ls -l file.txt unexistent.txt &> file-stats.txt
$ cat file-stats.txt
ls: cannot access 'unexistent.txt': No such file or directory
-rw-rw-r-- 1 vagrant vagrant 48 Aug 29 20:33 file.txt
```

El carácter `&` también se puede utilizar para redirigir el contenido de un descriptor de un fichero a otro.

La sintáxis `&> filename` es equivalente a `1> filename 2>&1 filename` o a `2> filename 1>&2`:

```shell
$ ls -l file.txt unexistent.txt 2> file-stats.txt > file-stats.txt
$ cat file-stats.txt
ls: cannot access 'unexistent.txt': No such file or directory
-rw-rw-r-- 1 vagrant vagrant 48 Aug 29 20:33 file.txt
```

Existen casos donde no nos interesa la salida de un comando y queremos suprimirla, por ejemplo, para comprobar que el comando se ha ejecutado correctamente. Existe un disposito virtual que es capaz de descartar cualquier valor escrito llamado `/dev/null` que podemos utilizar para este propósito:

```shell
$ ls
all-files.txt  errors.txt  file-stats.txt  file.txt  other.txt
## Descartamos STDOUT pero vemos no STDERR
$ ls file.txt unexistent.txt > /dev/null
ls: cannot access 'unexistent.txt': No such file or directory
## Descartamos STDERR pero vemos no STDOUT
$ ls file.txt unexistent.txt &> /dev/null
file.txt
## Descartamos STDOUT y STDERR
$ ls file.txt unexistent.txt &> /dev/null
```

### Operadores de entrada

El operador `<` se utiliza para redirigir la entrada al fichero descriptor de la izquierda con el contenido del fichero de la derecha. Si especificamos el fichero descriptor de la izquierda utilizará por defecto `/dev/fd/0`.

La siguiente sintaxis `command < filename` (equivalente a `command 0< filename`) leerá el fichero `filename` y volcará su contenido en el _STDIN_ del comando. Veamos ejemplos:

```shell
$ echo -e "This is the first line\nThis is the second line" > file.txt
$ grep "first" < file.txt
This is the first line
$ grep "third" < file.txt
```

El operador `<` de entrada es perfectamente combinable con los operadores de salida `<` y `<<`.

### Heredocument

Existen casos en los que queremos utilizar un bloque de texto multilinea a un comando sin tener que crear previamente un fichero para guardar su contenido. Un Heredocument es un tipo de redirección que permite pasar múltiples lineas de entrad a un comando. Su sintaxis es la siguiente:

```
command << DELIMITER
  YOUR TEXT
  WITH MULTIPLE
  LINES
DELIMITER
```

La palabra `DELIMITER` puede ser cualquier palabra que queramos y se utiliza para indicar el final del _heredocument_. Hay que utilizar una palabra con cuidado ya que si esta palabra está dentro del contenido podríamos enviar el texto cortado. Comúnmente se escribe `EOF` para indicar _End Of File_.

Veamos el ejemplo anterior utilizando _heredocument_:

```shell
$ grep "first" << EOF
This is the first line
This is the second line
EOF
This is the first line
$ grep "second" << FIN_DOCUMENTO
This is the first line
This is the second line
FIN_DOCUMENTO
This is the first line
```

Hay que tener cuidado si nuestro contenido tiene variables ya que serán sustituidas a menos que las prefijemos con `\` o encerremos el delimitador del _heredoc_ entre comillas simples `'`:

```shell
$ cat > tips.txt << EOF
Para saber el directorio actual podemos usar la variable \$PWD
Ahora mismo estoy en $PWD
EOF
$ cat tips.txt
Para saber el directorio actual podemos usar la variable $PWD
Ahora mismo estoy en /home/vagrant
## Con comillas simples
$ cat > tips.txt << 'EOF'
Para saber el directorio actual podemos usar la variable $PWD
Ahora mismo estoy en $PWD
EOF
$ cat tips.txt
Para saber el directorio actual podemos usar la variable $PWD
Ahora mismo estoy en $PWD
```

> Si utilizamos `<<-` en vez de `<<` conseguiremos que todos los caracteres de tabulación (`\t`) que precedan las líneas sean eliminados. **Esto no funciona con espacios en blanco**:

### Pipelines

Una _pipeline_ o _pipe_ es una característica muy conveniente que se utiliza para adjuntar la salida estandar (_STDOUT_) de un proceso a la entrada estandar (_STDIN_) de otro como si de un _stream_ se tratase. La sintaxis es la siguiente:

```
<command1> <...args> | <command2> <...args> | <command3> ...<args> ...
```

Las _pipelines_ almacenan la salida de un comando en un buffer y son capaces de manejar la presión del flujo de entrada y salida automáticamente.

Veamos varios ejemplos:

```shell
# Contar cuántas palabras tiene el contenido de una API:
$ curl -s http://metaphorpsum.com/sentences/3 | wc -w
33
## Contar el número de ocurrencias de la palabra "the" devuelta por la API:
$ curl -s http://metaphorpsum.com/paragraphs/3 | grep -io "the" | wc -l
```

### Brace expansion

_Brace expansion_ es una potente utilidad para generación de strings utliza las llaves `{` y `}` con caracteres separados por comas para crear nuevos strings separados por espacios:

```shell
## Anteponer "file" al string 1 2 y 3
$ echo file{1,2,3}
file1 file2 file3
## Crear "folder-a" "folder-b" y "folder-c"
$ mkdir folder-{a,b,c}
## Copiar un fichero y añadir extensión ".backup"
$ touch file.txt
$ cp file.txt{,.backup}
```

Es posible crear combinaciones de múltiples expansiones si las juntamos:

```shell
$ echo {a,b,c}{1,2,3,4}
a1 a2 a3 a4 b1 b2 b3 b4 c1 c2 c3 c4
```

También podemos utilizar dos puntos `..` para generar secuencias:

```shell
$ echo {1..10}
1 2 3 4 5 6 7 8 9 10
$ echo {10..-3}
10 9 8 7 6 5 4 3 2 1 0 -1 -2 -3
$ $ echo {a..z}
a b c d e f g h i j k l m n o p q r s t u v w x y z
$ echo {Z..A}
Z Y X W V U T S R Q P O N M L K J I H G F E D C B A
```

### Variable expansion

La expansión de variables es una potente herramienta para modificar el contenido de una variable. Utiliza diferentes variaciones sintácticas para realizar unas operaciones u otras. Se utiliza mediante el `$` con llaves. Vamos a ver varios ejemplos:

```shell
## Utilizar un valor por defecto si la variable no tiene contenido
$ echo ${PORT:-80}
80
## Ahora que la hemos declarado y tiene valor no veremos de nuevo "80"
$ PORT=443
$ echo ${PORT:-80}
443
## Lanzar un error con mensaje si la variable no tiene valor
$ echo ${PASSWORD:?'Password is unset'}
## Utilizar el valor a partir de un offset
$ MYVALUE="This has some content"
$ echo ${MYVALUE:5}
has some content
## Utilizar un subconjunto del valor ${VAR:OFFSET:LENGTH}
$ echo ${MYVALUE:9:4}
some
## Reemplazar patrones por valores en el contenido de la variable
$ echo ${MYVALUE/some/no}
This has no content
## Reemplazar todas las ocurrencias del patrón por valores en el contenido de la variable
$ echo ${MYVALUE/[aeiou/e}
Thes hes seme text
## Reemplazar prefijo con las ocurrencias del patrón
$ echo ${MYVALUE/#This/That}
That has some content
## Reemplazar sufijo con las ocurrencias del patrón
$ echo ${MYVALUE/%content/text}
Thit has some text
```

Existen más variantes que se pueden ver en la [documentación](https://tldp.org/LDP/abs/html/parameter-substitution.html).

### Expansión aritmética

Con el operador `$` junto con doble paréntesis podemos hacer operaciones aritméticas. Veamos algunos ejemplos:

```shell
$ echo $((34 * 10))
340
$ echo $((24 == 24))
1
```

El listado de operadores aritméticos se pueden ver en la [documentación](https://www.gnu.org/software/bash/manual/html_node/Shell-Arithmetic.html#Shell-Arithmetic).

### Expansión de nombre de ficheros

Podemos utilizar ciertos caracteres a la hora de realizar operaciones para crear patrones que BASH escaneará para encontrar ficheros que coincidan.

El asterisco `*` junto a una cadena significa cualquier carácter repetido cualquier número de veces. Si no encuentra ningún fichero o directorio con ese patrón mostrará un error:

```shell
$ ls folder*
folder-a:

folder-b:

folder-c:

folder1:
owo.txt

folder2:
owo.txt

folder3:
```

```shell
$ ls folder*
ls: cannot access 'folder*': No such file or directory
```

El interrogante `?` se utiliza como _placeholder_ de un carácter. BASH tomará el interrogante como cualquier carácter:

```shell
## Creamos fichero "tip.txt", "tips.txt" y "tipo.txt"
$ touch tip{,o,s}.txt
$ ls -l tip?.txt
-rw-rw-r-- 1 vagrant vagrant  0 Sept  4 16:57 tipo.txt
-rw-rw-r-- 1 vagrant vagrant 88 Sept  4 16:57 tips.txt
```

También podemos encerrar ciertos caracteres entre corchetes `[ ]` para hacer coincidir caracterees específicos:

```shell
$ touch tiph.txt
## Hace matching con "tipo.txt" y "tiph.txt" pero no "tips.txt"
$ ls -l tip[oh].txt
-rw-rw-r-- 1 vagrant vagrant 0 Oct  4 17:00 tiph.txt
-rw-rw-r-- 1 vagrant vagrant 0 Oct  4 16:57 tipo.txt
```
