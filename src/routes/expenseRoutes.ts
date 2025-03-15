import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { createAccount, createExpense, createIncome } from '../controllers/expenseController';

const router = express.Router();
router.post('/', createExpense);
router.post('/income', createIncome);
router.post('/account', createAccount )

export default router;