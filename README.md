# MediBridge Description:
This project aims to make medical care more accessible by offering medical services (such as hiring contractual nurses) and medical equipment for buying and renting on a consolidated platform. 

# Features:
-  user registration and login 
-  medical products and services are available which are controlled by admin
-  user can place and view their order for products and services
-  users can place a review for their orders
-  users can give feedback/review for products
-  mock payment gateway for said order

# Medi Bridge Backend (Current)
Contains minimal backend scaffold for the Medi Bridge project.
Stack: Node.js + Express + Prisma + PostgreSQL (Docker compose included)

# Running
- pre requisites: have postgres installed
- configure your .env file by following the instructions in the .env.template file and writing the following command in the terminal: cp .env.template .env
- npm install
- npx nodemon server.js
Note: Make sure localhost:5020 does not have an exisiting process running.
- npx prisma generate to view migrations
- npx prisma studio to view db
- [for developers to update schema: ] npx prisma migrate dev

## Notes
- Auth uses JWT.
