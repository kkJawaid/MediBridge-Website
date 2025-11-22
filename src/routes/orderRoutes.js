import express from 'express';
import { getUserOrders, getOrderById, adminUpdateOrder, viewAllOrders } from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/user/:userId', protect, getUserOrders); 
router.get('/viewAllOrders', protect, adminOnly, viewAllOrders);
router.get('/:id', protect, getOrderById); 
router.put('/:id/status', protect, adminOnly, adminUpdateOrder);

export default router;
