### ***manejo de variables en terraform***

al momento de querer que nuestro archivo de definicion de infraestrutura de terraform sea escalable, si queremos que sea reutilizable, crear mas instancias, que alguien mas lo pueda utilizar, no debemos tener los valores hardcode en codigo, sino que por el contario, como principio de laC es que al momento de escojer una herramienta debemos tener en cuenta que esta sea parametrizable, que podamos psar los valores por varibles.
* terrafor nos permite creara varaibles de tipo:
* string
* number
* boolean
* map
* list
si no declaramos el tipo, el valor poe default sera un string, esto en las versiones anteriores de terraform, pero ahora nosotros podemos no especificar el tipo, y eterraform podere ainteligenteme diferer que tipo es, al momento que nosotros le estemo pasando el valor. **por buenas practicas es mejor especificar el tipo de varaible que vamos a usar**
* para declarar varibles en terrafor lo hacemos con el uso de la palrba recervada **varaible** seguido entre comillas el nombre de l avariable, abrimos llaves y dentro escribimos las propiedasd de esa varible, es decir:
* el type => tipo de la varible
* el default => para nosotros darle un valor por default a la variable, en caso de que no le den un valor al momento del uso
* description => dado que los sitemas tiene que estar documentados como prinicipio de desarrollo de software, esta varible nos es de gran utlidad en terraform, para nosotros agregar una descripcion e indicar a que esta haciendo referencia nuestra varible
* exiten mas propiedades, de igual manera no se nos obliga a colocar todas esa propiedas, perfectamente podemos solo declarar la varibles sin colarle todas esas propiedades
* **nota:** como buena practica al momento de declarar las variables se recomienda realizar esto en una archivo, para no mezclarlo con la definicion de la infracestructura que estemos realizando
```tf
variable "ami_id" {
  default = ""
  description = "esta varaible es el ide del ami"
  #type = string | number | boolean | map | list
  type = string
  
}

variable "instance_type" {
  type = string
  description = "este es el tipo de instancia a crear"
}

variable "tags" {
  type = map
  description = "esta son las etiquestas definidas para la instancia"
}
```
**asignarle valor a nuestras varibles** para esto se puede hacer de tes formas:
* con la utlizancion de varibles de entorno
* mandarlas por comando
* agregando un archivo .tfvars el cual manejariamos como key-propertie, en el cual solamente tenemos que colocar el nombre de la varible que creamos y colocarle su respetivo valor, or ejemplo:
```tf
ami_id        = "ami-0ca0c67309196175e"
instance_type = "t2.micro"
tags = {
  Name       = "devops-tf"
  Enviroment = "Dev"
}
```

* podemos utilizar varibales en terraform una vez ya hallan sido creadas, con el uso del prefijo **var** y el nombre de la variable por ejemplo ```vara.ami_id```
```tf
provider "aws" {
  region     = "us-east-1"
  access_key = "mi_access_key"
  secret_key = "mi-secret_key"
}
resource "aws_instance" "terraform-platzi-instance" {
  ami           = var.ami_id
  instance_type = var.instance_type
  tags           = var.tags
}
```
* una vez tengamos nuestros 3 archivos con la sintaxis validada con terrafomr, podemos proceder a crear nuestra infraestrutura, pero tendremos que pasa el archivo donde se le asgino el valor a las varibles esto lo hacemos con la bandera **-var-file** y el path del archivo para la contruccion, por ejemplo:
 ```terraform apply --var-file .\dev.tfvars```
**nota:** en el caso que queramos crear o elimnar la insfraestrucrua, para que no se noes pregunte si queremos realizarlo, podemos hacer uso de labandera **-auto-approve**, por ejemplo:
```terraform destroy --var-file .\dev.tfvars -auto-aprove``