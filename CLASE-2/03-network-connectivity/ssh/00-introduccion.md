# SSH

## ¿Qué es SSH?

SSH (Secure SHell) es un protocolo de red que permite controlar o administrar de forma remota un servidor mediante un mecanismo de autentificación.

Se creó como una alternativa segura a protocolos como telnet ya que la comunicación está cifrada utilizando técnicas criptográficas.

SSH utiliza la arquitectura cliente-servidor donde los clientes acceden al servidor utilizando un sistema de autentificación (_password_, _publickey_, _GSSAPI_, _keyboardinteractive_).

Una conexión de SSH requiere mínimo tres partes:

- Usuario: la cuenta de usuario a la que quieres acceder.
- Host: el servidor SSH (dirección IP o nombre de dominio) al que se quiere acceder.
- Puerto: el puerto en el que está escuchando el servidor SSH.

## ¿Cómo funciona?

El cliente abre una comunicación TCP por el puerto de escucha del servidor. El servidor envía su clave pública y el cliente analiza la identidad del servidor con conexiones pasadas o, si es por primera vez, es elección del usuario si continuar la comunicación o no. Al continuar el servidor responde al cliente con la versión de protocolo que soporta. Si el cliente soporta la misma versión entonces seguirá el proceso de conexión. A partir de aquí ambos cliente y servidor negocian una clave de sesión mediante el algoritmo _Diffie-Hellman_. Gracias a este algoritmo ambos, cliente y servidor, pueden combinar sus datos privados con los datos públicos del otro sistema para llegar a una clave de sesión secreta idéntica. En la conexión de SSH se hacen uso tanto de claves simétricas como de claves asimétricas y _hashing_. Una vez se ha establecido la clave para encriptar la comunicación comienza el proceso de autentificación.

El servidor combrueba las credenciales del usuario a la que el cliente quiere acceder utilizando el sistema de autentificación que tenga establecido en su configuración. Una vez el nombre del usuario es verificado por parte del servidor hará inicio de sesión en el sistema.

## Usos frecuentes de SSH

- Transferencia de ficheros
- Ejecución de comandos remotos
- Gestión de infraestructura
- Servir como capa de seguridad sobre otros protocolos (SFTP)
- Reenvío de puertos en aplicaciones (_SSH Tunneling_)
