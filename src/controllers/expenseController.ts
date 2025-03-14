import { Request, Response } from 'express';
import pool from '../helpers/dbHelper';
import { sendSuccessResponse, sendInternalServerError, sendInvalidParameters, sendUnauthorisedError} from '../helpers/responseHelper';
import { Expense } from '../interfaces/Expense';

export const createExpense = async (req: Request, res : Response) => {
    console.log(req.body);

    try{
        const { userId, accountId, amount, description, category } = req.body;
        if (!userId || !accountId || !amount || !category) {
            return sendInvalidParameters(res, 'Missing required fields');
        }

        if (typeof amount !== 'number' || amount <= 0) {
            return sendInvalidParameters(res, 'Amount must be a positive number');
        }

        const expense : Expense = {
            userId : userId,
            accountId : accountId,
            amount,
            description: description || '',
            category
        }

        console.log('Expense:', expense);
        return sendSuccessResponse(res, 'Expense created successfully', expense);
    }
    catch(e){
        console.log('Error in inserting: ', e);
        sendInternalServerError(res, 'Unexpected error:'+e);
    }
}