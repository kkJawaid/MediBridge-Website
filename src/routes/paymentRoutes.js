import express from 'express';
import { getAllPayments } from '../controllers/paymentController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/getAllPayments', protect, adminOnly, getAllPayments);

export default router;
