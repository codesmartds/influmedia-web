locals {
  # Variables comunes para todos los componentes del ambiente live
  gcp_project_id = "influmedia-web"
  gcp_region     = "us-central1"
}

# Generar automáticamente el archivo backend.tf en cada componente hijo
remote_state {
  backend = "gcs"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
  config = {
    bucket   = "influmedia-web-tfstate"
    prefix   = "influmedia-web/${path_relative_to_include()}/terraform.tfstate"
    project  = local.gcp_project_id
    location = local.gcp_region
  }
}

# Generar automáticamente el archivo provider.tf en cada componente hijo
generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = "${local.gcp_project_id}"
  region  = "${local.gcp_region}"
}
EOF
}
