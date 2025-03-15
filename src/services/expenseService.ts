import { ACCOUNT_COLUMNS, EXPENSE_COLUMNS } from "../configs/constants";
import { Account } from "../interfaces/Account";
import { Expense } from "../interfaces/Expense";
import { insertRow } from "./dbServices";

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

export const createNewAccount = async (account : Account) => {
    const result = await insertRow("account", ACCOUNT_COLUMNS, [account.accountName, account.balance, account.userId]);
    if (!result.rowCount) {
        return { success: false, message: 'User not inserted' };
    }
    return { success: true, account };
}