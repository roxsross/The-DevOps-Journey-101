###  **Infracestructura como codigo**

* Utilizar archivos de definicion => todas las herramientas de infracestructura como codigo tienen un formato propio para definir infracestructura
* Los procesos y los sitemas deben ser autodocumentados => al utlizar el enfoque de infracestrutura como codigo nos permite obviamnete reutilizar el codigo, por lo que si otras personas que pueden llegar a utlizar nuestro codigo, es importante que este este documentado para que las personas sepan, que es lo que esta haciendo el modulo que nosotros estamos creando
* versionar todas las cosas => lo cual nos permite trazar los cambios que se hacen, para al momento de realizar un cambio y que pueda salir mal, podamos regresar en el tiempo el archivo y regesarlo a cuando era estable.
* preferir cambios pequeños => realizar cambios pequeños con el fin de no impactar tanto
* mantener los servicios continuamente disponibles

**beneficios de la infracestructura como codigo**

* Crear rapidamente y bajo demanda => como nosotrsos creamos un unico archivo de defincion de infracestructura, en donde almacenamos todas nuestras configuraciones, esto ahra que nuestro esfuerzo solo lo vamos a realizar al principio, puesto que podres crear n veces la infracestructura que necesitemos ya con nuerstro archivo de definicion
* Atomatizacion => una vez tegamos nuestro archivo de deifinicon, podremos utlizar herramintas dde **continuos integration** para automatizar la infracestructura
* Visibilidad y trazabilidad => al hacer uso del versionamiento en la infracestructura como codigo, nos permitira una vibilidad y trazabilidad dado que todos los cambio quedaran registrados
* Ambitnes homogeneos => podemos crear varios ambientes a partir de el mismo archivo de defincion que tengamos, solo cambiando algunos parametros
