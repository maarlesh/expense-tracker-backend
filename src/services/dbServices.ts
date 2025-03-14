import pool from "../helpers/dbHelper";

export const checkDBConnection = async () => {
    return pool.query('SELECT NOW()');
};

export const getUserByUsername = async (userName: string) => {
    return pool.query(`SELECT * FROM user_details WHERE name = $1`, [userName]);
};

export const getDetails = async (tableName: string, columnName: string, value: string, filter: string[] = ['*']) => {
    return pool.query(`SELECT * FROM ${tableName} WHERE ${columnName} = $1`, [value]);
};