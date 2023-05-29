# LAB-02

## ReplicaSet

1. Crea un archivo yaml con la descripción del recurso ReplicaSet, teniendo en cuenta los siguientes aspectos:
    * Indica nombres distintos para el ReplicaSet y para el contenedor de los Pods que va a controlar.
    * El ReplicaSet va a crear 3 réplicas.
    * La imagen que debes desplegar es `roxsross12/k8s_test_web:latest`.
    * Indica de manera adecuada una etiqueta en la especificación del Pod que vas a definir que coincida con el *selector* del ReplicaSet.
2. Crea el ReplicaSet.
3. Comprueba que se ha creado el ReplicaSet y los 3 Pods.
4. Obtén información detallada del ReplicaSet creado.
5. Vamos a probar la tolerancia a fallos: Elimina uno de los 3 Pods, y comprueba que inmediatamente se ha vuelto a crear un nuevo Pod.
6. Vamos a comprobar la escalabilidad: escala el ReplicaSet para tener 6 Pods de la aplicación.
7. Elimina el ReplicaSet y comprueba que se han borrado todos los Pods.

Para superar el desafio deberás entregar en un unico repositorio de github en formato [markdown](https://docs.github.com/es/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax):

1. Archivo yaml que has creado con la definición del ReplicaSet (**rs.yml**).
2. imagen donde se comprueba que el ReplicaSet y los 3 Pods se han creado (**imagen2.jpg**).
3. imagen donde se ve la información detallada del ReplicaSet (**imagen3.jpg**).
4. imagen donde se ven los Pods que se han creado, después de eliminar uno de ellos (**imagen4.jpg**).
5. imagen donde se ven los Pods que se han creado después del escalado (**imagen5.jpg**).



