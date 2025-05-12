import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { createAccount, createCategory, createExpense, createIncome, getAccounts, getCategories, getExpenses, getIncomes } from '../controllers/expenseController';

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

//categories
router.post('/category', createCategory);
router.get('/category', getCategories);

export default router;