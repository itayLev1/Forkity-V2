# Forkify V2 Session Plan

## Current status
- Project reviewed: visual direction, repo scope, architecture diagram, and future deployment constraints.
- Requirement added: user management and bookmarks must be included in the database model.
- Current phase: Stage 7 — deployment repository separation strategy documented.

## Project direction
- Build a polished recipe app matching the approved frontend design.
- Keep the frontend functional locally before backend/database integration.
- Add Docker containerization after local validation.
- Add Jenkins CI pipeline with automated tests after the app is stable.
- Keep deployment infrastructure separate for a future Kubernetes + Terraform deployment repository.

## Planned implementation order
1. Stage 1: confirm app flows and data model
2. Stage 2: frontend foundation and visual shell
3. Stage 3: core frontend functionality
4. Stage 4: local testing and automated validation
5. Stage 5: Dockerization
6. Stage 6: Jenkins CI pipeline
7. Stage 7: deployment repository separation strategy
8. Stage 8: backend and database integration with users + bookmarks

## Data model to include
- Users
- Recipes
- Bookmarks
- User-to-bookmark relationships
- Optional ownership/author relationships for recipes

## Session boundary
- This file captures the current plan and progress so work can resume without losing context.
- No code changes had been made yet during the initial plan stage.
- We are waiting for approval to begin Stage 1 work.
