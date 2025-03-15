import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { createAccount, createExpense, createIncome, getAccounts, getExpenses, getIncomes } from '../controllers/expenseController';

const router = express.Router();

//account
router.post('/', createAccount);
router.get('/', getAccounts);

//income
router.post('/income', createIncome);
router.get('/income', getIncomes);

//expenses
router.post('/expense', createExpense);
router.get('/expense', getExpenses);

export default router;