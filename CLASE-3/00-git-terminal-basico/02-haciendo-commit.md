# Commit push

Vamos ahora a aprender a guardar cambios en nuestra base de datos en local y a subirlos a nuestro servidor.

Para que podáis trabajar con vuestro propio proyecto y poder subir cambios, vamos a "fotocopiar" el proyecto original, para ello haremos un *fork* desde *Github*.

Lo que esto hace es copiar todo tal cual como si fuera un proyecto tuyo, así tienes permisos para poder subir cambios, sin modificar el proyecto original.

> Sobre Fork en más detalle más adelante.

Ahora que tenemos el repositorio *forkeado*, vamos a clonarlo (ya sabéis como, un compañero comparte pantalla y clona).

*pequeño ejercicio*

Para comprobar que hemos clonado el repo correcto, podemos ejecutar el siguiente comando:

```bash
git remote -v
```

Vamos a introducir un cambio en el fichero _index.html_, cambiemos el saludo a Gallego:

_./src/index.html_

```diff
<html>
  <body>
-    <h1>Hola Git</h1>
+    <h1>Ola Git</h1>
    <script src="./index.js"></script>
  </body>
</html>
```

- De cara a subir esto a servidor toca recordar conceptos, tenemos cuatro estados para los ficheros
  - *Untracked* (en este caso el fichero no está ignorado).
  - *Unmodified* (el fichero index.html está modificado, así que este estado no aplica).
  - *Modified* (el fichero si ha sido modificado, _USTED ESTÁ AQUÍ_)
  - *Staged*: listo para meterlo en nuestra base de datos local (aquí 
  es donde queremos llegar)

¿Cómo pasamos los ficheros a listos para grabar en la *BBDD* local de nuestro *Git*?

Primero vamos a comprobar el status de nuestros ficheros con el siguiente comando:

```bash
git status
```

Aquí podemos ver que el fichero _index.html_ está modificado pero no está en estado de _staging_ para hacer esto podemos hacerlo de varias maneras:

```bash
git add ./src/index.html
```

```bash
git add .
```

Si queremos directamente  pasar todos los ficheros modificados podemos hacer: 

```bash
git add .
```

Si ahora queremos commitear este cambio (es decir guardarlo en nuestra base de datos local), podemos grabar todos los ficheros en *staging* con el siguiente comando:

```bash
git commit -m "cambiando el saludo"
```

Si hacemos un *git status* podemos ver que ya no hay cambios:

```bash
git status
```

Pero si nos vamos a *Github* podemos ver que el cambio no es efectivo
¿Que nos queda? enviar los cambios al servidor.

```bash
git push 
```

Hay atajos para hacer estos pasos en uno.

