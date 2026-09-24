# Forkify V2 Deployment Repository Separation Strategy

## Objective

Keep the application codebase and infrastructure codebase decoupled so each repository has a single responsibility and can evolve independently.

## Repository split

### Application repository
This repository will remain responsible for:
- frontend source code
- backend source code
- database schema and migration assets
- local Docker Compose for development
- CI definitions for automated validation
- release documentation and architecture notes

### Deployment repository
A separate repository will be responsible for:
- Kubernetes manifests
- Helm charts or Kustomize overlays
- Terraform modules and state management
- cloud provider configuration
- secrets and environment management
- production deployment automation

## Why this separation matters

- keeps application development independent from infrastructure provisioning
- reduces accidental coupling between runtime code and deployment configuration
- allows different release cadences for app changes and infrastructure changes
- makes it easier to reuse the app repository across multiple deployment targets

## Boundaries for this repo

This repository should stay focused on application delivery and local validation only. Infrastructure ownership should not be mixed into application code reviews or feature branches.

## Recommended future process

1. Feature work happens in the application repository.
2. Docker and CI validation run here.
3. Deployment artifacts are generated or referenced from the deployment repository.
4. Infra changes are reviewed and applied there, separately from app changes.

## Governance note

The application repository may include Docker compose and local environment files, but it should not contain the live cloud deployment state or Kubernetes production configuration.
