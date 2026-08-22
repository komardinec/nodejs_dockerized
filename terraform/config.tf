terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "7.45.0"
    }
  }
}

provider "google" {
  project = "test-project-499111"
  region = "europe-central2"
  zone = "europe-central2-a"
}
