import express from 'express';
const router = express.Router();

import { editUserName, editEmail, editPassword, editContact, editAddress } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.put('/editUsername', protect, editUserName);
router.put('/editEmail', protect, editEmail);
router.put('/editPassword', protect, editPassword);
router.put('/editContact', protect, editContact);
router.put('/editAddress', protect, editAddress);

export default router;