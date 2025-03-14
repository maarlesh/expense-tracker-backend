import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const generateAccessToken = (userId: number) => {
    return jwt.sign({ userId: userId }, ACCESS_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId: number) => {
    return jwt.sign({ userId: userId }, REFRESH_SECRET, { expiresIn: '10d' });
};