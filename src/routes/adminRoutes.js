import express from 'express';
import { getAnalytics, getChartsData } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/analytics', protect, adminOnly, getAnalytics);
router.get('/analytics/charts', protect, adminOnly, getChartsData);

export default router;
