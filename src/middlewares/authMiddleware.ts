import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];

        console.log('Auth Header:', authHeader);
        if (!token) {
            res.status(401).json({ message: 'Access Denied: No token provided' });
            return;
        }

        const decoded = jwt.verify(token, ACCESS_SECRET) as { userId: number };
        (req as any).user = { id: decoded.userId };
        next();
    } catch (err) {
        console.log('Error: ', err);
        res.status(403).json({ message: 'Invalid or Expired Token' });
    }
};
