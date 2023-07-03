provider "aws" {
  region     = "us-east-1"
  access_key = ""
  secret_key = ""
}
module "s3_backend" {
    source = "../../../05/modulos3"
    s3_bucket  = "tf-holamundo-s3"
}