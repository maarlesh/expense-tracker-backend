import express from 'express';
import {loginUser, createNewUser } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();
router.get('/login', loginUser);
router.get('/create', createNewUser);

export default router;