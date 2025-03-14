import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { createExpense } from '../controllers/expenseController';

const router = express.Router();
router.post('/', authenticateToken, createExpense)

export default router;