# MediBridge Description:
This project aims to make medical care more accessible by offering medical services (such as hiring contractual nurses) and medical equipment for buying and renting on a consolidated platform. 

# Features:
-  user registration and login 
-  medical products and services are available which are controlled by admin
-  sales analytics in admin dashboard
-  user can place and view their order for products and services
-  users can place a review and bookmark products
-  mock payment gateway for said order

# Medi Bridge Backend 
Stack: Node.js + Express + Prisma + PostgreSQL 

# Running 
- Deployed here: https://medibridge-website-production.up.railway.app/

# Running For Developers
- pre requisites: have postgres installed or use the deployed db url
- configure your .env file by following the instructions in the .env.template file and writing the following command in the terminal: cp .env.template .env
- npm install
- npx nodemon server.js
Note: Make sure localhost:5020 does not have an exisiting process running.
Note: Make sure localhost:5432 does not have an exisiting process running.
- npx prisma generate to view migrations
- npx prisma studio to view db
- [for developers to update schema: ] npx prisma migrate dev

to simulate payment gateway
- ngrok endpoint url is https://medibridge-website-production.up.railway.app/webhook 

- Note to sir Kashif: To access the admin dashboard, these are the credentials:
    - email: admin@medibridge.com
    - password: admin123

## Notes
- Auth uses JWT.
- Stripe is used in sandbox mode