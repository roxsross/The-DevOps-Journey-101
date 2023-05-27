# LAB-04

## Actualización y desactualización de nuestra aplicación

El equipo de desarrollo de la empresa ZEROTECH ha creado una primera versión preliminar de una aplicación web y ha creado una imagen de contenedor con el siguiente nombre: `roxsross12/k8s_test_web:v1`.

Vamos a desplegar esta primera versión de la aplicación, para ello:

1. Crea un archivo yaml (puedes usar el de la actividad anterior) para desplegar la imagen: `roxsross12/k8s_test_web:v1`.
2. Crea el Deployment, recuerda realizar una anotación para indicar las características del despliegue.
3. Crea una redirección utilizando el `port-forward` para acceder a la aplicación, sabiendo que la aplicación ofrece el servicio en el puerto 80, y accede a la aplicación con un navegador web.

Nuestro equipo de desarrollo ha seguido trabajando y ya tiene lista la versión 2 de nuestra aplicación, han creado una imagen que se llama: `roxsross12/k8s_test_web:v2`. Vamos a actualizar nuestro despliegue con la nueva versión, para ello:

1. Realiza la actualización del despliegue utilizando la nueva imagen (no olvides anotar la causa).
2. Comprueba los recursos que se han creado: Deployment, ReplicaSet y Pods.
3. Visualiza el historial de actualizaciones.
4. Crea una redirección utilizando el `port-forward` para acceder a la aplicación, sabiendo que la aplicación ofrece el servicio en el puerto 80, y accede a la aplicación con un navegador web.

Finalmente después de un trabajo muy duro, el equipo de desarrollo ha creado la imagen `roxsross12/k8s_test_web:v3` con la última versión de nuestra aplicación y la vamos a poner en producción, para ello:

1. Realiza la actualización del despliegue utilizando la nueva imagen (no olvides anotar "annotaions" de la causa).
2. Comprueba los recursos que se han creado: Deployment, ReplicaSet y Pods.
3. Visualiza el historial de actualizaciones.
4. Crea una redirección utilizando el `port-forward` para acceder a la aplicación, sabiendo que la aplicación ofrece el servicio en el puerto 80, y accede a la aplicación con un navegador web.

¡COMO QUE EXPLOTÓ!, parece que esta versión tiene un fallo, y no se ve de forma adecuada la hoja de estilos, tenemos que volver a la versión anterior:

1. Ejecuta la instrucción que nos permite hacer un *rollback* de nuestro despliegue.
2. Comprueba los recursos que se han creado: Deployment, ReplicaSet y Pods.
3. Visualiza el historial de actualizaciones.
4. Crea una redirección utilizando el `port-forward` para acceder a la aplicación, sabiendo que la aplicación ofrece el servicio en el puerto 80, y accede a la aplicación con un navegador web.

Para superar el desafio deberás entregar en un unico repositorio de github en formato [markdown](https://docs.github.com/es/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax):

1. imagen donde se vea el acceso desde un navegador web a la version 1 de la aplicación aplicación (**imagen1.jpg**).
2. imagen donde se vea el acceso desde un navegador web a la version 2 de la aplicación aplicación (**imagen2.jpg**).
3. imagen donde se visualice el historial de actualización del despliegue después de actualizar a la versión 2 (**imagen3.jpg**).
4. imagen donde se vea el acceso desde un navegador web a la version 3 de la aplicación (¡¡¡No se visualiza bien la hoja de estilos!!!) (**imagen4.jpg**).
5. imagen donde se visualice el historial de actualización después de realizar el *rollback* del despliegue (**imagen5.jpg**).
6. imagen donde se vea el acceso desde un navegador web a la version de la aplicación que queda después de hacer el rollout (**imagen6.jpg**).

### Si se animan a construir sus propias imagenes acá les dejo la fuente:

[`Dockerfile k8s_test_web`](../../build/k8s_test_web/Dockerfile)