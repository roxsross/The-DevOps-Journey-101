## Ejercicios Scripts Linux 

20. Crea un script que reciba como parámetro la ruta a un fichero y que nos
indique si tiene permisos de ejecución.

    El script deberá verificar que se ha introducido algún parámetro, y en el
    caso de que se haya introducido, verificar antes de comprobar los
    permisos que el fichero existe.
    
21. Crea un script que reciba como parámetros el nombre de uno o varios
usuarios, y nos indique si existen en el sistema.
Para este ejercicio el script debería mirar dentro del archivo
“/etc/passwd” y realizar un filtro con grep (utilizando tuberías).

22. Crea un script que reciba como parámetros el nombre de uno o varios
usuarios y nos indique, si existen, si están conectados en el momento
actual. Recuerda, para saber si un usuario está conectado, puedes
utilizar, entre otros, el comando “who”.

23. Crea un script que reciba como parámetro un número y nos indique si
es un número primo o no.

24. Crea un script que reciba como parámetro un número y calcule el
factorial de dicho número.

25. Crea un script que reciba como parámetro un número y muestre por
pantalla cuáles son sus divisores.

26. Crea un script que reciba como parámetro la ruta a un directorio y que
muestre por pantalla cuántos directorios hay dentro de dicho directorio
y cuántos ficheros.

    El script debería verificar antes si el directorio pasado como parámetro
    es un directorio que existe.
    
27. Tenemos en un archivo de Excel una pequeña tabla con la información
de facturas de algunos clientes. Desde Excel exportamos el fichero a
formato csv, con el nombre “facturas.csv”. Si abrimos con un editor de
texto el archivo veríamos el siguiente contenido: 
```
Pablo;1;700;147
María;2;500;105
Pablo;3;619;130
Ana;4;100;21
Juan;5;200;42
Eva;6;300;63
Ana;7;200;42
Pablo;8;400;84
```

La exportación a formato csv ha creado una línea por fila de la tabla, y
cada columna separada por el carácter “;”. 
    
La columna 1 es el nombre del cliente, la columna 2 el número de
factura, la columna 3 la base imponible de la factura y la columna 4 la cuota de IVA.
    
Crea un script “facturas1” que muestre en pantalla cuántas facturas
tiene dentro del archivo “facturas.csv” el cliente cuyo nombre se pase
como parámetro.
    
Lógicamente, el script debe verificar que se pasa un parámetro y que el
archivo facturas.csv existe. 
    
28. Crea un script “facturas2” que muestre en pantalla los números de
facturas que tiene dentro del archivo “facturas.csv” el cliente cuyo
nombre se pase como parámetro.

    El script debe verificar que se pasa un parámetro y que el archivo
    facturas.csv existe
    
29. Crea un script “facturas3” que muestre en pantalla, para el cliente cuyo
nombre se pase como parámetro, los detalles de cada factura que tiene
dentro del archivo “facturas.csv”.

    El script debería mostrar por cada factura del cliente su número de
    factura, la base imponible, la cuota de IVA, y el total de la factura (Base + cuota de IVA).

    Intenta que la información imprimida en pantalla se muestre de forma
    legible para el usuario que use el script (vamos, que no sea algo que
    sólo entiendas tú).
    
    El script debe verificar que se pasa un parámetro y que el archivo
    facturas.csv existe.    
