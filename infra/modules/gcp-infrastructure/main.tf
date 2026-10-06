locals {
  run_service_account_id = "${var.service_name}-run"
}

# --- APIs ------------------------------------------------------------------

resource "google_project_service" "apis" {
  for_each = toset([
    "run.googleapis.com",
    "artifactregistry.googleapis.com",
    "storage.googleapis.com",
    "iam.googleapis.com",
    # El conector de Cloud SQL las requiere en el proyecto del servicio,
    # aunque la instancia viva en code-crypto-shared.
    "sqladmin.googleapis.com",
    "secretmanager.googleapis.com",
  ])
  service            = each.value
  disable_on_destroy = false
}

# --- Artifact Registry -----------------------------------------------------

resource "google_artifact_registry_repository" "repo" {
  depends_on    = [google_project_service.apis]
  location      = var.gcp_region
  repository_id = var.service_name
  description   = "Repositorio Docker para ${var.service_name} (Next.js + Payload CMS)"
  format        = "DOCKER"
}

# --- Identidad de Cloud Run ------------------------------------------------
# La cuenta y el bucket se crearon a mano antes de tener Terraform; los
# bloques import los incorporan al estado en el primer apply.

import {
  to = google_service_account.run
  id = "projects/${var.gcp_project_id}/serviceAccounts/${local.run_service_account_id}@${var.gcp_project_id}.iam.gserviceaccount.com"
}

resource "google_service_account" "run" {
  account_id   = local.run_service_account_id
  display_name = "Influmedia Web (Cloud Run)"
}

# --- Media (Payload + @payloadcms/storage-gcs) -----------------------------

import {
  to = google_storage_bucket.media
  id = var.media_bucket
}

resource "google_storage_bucket" "media" {
  name                        = var.media_bucket
  location                    = upper(var.gcp_region)
  uniform_bucket_level_access = true
  public_access_prevention    = "inherited"
  force_destroy               = false
}

# Las imágenes del sitio son públicas: se sirven directo desde storage.googleapis.com.
resource "google_storage_bucket_iam_member" "media_public_read" {
  bucket = google_storage_bucket.media.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

# Payload sube y borra archivos con la cuenta de Cloud Run.
resource "google_storage_bucket_iam_member" "media_run_admin" {
  bucket = google_storage_bucket.media.name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${google_service_account.run.email}"
}

# --- Cloud Run -------------------------------------------------------------

resource "google_cloud_run_v2_service" "service" {
  depends_on = [google_project_service.apis]
  name       = var.service_name
  location   = var.gcp_region
  ingress    = "INGRESS_TRAFFIC_ALL"

  template {
    service_account = google_service_account.run.email

    scaling {
      min_instance_count = 0
      # sites-db es compartida (~25 conexiones): 3 instancias x pool de 4.
      max_instance_count = 3
    }

    # Socket del conector a la instancia compartida (repo shared-resources).
    volumes {
      name = "cloudsql"
      cloud_sql_instance {
        instances = [var.sql_instance]
      }
    }

    containers {
      # La imagen real la despliega el workflow de GitHub Actions.
      image = "us-docker.pkg.dev/cloudrun/container/hello:latest"
      ports {
        container_port = 8080
      }
      volume_mounts {
        name       = "cloudsql"
        mount_path = "/cloudsql"
      }
      resources {
        startup_cpu_boost = true
        cpu_idle          = true
        limits = {
          cpu    = "1"
          memory = "1Gi"
        }
      }
    }
  }

  lifecycle {
    ignore_changes = [
      client,
      client_version,
      template[0].containers[0].image,
      template[0].containers[0].env,
      # Etiquetas que agrega deploy-cloudrun en cada despliegue.
      template[0].labels,
    ]
  }
}

resource "google_cloud_run_v2_service_iam_member" "public_access" {
  name     = google_cloud_run_v2_service.service.name
  location = google_cloud_run_v2_service.service.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# El primer dominio se creó cuando el módulo aceptaba uno solo (count);
# moved lo reubica en el mapa sin recrearlo ni perder su certificado.
moved {
  from = google_cloud_run_domain_mapping.custom_domain[0]
  to   = google_cloud_run_domain_mapping.custom_domain["dev.influmediaca.com"]
}

resource "google_cloud_run_domain_mapping" "custom_domain" {
  for_each = toset(var.domain_names)
  location = var.gcp_region
  name     = each.value

  metadata {
    namespace = var.gcp_project_id
  }

  spec {
    route_name = google_cloud_run_v2_service.service.name
  }
}
