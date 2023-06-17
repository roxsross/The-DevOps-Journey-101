data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

data "aws_vpc" "default" {
    default = true
}

data "aws_subnet" "zona_a" {
    availability_zone = "us-east-1a"
  
}

data "aws_subnet" "zona_b" {
    availability_zone = "us-east-1b"
}

#grupo de seguridad

resource "aws_security_group" "grupo_seguridad" {
    name = "server-ec2-sg"
    description = "Allow traffic port http"
    vpc_id = data.aws_vpc.default.id

    ingress {
        description = "Access http"
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]

    }
  
}


resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  vpc_security_group_ids = [aws_security_group.grupo_seguridad.id]
  subnet_id = data.aws_subnet.zona_a.id
  user_data = <<EOF
#!/bin/bash
sudo apt-get update
sudo apt install nginx -y
EOF
  tags = {
    Name = "HelloWorld"
  }
}