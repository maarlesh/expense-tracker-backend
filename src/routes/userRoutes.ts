import express from 'express';
import {loginUser, createUser } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();
router.get('/login', loginUser);
router.get('/create', createUser);

export default router;