import express from 'express';
import { deleteNotif, viewAllNotifs } from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', protect, viewAllNotifs)
router.delete('/:id', protect, deleteNotif)
export default router; 