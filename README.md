# Forkify V2

Forkify V2 is a full-stack redesign of the recipe application originally built during Jonas Schmedtmann's JavaScript course.

## Project boundaries

- `frontend/`: current browser application and Parcel development server
- `backend/`: Express API for users, recipes, and bookmarks
- `database/`: PostgreSQL and Prisma schema/migration assets
- `docs/`: architecture documentation and diagrams

## Local development

Start the full local stack with:

```bash
npm start
```

The frontend is available at `http://localhost:1234` and the backend at `http://localhost:4000`.

## Development sequence

1. Establish the application architecture and preserve the approved visual direction.
2. Migrate the frontend design into React components.
3. Implement the backend API and authentication. (Complete)
4. Add PostgreSQL persistence through Prisma. (Complete)
5. Connect frontend workflows to the backend. (Complete)
6. Add Docker for local and reproducible environments. (Complete)
7. Add Jenkins CI only after the application and design are fully functional. (Complete)

Cloud infrastructure, Terraform, and Kubernetes will be maintained later in a separate deployment repository.