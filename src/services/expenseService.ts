import { ACCOUNT_COLUMNS, EXPENSE_COLUMNS } from "../configs/constants";
import { Account } from "../interfaces/Account";
import { Expense } from "../interfaces/Expense";
import { getDetails, insertRow } from "./dbServices";

export const insertExpense = async (expense: Expense) => {
    const result = await insertRow("expense", EXPENSE_COLUMNS, [expense.accountId, expense.amount, expense.description, expense.categoryId, expense.categoryName]);
    if (!result.rowCount) {
        return { success: false, message: 'User not inserted' };
    }
    return { success: true, expense };
}

export const insertIncome = async (expense: Expense) => {
    const result = await insertRow("income", EXPENSE_COLUMNS, [expense.accountId, expense.amount, expense.description, expense.categoryId, expense.categoryName]);
    if (!result.rowCount) {
        return { success: false, message: 'User not inserted' };
    }
    return { success: true, expense };
}

export const createNewAccount = async (account: Account) => {
    const result = await insertRow("account", ACCOUNT_COLUMNS, [account.accountName, account.balance, account.userId]);
    if (!result.rowCount) {
        return { success: false, message: 'User not inserted' };
    }
    return { success: true, account };
}

export const getAllAccounts = async (userId: string) => {
    try {
        const result = await getDetails("account", "user_id", userId);
        console.log('Result', result);
        if (result.rowCount === 0) {
            return { success: false, message: 'No accounts for the user' };
        }
        return { success: true, data: result.rows, message: "success" };
    } catch (error) {
        console.error('Error fetching accounts:', error);
        throw new Error('Failed to fetch user accounts');
    }
}

export const getAllExpenses = async (accountId: string) => {
    try {
        const result = await getDetails("expense", "account_id", accountId);
        console.log('Result', result);
        if (result.rowCount === 0) {
            return { success: false, message: 'No expenses for the account' };
        }
        return { success: true, data: result.rows, message: "success" };
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw new Error('Failed to fetch expenses');
    }
}

export const getAllIncomes = async (accountId: string) => {
    try {
        const result = await getDetails("income", "account_id", accountId);
        console.log('Result', result);
        if (result.rowCount === 0) {
            return { success: false, message: 'No incomes for the account' };
        }
        return { success: true, data: result.rows, message: "success" };
    } catch (error) {
        console.error('Error fetching incomes:', error);
        throw new Error('Failed to fetch incomes');
    }
}