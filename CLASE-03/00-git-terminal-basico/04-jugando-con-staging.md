# Jugando con staging

Hacer los pasos perfectos, está bien, pero somos humanos y de cuando en cuando metemos alguna cagada que otra, por ejemplo que pasemos a *staging* un montón de ficheros temporales y nos quedemos con la cara de ¿Y ahora qué hago?...

En esta sección aprendemos a manejarnos con *staging*, pero no cubrimos como deshacer *commits*, esto lo veremos en la sección de avanzado, ya que este paso puede ser mucho más delicado.

Seguimos con el ejemplo anterior de repositorio local (también valdría otro anterior que tengas abierto)

Vamos a crear un fichero que se llame

_./src/temporal.txt_

```text
Soy un fichero temporal
```

_./src/definitivo.txt_

```text
Soy un fichero definitivo
```

Andamos un poco despistados y añadimos ambos ficheros a *staging*

```bash
git add .
```

Cuando hacemos un _git status_ nos damos cuenta de la cagada:-@

```bash
git status
```

Aquí tenemos dos soluciones, si es un porrón de ficheros, igual recoger carretes y quitar de staging todos los ficheros (botón de pánico):

```bash
git reset
```

Si es sólo un fichero, podemos indicarle directamente el fichero a pasar de *staging* a modificado:

```bash
git reset HEAD ./src/temporal.txt
```

Si ahora hacemos un *git statu*s podemos ver que sólo está en *staging* el fichero que esperábamos.

Veamos otro caso

Volvemos al casillero inicial:

```bash
git reset
```

Y vamos a modificar el fichero _index.html_

```diff
<html>
  <body>
-    <h1>Hola Git</h1>
+    <h1>Aqui va un cambio</h1>
    <script src="./index.js"></script>
  </body>
</html>
```

Si hacemos un _git status_ podemos ver que hay dos ficheros nuevos, y uno existente con modificaciones, los tres no están en el área de staging.

```bash
git status
```

Imaginemos que todo el trabajo que hemos hecho eran pruebas tontas, y queremos volver al punto inicial en el que estábamos, en este caso tenemos dos comandos a mano.

El primero devuelve al estado inicial los ficheros trackeados, es decir pierdes las modificaciones, PEEERO no toca los ficheros que son nuevos.

```bash
git checkout -- .
```

Si echamos un ojo a lo que ha pasado:

```bash
git status
```

Tenemos que _index.html_ ha vuelto al estado inicial.

Y los ficheros nuevos, al no estar en la rama inicial se quedan como están.

En 2019 apareció un nuevo comando _git restore_ este nos elimina los cambios de ficheros trackeados estén o no en *staging*.

```bash
git restore .
```

> Si te sale este error _git: 'restore' is not a git command_ puede que tengas una versión antigua de Git, para saber en qué versión estás ejecuta _git --version_

¿Y si queremos borrar los archivos _untracked_? Mucho cuidado con esta opción, nos cargamos esos ficheros sin vuelta atrás.

Para ello:

Primero corremos una simulación y le pedimos que nos liste cuales son los ficheros que se va a cargar:

```bash
git clean -n
```

Una vez que revisamos los ficheros y nos aseguramos que los queremos eliminar ya ejecutamos el _clean_ (fíjate el peligro que tiene que Git te obliga a que le pongas el _--force_)

```bash
git clean --force
```

# Referencias

[Unstage files on Git](https://devconnected.com/how-to-unstage-files-on-git/)

[Git restore](https://git-scm.com/docs/git-restore)

[Git clean](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/How-to-use-the-git-clean-command)
