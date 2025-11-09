import express from 'express';
import { createReview, getProductReviews, getUserReviews, deleteReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/:id', protect, createReview);
router.get('/product/:id', getProductReviews);
router.get('/getReview', protect, getUserReviews)
router.delete('/deleteReview', protect, deleteReview);

export default router;
