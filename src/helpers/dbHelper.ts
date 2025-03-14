import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
        ca: process.env.DATABASE_CA,
    },
});

pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL');
});

export default pool;