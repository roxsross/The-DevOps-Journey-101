# Reto 2 - Linux - gestión de permisos


1. En un directorio vacío (nuevo), crear 9 archivos (archiv1, archiv2, etc.) utilizando el comando `touch`:

> Deberás quitarle todos los permisos con el comando <pre>`chmod a-rwx archiv*`</pre>

---
<br>

2. Modifica los permisos usando el operador `=` del `chmod`, para que queden de la siguiente manera:
   
| Nombre del archivo | Permisos   | Comando                  |
|:------------------:|------------|--------------------------|
| archiv1            | -rwx------ | ` $chmod u=rwx,go= archiv1`|
| archiv2            | -rw------- | **```$ chmod u=rw,go= archiv2```**|
| archiv3            | -rwxrwxrwx | `$ chmod a=rwx archiv3`    |
| archiv4            | -rwxrw-r-- | **```$ chmod u=rwx,g=rw,o=r archiv4```**|
| archiv5            | -rwxr----- | **```$ chmod u=rwx,g=r,o= archiv5```**|
| archiv6            | -r-xrw-r-- | **```$ chmod u=rx,g=rw,o=r archiv6```**|
| archiv7            | -r-------x | **```$ chmod u=r,g=,u=x archiv7```**|
| archiv8            | -rw-r--r-- | **```$ chmod u=rw,g=r,o=r archiv8```**|
| archiv9            | -rw-rw-r-- | **```$ chmod u=rw,g=rw,o=r archiv9```**|

---
<br>

3. Modificar los permisos de los archivos anteriores utilizando los operadores `+` y  `-` del `chmod` para que queden de la siguiente manera (Los cambios son relativos a los archivos del ejercicio anterior):
   
| Nombre del archivo | Permisos   | Comando                  |
|:------------------:|:------------|--------------------------|
| archiv1            | -rwx---r-- | `$ chmod o+r archiv1`|
| |*(Agrega lectura para otros)*| |
| archiv2            | -r-------- | **`$ chmod u-w archiv2`**|
| |*(Quita escritura para propietario)* | |
| archiv3            | -rw-rw-rw- | `$ chmod a-x archiv3`    |
| |*(Quita ejecución para todos)*| |
| archiv4            | -rwx-w---- | **`$ chmod go-r archiv4`** |
| |*(Quita lectura para grupo y otros)*| |
| archiv5            | -rwx----wx | **`$ chmod g-r,o+wx archiv5`** |
| |*(Quita lectura al grupo, agrega esc. y ejec. para otros)*||
| archiv6            | -rwxrw---- | **`$ chmod u+w,o-r archiv6`** |
| |*(Agrega escritura al propietario, quita la lectura a otros)*| |
| archiv7            | -rw---x-w- | **`$ chmod u+w,g+x,o-x,o+w archiv7`** |
| archiv8            | -------r-- | **`$ chmod u-rw,g-r archiv8`** |
| archiv9            | -rw-rw-r-- | **`$ chmod u+rw,g+rw,o+r archiv9`** |

---
<br>

4. **Problema propuesto** 
   
Roxs es la líder de un equipo de trabajo para una compañía que realiza Auditorías Externas. Él ha creado un archivo llamado *Lista_Precios* en su directorio `/home`. El archivo es altamente confidencial, pero resulta que existe un alto riesgo de que su archivo  sea  vulnerado  porque  otros  empleados  utilizan  su  equipo  al  finalizar  su turno.   Actualmente,   Roxs   posee   una   contraseña   segura,   pero   él   necesita resguardar los datos de ese archivo y no desea que nadie más que solamente él tenga acceso al mismo. ¿Qué solución le propondrían como equipo a Roxs? 

>**Considere lo siguiente para solucionar el problema.** 
>
>Para  proveer  una  solución  apropiada  para  restringir  accesos  no autorizados  al archivo, se necesita realizar lo siguiente: 
>
>1. Identificar las medidas de seguridad a implementarse. 
>2. Identificar el tipo de usuarios para quienes los permisos >serán cambiados. 
>3. Identificar el tipo de permiso que necesita ser cambiado.
>4. Verificar los permisos de acceso al archivo.

Entregable, crear un Readme.md con la solución al Problema propuesto
