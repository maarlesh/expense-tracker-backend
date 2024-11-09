import {Request , Response} from 'express';
import pool from '../helpers/dbHelper';
export const connectDB = async (req: Request, res : Response) => {
    try{
        const result = await pool.query('SELECT NOW()');
        res.json(result);
    }
    catch(err){
        console.log("Error in connecting to the database:", err);
        res.status(500).json({
            error : "Database connection error"
        });
    }
}