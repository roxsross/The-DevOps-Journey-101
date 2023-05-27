# LAB-08

**Namespace a usar: `bm-zero`**

Los ingenieros de ZERO Technology están trabajando en su último proyecto. Se trata de una API que sirve imágenes desde un directorio. El _pod_ que sirve la API se llama `bm-api` y sirve las imágenes desde `/data/images`. **El contenido de dicho directorio no existe en la imagen Docker ya que depende del entorno**. Los ingenieros de BM Zero saben que existe una imagen llamada `roxsross12/k8sonfire:bmapi-v1.0` que incluye las imágenes del entorno de desarrollo. Dicha imagen es un proyecto de consola que copia las imágenes a un directorio establecido por la variable de entorno `BM_PIC_SEEDER_PATH`.

Debes asegurarte de que las imágenes estén copiadas en el directorio `/data/images` del contenedor ejecutado por el _pod_ `bm-api`. Hazlo de tal forma, que si por cualquier motivo es necesario recrear el _pod_ las imágenes se vuelvan a copiar de forma automática.

Para comprobar si te funciona, verifica que accediendo al _pod_ `bm-images-api` en la url `/k8s.png` recibes el logo de Kubernetes.


#### Resultado:

Una vez inicializado, si lo compruebas, ahora el contenedor te debería servir la imagen en la url /k8s.png.


```
/app # wget localhost:8080/k8s.png
Connecting to localhost:8080 (127.0.0.1:8080)
saving to 'k8s.png'
'k8s.png' saved
/app # ls -l
total 6412
-rwxr-xr-x    1 root     root       6532661 Nov 13 16:35 bm-api
-rw-r--r--    1 root     root         31989 Nov 13 17:56 k8s.png
/app # exit

```

Para superar el desafio deberás entregar en un unico repositorio de github en formato [markdown](https://docs.github.com/es/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax):

1. Los archivos yaml que has creado.
2. Documentación