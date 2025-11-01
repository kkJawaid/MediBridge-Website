# MediBridge Description:


# Medi Bridge Backend

Minimal backend scaffold for the Medi Bridge project.
Stack: Node.js + Express + Prisma + PostgreSQL (Docker compose included)

## Quick start (using Docker for PostgreSQL)
1. Copy `.env.example` to `.env` and update values if needed.
2. Start Postgres:
   ```bash
   docker-compose up -d
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run Prisma migration (this will create DB tables):
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start dev server:
   ```bash
   npm run dev
   ```

## Notes
- Auth uses JWT.
- Payments are mocked (no real gateway).
- Postman collection is included at `/postman/MediBridge.postman_collection.json`.
