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
- pre requisites: have postgres installed
- npm install
- create new .env by .env.template

database instructions:
- npx prisma generate
- npx prisma migrate dev
- npx prisma studio (to view db in browser)

running locally instructions:
- npm run dev OR npx nodemon server.js

payment gateway instructions:
- ngrok endpoint url is https://medibridge-website-production.up.railway.app/webhook 

to note: 
- Make sure localhost:5020 does not have an exisiting process running.
- Make sure localhost:5432 does not have an exisiting process running.

- Note to sir Kashif: To access the admin dashboard, these are the credentials:
    - email: admin@medibridge.com
    - password: admin123

## Notes
- Auth uses JWT.
- Stripe is used in sandbox mode