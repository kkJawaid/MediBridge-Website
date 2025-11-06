import express from 'express';
const router = express.Router();
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { sendComplaint, resolveComplaint} from '../controllers/complaintController.js';

router.post('/send', protect, sendComplaint);
router.put('/resolve/:id', protect, adminOnly, resolveComplaint);


export default router;