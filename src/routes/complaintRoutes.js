import express from 'express';
const router = express.Router();
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { sendComplaint, viewAllComplaints, viewComplaint, resolveComplaint} from '../controllers/complaintController.js';

router.post('/send', protect, sendComplaint);
router.get('/viewAll', protect, viewAllComplaints);
router.get('/view/:id', protect, viewComplaint);
router.put('/resolve/:id', protect, adminOnly, resolveComplaint);


export default router;