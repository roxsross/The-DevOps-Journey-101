# Arrancando de local

Un escenario muy habitual es que estamos trabajando en nuestro proyecto en local y decidimos subirlo a *Github* (un consejo para los que tenéis alumnos si están trabajando en una práctica entregable que arranquen directamente
con un repositorio y vayan subiendo cambios al mismo, nunca sabes cuándo se te va a romper el disco duro, o vas a cargarte un código que funcionaba).

Vamos a simular que creamos un proyecto sin tener en cuenta *git*, creamos una carpeta _miproyecto_ y vamos a introducir algunos ficheros (esta parte no tiene que ver con *Git*).

_./src/index.html_

```html
<html>
  <body>
    <h1>Ola Git</h1>
    <script src="./index.js"></script>
  </body>
</html>
```

_./src/index.js_

```js
console.log("¡ Hola Git!");
```

_./package.json_

```json
{
  "name": "01-basic",
  "version": "1.0.0",
  "description": "Let's start with a very basic sample, just add an html plus a simple console log (E5). This is what you can find in the getting started tutorial.",
  "main": "index.js",
  "scripts": {
    "build": "rimraf dist && parcel ./src/index.html",
    "build:prod": "rimraf dist && parcel build ./src/index.html",
    "start": "rimraf dist && parcel ./src/index.html --open"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "parcel-bundler": "^1.12.4",
    "rimraf": "^3.0.2"
  }
}
```

_./readme.md_

```md
# Desde local
```

Bueno, ahora que tenemos todos los ficheros, vamos a ejecutar esta aplicación tonta,... para ello os va a hacer falta instalarnos _nodejs_ (*https://nodejs.org/es/*)

Cerramos terminales por si acaso.

Y ahora vamos a instalar librerías de terceros y ejecutar el proyecto (nos vamos a la carpeta en la que se encuentra el fichero _package.json_):

```bash
npm install
```

```bash
npm start
```

Perfecto, nuestro proyecto está funcionando,... no sería mala idea subirlo a *Github* antes de que la caguemos no? Ya no vale la excusa aquella de *"el perro se comió los apuntes"*.

De primeras vamos a inicializar un repo en local:

```bash
git init
```

Fíjate que ahora nos aparece la carpeta oculta _.git_, ahí está nuestro proyecto (ls -a en linux para ver carpeta oculta).

Vamos a *commitear* los cambios a nuestro repo local, primero tiramos de un *git status* y....

```bash
git status
```

¡Sorpresa! hay carpetas y ficheros temporales que no queremos subir ¿Cómo podemos quitarlos? Vamos a crear un fichero *.gitignore* e indicar que ignore carpetas y ficheros:

_.gitignore_

```bash
.cache/
dist/
node_modules/
package-lock.json
```

> .gitignore acepta ciertos tipos de comodines: https://www.atlassian.com/es/git/tutorials/saving-changes/gitignore#git-ignore-patterns

- Si grabamos a volvemos a hacer un _git status_ podemos ver que ya sólo aparecen los ficheros que queremos subir:

```bash
git status
```

Ahora si podemos pasarlos a *staging*:

```bash
git add .
```

Y podemos comitearlo a nuestra base de datos local:

```bash
git commit -m "commit inicial"
```

Ya lo tenemos en local es hora de subirlo a nuestro repositorio en la nube, no queremos que se nos rompa el disco duro y perdamos todo el trabajo.

Para ello voy a crear un repo en la web de *Github*, esta vez no le pido que meta un *readme* ni nada, lo quiero en blanco para poder apuntar a él desde el local.

** Vamos a *Github* y creamos el repo**

Copiamos la *url* del repo (sea ssh o *https*).

(En el ejemplo *https://github.com/brauliodiez/borrar-local.git*)

- Y le indicamos que vamos a añadir un servidor que llamaremos _origin_ hay irán los *push* que enviemos.

```bash
git remote add origin https://github.com/...
```

Ya podemos subir los archivos de *Github*, al ser la primera vez y estar el repo vacío, tenemos que añadirle algo más de *info* al *push*:

- *set upstream*: este *flag* enlaza la rama local con la que hay en el servidor, en caso de que no exista la crea.
  
- También tenemos que indicarle la rama de trabajo.

```bash
git push --set-upstream origin master
```

> Existen settings para que este comportamiento lo haga por defecto
> y solo tengamos que poner un _git push_ (en teoría el 99% de las
> veces vamos a querer tener el mismo nombre de rama en cliente que
> en servidor)

Si no vamos al portal de *Github* y refrescamos la página del repo, podemos ver que se han subido lo cambios.

Ya si introducimos nuevos cambios en ramas que están sincronizadas con el servidor (y los cambios ya están *commiteados* en local) no nos harían falta parámetros adicionales, simplemente ejecutaríamos _git push_.
