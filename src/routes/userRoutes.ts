import express from 'express';
import { connectDB, loginUser, createUser } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();
router.get('/user',connectDB);
router.get('/user/login', loginUser);
router.get('/user/create',authenticateToken, createUser);

export default router;