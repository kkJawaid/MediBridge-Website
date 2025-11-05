import express from 'express';
import { createOrder, getUserOrders, getOrderById, cancelOrder, adminUpdateOrder } from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', protect, createOrder);
router.get('/user/:userId', protect, getUserOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/cancel', protect, cancelOrder);
router.put('/:id/status', protect, adminOnly, adminUpdateOrder);

export default router;
