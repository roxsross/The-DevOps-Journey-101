module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "2.78.0"

  name = var.environment
  cidr = var.vpc_cidr

  azs              = var.azs
  public_subnets   = var.cidr_public_blocks
  private_subnets  = var.cidr_private_blocks
  
  create_database_subnet_route_table  = false
  
  enable_nat_gateway = true
  single_nat_gateway = true
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Terraform = "true"
    Environment = var.environment
  }
}
