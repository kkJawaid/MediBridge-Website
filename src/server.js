import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './config/db.js';
dotenv.config();

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import Stripe from "stripe";
import bodyParser from "body-parser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

//local host, integration during dev mode
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Stripe requires the raw body to verify the signature
app.post(
    "/webhook",
    bodyParser.raw({ type: "application/json" }),
    async (req, res) => {
        const sig = req.headers["stripe-signature"];
        let event;

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            console.log(`Webhook signature verification failed: ${err.message}`);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Handle the event
        switch (event.type) {
            case "payment_intent.succeeded":
                const paymentIntent = event.data.object;
                console.log("Payment succeeded:", paymentIntent.id);
                const userId = Number(paymentIntent.metadata.userId);
                //update cart status
                console.log("user id: ", userId);
                if (!userId) {
                    return res.json("invalid user id");
                }
                const cartId = await prisma.cart.findFirst({ where: { user_id: userId, cart_status: "pending_checkout" } });
                if (!cartId) {
                    return res.json("Cart does not exist");
                }
                const changeStatus = await prisma.cart.update({ where: { cart_id: cartId.cart_id }, data: { cart_status: "checked_out" } })
                //creating entry in order table
                const newOrder = await prisma.order.create({
                    data: {
                        user_id: userId,
                        total_amount: paymentIntent.amount,
                        status: "pending",
                        contact: paymentIntent.metadata.contact,
                        address: paymentIntent.metadata.address
                    }
                })
                //fetching product id from cart and cart items
                const cartItems = await prisma.cartItem.findMany({
                    where: { cart_id: cartId.cart_id },
                    select: { product_id: true }
                });
                //creating entries in product order junction table
                const productOrderData = cartItems.map(item => ({
                    product_id: item.product_id,
                    order_id: newOrder.order_id,
                }));
                await prisma.productOrderJunction.createMany({
                    data: productOrderData,
                });
                //creating entry in payment table
                await prisma.payment.create({
                    data: {
                        order_id: newOrder.order_id,
                        payment_method: "stripe gateway",
                        payment_status: "completed",
                        transaction_reference: paymentIntent.id
                    }
                })
                //emptying cart 
                await prisma.cartItem.deleteMany({
                    where: { cart_id: cartId.cart_id }
                });
                //resetting cart status
                await prisma.cart.update({ where: { cart_id: cartId.cart_id }, data: { cart_status: "pending_checkout" } });

                break;

            case "payment_intent.payment_failed":
                const failedIntent = event.data.object;
                console.log("Payment failed:", failedIntent.id);
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.json({ received: true });
    }
);

app.use(express.json()); //indicates raw json and not form data

app.get('/', (req, res) => res.send('Medi Bridge API is running'));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', userRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//stripe endpoint
app.post("/api/create-payment-intent", async (req, res) => {
    try {
        const { amount, currency, userId, contact, address } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,            
            currency,           
            metadata: { userId, contact, address },
        });
        res.json({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
