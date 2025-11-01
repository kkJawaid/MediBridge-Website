import express from 'express';
import { getAnalytics } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/analytics', protect, adminOnly, getAnalytics);

export default router;
