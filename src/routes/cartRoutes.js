import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { addToCart, viewCart, increaseQuant, decreaseQuant, deleteItem } from '../controllers/cartController.js';

router.post('/:id/addToCart', protect, addToCart); 
router.put('/:id/increaseQuant', protect, increaseQuant);
router.put('/:id/decreaseQuant', protect, decreaseQuant);
router.delete('/:id/deleteItem', protect, deleteItem);
router.get('/viewCart', protect, viewCart);

export default router;