# Services

## Services NodePort

Suponemos que tenemos desplegado nginx usando el archivo yaml: [`nginx-deployment.yaml`](../04/files/nginx-deployment.yaml):

    kubectl apply -f nginx-deployment.yaml

Por lo tanto tenemos dos Pods ofreciendo el servidor web nginx, a los que queremos acceder desde el exterior y que se balancee la carga entre ellos.

Aunque podríamos crear un recurso Service desde la línea de comandos:

    kubectl expose deployment/nginx --port=80 --type=NodePort

Normalmente lo que hacemos es describir las características del Service en un archivo yaml [`nginx-srv.yaml`](files/nginx-srv.yaml):

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  type: NodePort
  ports:
  - name: service-http
    port: 80
    targetPort: http
  selector:
    app: nginx
```
Veamos la descripción:

* Vamos a crear un recurso Service (parámetro `kind`) y lo nombramos como `nginx` (parámetro `name`). Este nombre será importante para la resolución dns.
* En la especificación del recurso indicamos el tipo de Service (parámetro `type`).
* A continuación, definimos el puerto por el que va a ofrecer el Service y lo nombramos (dentro del apartado `port`: el parámetro `port` y el parámetro `name`). Además, debemos indicar el puerto en el que los Pods están ofreciendo el Service (parámetro `targetPort`), en este caso, hemos usado el nombre del puerto (`http`) que indicamos en el recurso Deployment:

```yaml
   ...
   ports:
    - name: http
      containerPort: 80
   ...
```
* Por ultimo, seleccionamos los Pods a los que vamos acceder y vamos a balancear la carga seleccionando los Pods por medio de sus etiquetas (parámetro `selector`).

**Nota: La definición de un Service de tipo ClusterIP sería exactamente igual, pero cambiando el parámetro `type`.**

## Documentación

Para más información acerca de los Services puedes leer: [guía de usuario](https://kubernetes.io/docs/concepts/services-networking/service/).

