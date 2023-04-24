## Ejercicios Scripts Linux 

10. Crea un script que realice las siguientes tareas:
    - A. Si el script no ha recibido ningún parámetro, que muestre el
    mensaje “No has introducido ningún parámetro” y termine el
    script.
    - B. Si ha recibido algún parámetro:
      * Que diga cuantos parámetros ha recibido.
      * Que muestre los parámetros recibidos.
      
11. Modifica el script anterior, de manera que el script retorne un 1 en el
caso A (después de mostrar el mensaje), y devuelva un 0 en el caso B
(después de haber mostrado la información sobre los parámetros).
Cuando pruebes este script ejecutándolo desde la terminal, tras
ejecutarlo verifica su exit code.

12. Repite el script del ejercicio 7, pero verificando que se le ha pasado un
parámetro, e informando adecuadamente si el script no recibe al menos
un parámetro.

13. Repite el ejercicio 9, pero verificando que se le han pasado al menos 2
parámetros, e informando adecuadamente si no recibe los parámetros
esperados.

14. Crea un script que reciba como parámetro la ruta a un archivo o
directorio, y nos informe si existe. Si el script no recibe un parámetro
debe informar adecuadamente.

15. Crea un script que reciba como parámetro la ruta a un archivo o
directorio y, si existe, que nos indique si es un archivo o un directorio.

16. Modifica el script del ejercicio 12, para que verifique si existe el
directorio antes de crearlo. Si existe, simplemente debe mostrar un
mensaje.

17. Modifica el script anterior, para que nos informe si la creación del
directorio tuvo éxito o no. Aquí tienes varias posibilidades, una de ellas
es poner el comando de creación en la propia condición del if (el if
evaluará el exit code del comando). Otra posibilidad es intentar la
creación primero y después comprobar el valor del exit code.

18. Crea un script que reciba como parámetro la ruta a un fichero y que nos
indique si tiene permisos de lectura.

    * El script deberá verificar que se ha introducido algún parámetro, y en el
    caso de que se haya introducido, verificar antes de comprobar los
    permisos que el fichero existe.

19. Crea un script que reciba como parámetro la ruta a un fichero y que nos
indique si tiene permisos de escritura. 

    * El script deberá verificar que se ha introducido algún parámetro, y en el
      caso de que se haya introducido, verificar antes de comprobar los
      permisos que el fichero existe. 
