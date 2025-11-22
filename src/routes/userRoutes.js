import express from 'express';
const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';
import { viewAllOrders, viewOrder } from '../controllers/orderController.js';
import { viewBookmarks } from '../controllers/productController.js';

router.get('/viewBookmarks', protect, viewBookmarks);
router.get('/viewAllOrders', protect, viewAllOrders); 
router.get('/viewOrder/:id', protect, viewOrder); //

export default router;