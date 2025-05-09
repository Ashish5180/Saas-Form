import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// User Routes
router.post('/signup', registerUser);
router.post('/login', loginUser);

export default router;
