import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();  // Calling the config function to load the .env file
console.log(process.env.POSTGRE_USERNAME);
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