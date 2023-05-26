#Globals
variable aws_region { default = "us-east-1" }
variable environment {}

#VPC
variable azs { type = list}
variable vpc_cidr { }
variable cidr_public_blocks { type = list }
variable cidr_private_blocks { type = list}

