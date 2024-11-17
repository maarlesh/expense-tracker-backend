import express from 'express';
import { connectDB, loginUser } from '../controllers/userController';

const router = express.Router();
router.get('/user',connectDB);
router.get('/user/login',loginUser);

export default router;