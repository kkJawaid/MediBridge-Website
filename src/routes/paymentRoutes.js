import express from 'express';
import { createPayment, getAllPayments } from '../controllers/paymentController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', protect, createPayment);
router.get('/getAllPayments', protect, adminOnly, getAllPayments);

export default router;
