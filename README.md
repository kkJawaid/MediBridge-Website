# MediBridge Description:
This project aims to make medical care more accessible by offering medical services (such as hiring contractual nurses) and medical equipment for buying and renting on a consolidated platform. 

# Features:
-  user registration and login 
-  medical products and services are available which are controlled by admin
-  user can place and view their order for products and services
-  users can place a review for their orders
-  mock payment gateway for said order

# Medi Bridge Backend (Current)
Contains minimal backend scaffold for the Medi Bridge project.
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
