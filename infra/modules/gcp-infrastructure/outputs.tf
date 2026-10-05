output "cloud_run_url" {
  value       = google_cloud_run_v2_service.service.uri
  description = "La URL por defecto de Cloud Run."
}

output "run_service_account" {
  value       = google_service_account.run.email
  description = "Cuenta de servicio con la que corre Cloud Run."
}

output "media_bucket_url" {
  value       = "https://storage.googleapis.com/${google_storage_bucket.media.name}"
  description = "Base pública de los archivos de Media."
}

output "custom_domain_url" {
  value       = var.domain_name == "" ? null : "https://${var.domain_name}"
  description = "La URL del dominio personalizado."
}

output "dns_records_to_create" {
  value       = var.domain_name == "" ? null : google_cloud_run_domain_mapping.custom_domain[0].status[0].resource_records
  description = "Registros DNS que deben crearse en el proveedor de dominio."
}
