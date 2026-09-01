TODO:
- ~Make names (docker, node, nginx) more conventional~
- Repository should have automatic CI-pipeline, which will rebuild containers for node.js API and NGINX server, when their configuration changes (filters)
- Make workflows more visible by separating steps to different jobs
- Implement inputs to workflows
- Test other triggers
- ~Create one CI pipeline (or separate) for Ansible and Terraform~
- ~Terraform provisioning should somehow tag created VM instances, for future usage by Ansible~
- ~GHA runners with Ansible need to be authenticated against GCP~
- ~VM configuration controlled by Ansible will not have control machine, every change will be done by GHA runners~
