# Stage 11 Deployment Handoff

## Application repository responsibilities

This repository owns:

- frontend, backend, and database source code
- Prisma schema and migration assets
- local Docker Compose
- Dockerfiles for the frontend and backend
- Jenkins validation

Production Kubernetes, Terraform, secrets, and cloud state belong in the separate deployment repository.

## Runtime contract

| Service | Container port | Health or entry point | Required configuration |
| --- | ---: | --- | --- |
| Frontend | 1234 | Browser application | Backend API URL at build or deployment time |
| Backend | 4000 | `GET /api/health` | `DATABASE_URL`, `FORKIFY_API_KEY`, `PORT` |
| PostgreSQL | 5432 | PostgreSQL readiness | Managed by the deployment environment |

The backend image is built with `backend/Dockerfile` using the repository root as its build context because it needs the shared Prisma schema.

## Deployment repository inputs

The deployment repository should provide:

- backend and frontend image references produced from this repository
- a PostgreSQL connection string through a secret
- the Forkify API key through a secret
- an externally reachable backend URL for the frontend build configuration
- readiness and liveness checks based on the backend health endpoint

## Current local validation

```bash
npm start
```

Then open `http://localhost:1234` and check `http://localhost:4000/api/health`.

The local command starts PostgreSQL, generates Prisma Client, starts Express, and starts Parcel. Production deployment remains intentionally separate from this repository.
