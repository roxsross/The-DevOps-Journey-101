# LAB-01

## Trabajando con Pods

Vamos a crear nuestro primer Pod, y para ellos vamos a desplegar una
imagen que nos ofrece un servidor web con una página estática. 

1. Crea un archivo yaml con la descripción del recurso Pod, teniendo en cuenta los siguientes aspectos:
    * Indica nombres distintos para el Pod y para el contenedor.
    * La imagen que debes desplegar es `roxsross12/k8s_test_web:latest`.
    * Indica una etiqueta en la descripción del Pod.
2. Crea el Pod.
3. Comprueba que el Pod se ha creado y está corriendo.
4. Obtén información detallada del Pod creado.
5. Accede de forma interactiva al Pod y comprueba los archivos que están en el DocumentRoot (`usr/local/apache2/htdocs/`).
6. Crea una redirección con `kubectl port-forward` utilizando el puerto de localhost 8888 y sabiendo que el Pod ofrece el servicio en el puerto 80. Accede a la aplicación desde un navegador.
7. Muestra los logs del Pod y comprueba que se visualizan los logs de los accesos que hemos realizado en el punto anterior.
8. Elimina el Pod, y comprueba que ha sido eliminado.

Para superar el desafio deberás entregar en un unico repositorio de github en formato [markdown](https://docs.github.com/es/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax):

1. Archivo yaml que has creado con la definición del Pod (**pod.yaml**).
2. Imagen donde se comprueba que el Pod ha sido creado (**imagen1.jpg**).
3. Imagen donde se ve la información detallada del Pod (**imagen2.jpg**).
4. Imagen donde se ve el archivo `index.html` del DocumentRoot (**imagen3.jpg**).
5. Imagen del navegador accediendo a la aplicación con el `port-forward` (**imagen4.jpg**).
6. Imagen donde se ve los logs de acceso del Pod (**imagen5.jpg**).

