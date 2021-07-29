---
path: azure-terraform
date: 2021-07-29T11:30:00.831Z
title: Configure terraform on azure devops
category: note
tags: [azure, terraform, devops]
published: true
description:
---

# Azure devops

Install terraform tasks: [link](https://marketplace.visualstudio.com/items?itemName=charleszipp.azure-pipelines-tasks-terraform)

[Terraform on azure pipelines best practice](https://julie.io/writing/terraform-on-azure-pipelines-best-practices/)

# All in code

Application code, infrastructure, CI/CD pipeline all in the same repository.

# Terraform

Login into azure in order to run terraform:

```
az login
az logout
```

We don't want that for automating - setup a service principal which is an automated user that terraform can access. It is a system account that can be created in azure devops.

Service principal environment variables:

- ARM_CLIENT_ID
- ARM_CLIENT_SECRET
- ARM_TENANT_ID
- ARM_SUBSCRIPTION_ID

These values are very sensitive. See [docs](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/guides/service_principal_client_secret)

A service principal will be created when creating a service connection to ARM automatically on azure devops.
It is possible to create a service principal manually and use it in a service connection when choosing service principal (manual):

```shell
az login
az account list # id is subscription_id
az account set -s "SUBSCRIPTION_ID"
az ad sp create-for-rbac -n "NAME" --role="Contributor" --scopes="/subscriptions/SUBSCRIPTION_ID"
az ad sp delete --id
```

# Azure devops

Create a new project. Setup service connections to azure: project settings -> service connections. Create service connections to azure resource manager. Service connections - connections to other systems.

- create a new pipeline

# Create a storage account for terraform state files

Deploy a storage account and create a container within it to hold the state json files.
SAS Token to access it.

```
az storage account create \
  --name terraformstorageacc \
  --resource-group storageRg \
  --kind StorageV2 \
  --sku Standard_LRS \
  --https-only true \
  --allow-blob-public-access false
```

Terraform remote state via backend. Azure blob storage locking and workspaces.
Init with backend: `terraform init -backend-config=backend-config.txt`

---

TODO:

[] Try avoid creating a new service principal just for terraform.
[] Automate creating storage account with terraform
