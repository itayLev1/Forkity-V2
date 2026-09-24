# Database

This directory contains the PostgreSQL and Prisma foundation for the application.

Current responsibilities:

- PostgreSQL development configuration
- Prisma schema and migrations
- Users, recipes, and bookmarks data model
- Seed data for development and testing

## Local setup

1. Copy the environment template:
   - `cp .env.example .env`
2. Start the database container from the repo root:
   - `docker compose up -d db`
3. Generate the Prisma client from the backend:
   - `cd backend && npm install`
   - `npm run prisma:generate`
4. Apply migration setup:
   - `npm run prisma:migrate`

Cloud infrastructure and Kubernetes resources remain in the separate deployment repository planned for later.
