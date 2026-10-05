# Heredar configuración de backend y proveedor del root terragrunt.hcl
include "root" {
  path = find_in_parent_folders()
}

# Origen de los recursos de Terraform
terraform {
  source = "../../modules/gcp-infrastructure"
}

# Parámetros de entrada del módulo
inputs = {
  gcp_project_id = "influmedia-web"
  gcp_region     = "us-central1"
  service_name   = "influmedia-web"
  media_bucket   = "influmedia-web-media"
  # Vacío hasta tener el dominio; al definirlo se crea el domain mapping.
  domain_name = ""
}
