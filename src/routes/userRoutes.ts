import express from 'express';
import { connectDB, loginUser, createUser } from '../controllers/userController';

const router = express.Router();
router.get('/user',connectDB);
router.get('/user/login',loginUser);
router.get('/user/create', createUser);

export default router;