import express from 'express';
import { getUserOrders, getOrderById, cancelOrder, adminUpdateOrder } from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/user/:userId', protect, getUserOrders); //only for admin?
router.get('/:id', protect, getOrderById); //only for admi?
router.put('/:id/cancel', protect, cancelOrder);
router.put('/:id/status', protect, adminOnly, adminUpdateOrder);

export default router;
