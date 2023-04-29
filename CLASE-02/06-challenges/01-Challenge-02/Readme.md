# Challenge 02: Ejercicio 4

###1- Medidas de seguridad a implementarse

* Asignar como propietario del archivo al usuario de Roxs.
* Eliminar todos los permisos de los restantes usuarios (Grupo y Others).

###2- Identificar el tipo de usuarios para quienes los permisos se deben cambiar

Los tipos de usuarios para quienes los permisos deben cambiarse con los usuarios del grupo al que pertenece el usuario de Roxs y los usuarios del grupo Others.

###3- Identificar el tipo de permiso que necesita ser cambiado

Lo ideal debería ser quitar solo los permisos de lectura y escritura, pero por cuestiones de seguridad, también es recomendable eliminar los permisos de ejecución.

###4- Verificar los permisos de acceso al archivo.

Para verificar los permisos, se puede utilizar el comando `ls -al`. Este comando permite verificar los usuarios que tienen acceso y los permisos que tienen asignados.
