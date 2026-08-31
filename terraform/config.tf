terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "7.45.0"
    }
  }
}

provider "google" { 
  credentials = file("./service_account_file.json") # file will be created inside runner based on repository variable GCP_SERVICE_ACCOUNT_CONTENTS
  # containing service admin variables
  #project = "example-project-123456" # declared by env variable GOOGLE_PROJECT 
  #region = "" # declared by env variable GOOGLE_REGION
  #zone = "" # declared by env variable GOOGLE_ZONE 
}
