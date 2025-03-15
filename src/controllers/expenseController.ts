import { Request, Response } from 'express';
import { sendSuccessResponse, sendInternalServerError, sendInvalidParameters, sendUnauthorisedError} from '../helpers/responseHelper';
import { Expense } from '../interfaces/Expense';
import { insertExpense, createNewAccount, insertIncome, getAllAccounts, getAllExpenses, getAllIncomes } from '../services/expenseService';
import { Account } from '../interfaces/Account';

export const createExpense = async (req: Request, res : Response) => {
    console.log(req.body);

    try{
        const {accountId, amount, description, categoryId, categoryName } = req.body;
        if ( !accountId || !amount || !categoryId || !categoryName) {
            return sendInvalidParameters(res, 'Missing required fields');
        }

        if (typeof amount !== 'number' || amount <= 0) {
            return sendInvalidParameters(res, 'Amount must be a positive number');
        }

        const expense : Expense = {
            accountId : accountId,
            amount,
            description: description || '',
            categoryId,
            categoryName,
        }

        console.log('Expense:', expense);
        insertExpense(expense);
        return sendSuccessResponse(res, 'Expense created successfully', expense);
    }
    catch(e){
        console.log('Error in inserting: ', e);
        sendInternalServerError(res, 'Unexpected error:'+e);
    }
}


export const createIncome = async (req: Request, res : Response) => {
    console.log(req.body);

    try{
        const {accountId, amount, description, categoryId, categoryName } = req.body;
        if ( !accountId || !amount || !categoryId || !categoryName) {
            return sendInvalidParameters(res, 'Missing required fields');
        }

        if (typeof amount !== 'number' || amount <= 0) {
            return sendInvalidParameters(res, 'Amount must be a positive number');
        }

        const expense : Expense = {
            accountId : accountId,
            amount,
            description: description || '',
            categoryId,
            categoryName,
        }

        console.log('Expense:', expense);
        insertIncome(expense);
        return sendSuccessResponse(res, 'Income created successfully', expense);
    }
    catch(e){
        console.log('Error in inserting: ', e);
        sendInternalServerError(res, 'Unexpected error:'+e);
    }
}

export const createAccount = async (req: Request, res: Response) => {
    const { accountName, balance, userId } = req.body;
    try{
        if (!accountName || !balance || !userId) {
            return sendInvalidParameters(res, 'Missing required fields');
        }

        if (typeof balance !== 'number' || balance <= 0) {
            return sendInvalidParameters(res, 'Amount must be a positive number');
        }

        const account : Account = {
            accountName : accountName,
            userId : userId,
            balance : balance
        };

        console.log('Account: ', account);
        createNewAccount(account);
        return sendSuccessResponse(res, 'Expense created successfully', account);

    }
    catch(e){
        console.log('Error in inserting: ', e);
        sendInternalServerError(res, 'Unexpected error:'+e);
    }
}

export const getAccounts = async (req: Request, res: Response) => {
    try {
        const result = await getAllAccounts(req.body.userId);
        return sendSuccessResponse(res, result.message ?? "", result.data);
    } catch (e) {
        return sendInternalServerError(res, 'Unexpected error'+e);
    }
}


export const getExpenses = async (req: Request, res: Response) => {
    try {
        const result = await getAllExpenses(req.body.accountId);
        return sendSuccessResponse(res, result.message ?? "", result.data);
    } catch (e) {
        return sendInternalServerError(res, 'Unexpected error'+e);
    }
}

export const getIncomes = async (req: Request, res: Response) => {
    try {
        const result = await getAllIncomes(req.body.accountId);
        return sendSuccessResponse(res, result.message ?? "", result.data);
    } catch (e) {
        return sendInternalServerError(res, 'Unexpected error'+e);
    }
}