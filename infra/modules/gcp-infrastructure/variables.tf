variable "gcp_project_id" {
  type        = string
  description = "El ID del proyecto de Google Cloud."
}

variable "gcp_region" {
  type        = string
  default     = "us-central1"
  description = "La región de GCP donde se desplegarán los recursos."
}

variable "service_name" {
  type        = string
  description = "El nombre del servicio de Cloud Run y del repositorio de Artifact Registry."
}

variable "media_bucket" {
  type        = string
  description = "Bucket de Cloud Storage donde Payload guarda los archivos de Media (lectura pública)."
}

variable "domain_name" {
  type        = string
  default     = ""
  description = "Dominio personalizado para el servicio (ej: influmedia.com). Vacío = sin domain mapping."
}
