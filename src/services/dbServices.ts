import pool from "../helpers/dbHelper";

export const checkDBConnection = async () => {
    return pool.query('SELECT NOW()');
};

export const getUserByUsername = async (userName: string) => {
    return pool.query(`SELECT * FROM user_details WHERE name = $1`, [userName]);
};

export const getDetails = async (tableName: string, columnName: string, value: string[], filter: string[] = ['*']) => {
    const columns = filter.map(col => `"${col}"`).join(', '); 
    const query = `SELECT * FROM "${tableName}" WHERE "${columnName}" = ANY($1);`;
    console.log('Query:', query);
    return pool.query(query, [value]);
};

export const insertRow = async (tableName: string, columns: string[], values: any[]) => {
    const columnNames = columns.join(', ');
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

    const query = `INSERT INTO public.${tableName} (${columnNames}) VALUES (${placeholders}) RETURNING *;`;

    return pool.query(query, values);
};
