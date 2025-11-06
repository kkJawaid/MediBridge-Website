import express from 'express';
const router = express.Router();

import { editUserName, editEmail, editPassword, editContact, editAddress } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { viewAllComplaints, viewComplaint } from '../controllers/complaintController.js';
import { viewAllOrders, viewOrder } from '../controllers/orderController.js';
import { viewBookmarks } from '../controllers/productController.js';

router.put('/editUsername', protect, editUserName);
router.put('/editEmail', protect, editEmail);
router.put('/editPassword', protect, editPassword);
router.put('/editContact', protect, editContact);
router.put('/editAddress', protect, editAddress);
router.get('/viewBookmarks', protect, viewBookmarks);
router.get('/viewAllOrders', protect, viewAllOrders); 
router.get('/viewOrder/:id', protect, viewOrder); //
router.get('/viewAllComplaints', protect, viewAllComplaints);
router.get('/viewComplaint/:id', protect, viewComplaint);

export default router;