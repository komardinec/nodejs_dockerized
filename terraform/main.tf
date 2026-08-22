resource "google_compute_instance" "vm-instance" {
  name = "dockerized-nodejs"
  machine_type = "e2-small"
  zone = "europe-central2-a"
  
  boot_disk {
    initialize_params {
      size = 20
      image = "debian-cloud/debian-13-trixie-v20260817"
    }
  }
  
  network_interface {
    network = google_compute_network.nodejs-dockerized-network.name
    access_config {}
  }

  tags = ["allow-access"]
}

resource "google_compute_network" "nodejs-dockerized-network" {
   name = "nodejs-dockerized-network"
}

resource "google_compute_firewall" "nodejs-dockerized-firewall" {
   name = "nodejs-dockerized-firewall"
   network = google_compute_network.nodejs-dockerized-network.name
   allow {
       protocol = "icmp"
   }
   allow {
     protocol = "tcp"
     ports = ["22", "2200", "443", "80", "8080"]
   }

   source_ranges = ["0.0.0.0/0"]
   target_tags = ["allow-access"]
}
