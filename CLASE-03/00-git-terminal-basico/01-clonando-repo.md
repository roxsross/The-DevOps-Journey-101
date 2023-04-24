# Clonando el repositorio

Si revisamos los conceptos previos de Git, tenemos tanto una base de datos en el servidor como bases de datos en local por cada máquina de usuario que quiera trabajar con el repositorio.

## Clonando un repo existente

Partamos de que ya existe el repositorio en *Github* y queremos bajarlo a local para poder trabajar, a este proceso se le llama *"clonado"*
¿Por qué?

- Porque nos conectamos al repositorio en remoto.
- Descargamos la base de datos con todos los *commits* a una base de datos
  local.

Vamos a clonarnos un repositorio, la página del mismo: *https://github.com/roxsross/ejemplo-repo*

Si nos fijamos, pinchando en el botón *code* podemos obtener la dirección para clonarlo via *HTTP* o *SSH*.

La copiamos, nos vamos al terminal, y vamos a crearnos una carpeta de trabajo
dentro de esa carpeta ejecutamos el siguiente comando:

```bash
git clone https://github.com/roxsross/ejemplo-repo
```

Si nos fijamos ya tenemos el repo en nuestro disco duro, vamos a ver esto en detalle:

- Fíjate que por un lado tenemos una carpeta oculta que se llama: _.git_
  si nos metemos dentro podemos ver la *"base de datos"* de Git que se ha creado.

- Por otro lado necesitamos mantener un vínculo con el servidor para sincronizar
  la información, para ello vemos que tenemos ramas (veremos este concepto más
  adelante) marcadas con el prefijo _origin_ y otras que no.

> Ramas: de momento nos quedamos con una explicación corta, son copias del código
> que tiene un ciclo de vida independiente y que podemos mezclarlas más adelante.

Vamos a ejecutar el siguiente comando

```bash
git branch -a
```

> Nota si en vez de _-a_ ponemos _-r_ nos muestra sólo las ramas remotas,
> si no ponemos flag alguno nos muestra sólo las locales.

Aquí podemos ver que tenemos lo siguiente:

```bash
main
remotes/origin/head
remotes/origin/main
```

Es decir tenemos una rama local llamada *"main"*.
Tenemos una rama remota llamada *"main"*.

Y también tenemos un *head*, esto suele coincidir con la rama
*"main"* pero no tiene por qué, le decimos a un clon nuevo que rama
usar como cabeza local.

De esta manera tenemos sincronizado nuestra base de datos local
con la base de datos que nos podemos encontrar en el servidor.

Un tema interesante es que podemos apuntar a múltiples servidores
pero uno sólo se puede llamar _origin_, ya veremos para que puede servir
esto más adelante.

## Creando repo desde la web de Github

Si vas a arrancar un proyecto desde cero y tengo claro que lo voy a tener
desde el día cero en *Github*, podemos directamente crearlo desde la web
de *Github* y clonarlo.

Para ello nos vamos a la web de *github* (nos hará falta tener cuenta de usuario).

Y pulsamos sobre _new_, aquí le damos nombre al repositorio, elegimos que sea
público y es buena idea añadir en los *check* el readme.md así tenemos un
primer *commit* en la rama main (en caso de que no cuando bajemos el
proyecto si hacemos un *git branch -a* no veremos ninguna rama).

Vamos a copiar y clonarnos el repo usando _git clone_.

"*Ojo lluvia*", si seguimos trabajando aquí lo primero que tendremos que
hacer es añadir un fichero _.gitignore_ para ignorar los archivos
temporales de nuestro proyecto.

# Referencias para aprender más:

[Git kraken concepto de Git clone](https://www.gitkraken.com/learn/git/git-clone#:~:text=Git%20clone%20is%20used%20to,checkout%20an%20initial%20branch%20locally.)

[Hebra Stackoverflow como funciona Git Clone](https://stackoverflow.com/questions/16427600/how-git-clone-actually-works)

[Origin head](https://www.reddit.com/r/git/comments/4p5p9o/what_is_the_difference_between_remotesoriginhead/)
