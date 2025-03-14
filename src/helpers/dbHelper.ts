import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const pool = new Pool(
    {
        user: process.env.POSTGRE_USERNAME,
        host: 'localhost',
        database: process.env.DATABASE_NAME,
        password: process.env.POSTGRE_PASSWORD,
        port: Number(process.env.POSTGRE_PORTNUMBER)
    }
)
export default pool;