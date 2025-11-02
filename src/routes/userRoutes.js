import express from 'express';
const router = express.Router();

import { editUserName, editEmail, editPassword } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.put('/editUsername', protect, editUserName);
router.put('/editEmail', protect, editEmail);
router.put('/editPassword', protect, editPassword);

export default router;