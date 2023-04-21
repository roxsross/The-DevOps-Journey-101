## Ejercicios Scripts Linux 

30. Crea un script “cuotas-iva” que muestre en pantalla el IVA total (la
suma de todas las cuotas de IVA) que tiene que pagar el cliente cuyo
nombre se pase como parámetro.

    El script debería devolver 1 si el cliente no existe.

    El script debe verificar que se pasa un parámetro y que el archivo
    facturas.csv existe.

31. Crea un script “base-total” que muestre en pantalla la suma de todas
las bases imponibles del cliente cuyo nombre se pase como parámetro.

    El script debería devolver 1 si el cliente no existe.

    El script debe verificar que se pasa un parámetro y que el archivo
    facturas.csv existe.

32. Crea un script “factura-total” que muestre en pantalla la suma de todas
las facturas (base+cuota) que tiene que pagar el cliente cuyo nombre se
pase como parámetro.

    El script debería devolver 1 si el cliente no existe.
    
    El script debe verificar que se pasa un parámetro y que el archivo
    facturas.csv existe.

    En este ejercicio, aunque es poco eficiente (ya que estarías creando dos
    blucles en lugar de 1), podrías usar si lo deseas los scripts creados en
    los ejercicios 30 y 31 para obtener la cuota 

33. Aunque es poco eficiente (ya que estarías creando dos blucles en lugar
de 1), repite el ejercicio anterior, pero usando los scripts creados en los
ejercicios 30 y 31 para obtener la base imponible total y la cuota de iva
total.

34. Combinando los scripts creados en los ejercicios 29 y 32, crea un script
que muestre en pantalla un listado de todas las facturas del cliente cuyo
nombre se pasa como parámetro, incluyendo un resumen final con los
importes totales.

    Intenta que la información imprimida en pantalla se muestre de forma
    legible para el usuario que use el script (vamos, que no sea algo que
    sólo entiendas tú).

    Como en los anteriores casos, el script debe verificar que se pasa un
    parámetro y que el archivo facturas.csv existe. 
