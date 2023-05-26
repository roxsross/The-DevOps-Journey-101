# LAB-03

## Trabajando con Deployments

En esta actividad vamos a crear un Deployment de una aplicación web. Sigamos los siguientes pasos:

1. Crea un archivo yaml con la descripción del recurso Deployment, teniendo en cuenta los siguientes aspectos:
    * Indica nombres distintos para el Deployment y para el contenedor de los Pods que va a controlar.
    * El Deployment va a crear 2 réplicas.
    * La imagen que debes desplegar es `roxsross12/k8s_test_web:latest`.
    * Indica de manera adecuada una etiqueta en la especificación del Pod que vas a definir que coincida con el *selector* del Deployment.
2. Crea el Deployment.
3. Comprueba los recursos que se han creado: Deployment, ReplicaSet y Pods.
4. Obtén información detallada del Deployment creado.
5. Crea un una redirección utilizando el `port-forward` para acceder a la aplicación, sabiendo que la aplicación ofrece el servicio en el puerto 80, y accede a la aplicación con un navegador web.
6. Accede  a los logs del despliegue para comprobar el acceso que has hecho en el punto anterior.
7. Elimina el Deployment y comprueba que se han borrado todos los recursos creados.

Para superar el desafio deberás entregar en un unico repositorio de github en formato [markdown](https://docs.github.com/es/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax):

1. Crear el archivo yaml que has creado con la definición del Deployment (**deploy.yaml**).
2. imagen donde se comprueba los recursos que se han creado (**imagen2.jpg**).
3. imagen donde se ve la información detallada del Deployment (**imagen3.jpg**).
4. imagen donde se vea el acceso desde un navegador web a la aplicación usando el `port-forward` (**imagen4.jpg**).
5. imagen donde se vea los logs del despliegue después del acceso (**imagen5.jpg**).

