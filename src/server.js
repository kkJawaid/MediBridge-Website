import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

const app = express();
app.use(cors());
app.use(express.json()); //indicates raw json and not form data

app.get('/', (req, res) => res.send('Medi Bridge API is running'));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', userRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
