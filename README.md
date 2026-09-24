# Forkify V2

Forkify V2 is a full-stack redesign of the recipe application originally built during Jonas Schmedtmann's JavaScript course.

## Project boundaries

- `frontend/`: current browser application and future React frontend
- `backend/`: future JavaScript API for users, recipes, and bookmarks
- `database/`: future PostgreSQL and Prisma schema/migration assets
- `docs/`: architecture documentation and diagrams

## Development sequence

1. Establish the application architecture and preserve the approved visual direction.
2. Migrate the frontend design into React components.
3. Implement the backend API and authentication.
4. Add PostgreSQL persistence through Prisma.
5. Connect frontend workflows to the backend.
6. Add Docker for local and reproducible environments.
7. Add Jenkins CI only after the application and design are fully functional.

Cloud infrastructure, Terraform, and Kubernetes will be maintained later in a separate deployment repository.