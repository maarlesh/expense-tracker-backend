import express from 'express';
import { connectDB } from '../controllers/userController';

const router = express.Router();
router.get('/user',connectDB);

export default router;