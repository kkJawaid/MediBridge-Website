import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, addBookmark, removeBookmark } from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);
router.post('/:id/bookmark/add', protect, addBookmark);
router.put('/:id/bookmark/remove', protect, removeBookmark);

export default router;
