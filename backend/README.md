# Backend

This directory contains the JavaScript API for users, recipes, and bookmarks.

Current responsibilities:

- Authentication and user management
- Recipe and bookmark endpoints
- Request validation and business rules
- Database access through Prisma and PostgreSQL
- Environment-based configuration

## Local setup

1. Copy the environment template:
   - `cp .env.example .env`
2. Ensure PostgreSQL is running locally or through Docker Compose.
3. Install dependencies:
   - `npm install`
4. Generate Prisma client:
   - `npm run prisma:generate`
5. Start the server:
   - `npm run dev`

## API health check

- `GET /api/health`

## Core endpoints

- `GET /api/users`
- `POST /api/users`
- `GET /api/recipes`
- `POST /api/recipes`
- `GET /api/users/:userId/bookmarks`
- `POST /api/users/:userId/bookmarks/:recipeId`
- `DELETE /api/users/:userId/bookmarks/:recipeId`
