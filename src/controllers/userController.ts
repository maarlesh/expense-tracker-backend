import { Request, Response } from 'express';
import pool from '../helpers/dbHelper';
import { sendSuccessResponse, sendInternalServerError, sendInvalidParameters, sendUnauthorisedError} from '../helpers/responseHelper';
import { User } from '../interfaces/User';
import { generateAccessToken, generateRefreshToken } from '../services/authServices';

export const connectDB = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    sendSuccessResponse(res, 'Connected to database', result);
  } catch (err) {
    console.log('Error in connecting to the database:', err);
    sendInternalServerError(res, 'Database connection error');
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    if (userName && password) {
      const result = await pool.query(`SELECT * FROM user_details WHERE name = $1`, [userName]);
      if (result.rowCount) {
        const user = result.rows[0];
        if (user.password === password) {
          console.log('User_id: ', user);
          const accessToken = generateAccessToken(user.user_id);
          const refreshToken = generateRefreshToken(user.user_id);
      
          var hehe = {
            message: 'User authenticated successfully',
            accessToken,
            refreshToken,
          };
          sendSuccessResponse(res, 'User Validated', hehe);
        } else {
            sendUnauthorisedError(res, 'User not authorized');
        }
      } else {
        sendInvalidParameters(res, 'User not found');
      }
    } else {
        sendInvalidParameters(res, 'Invalid parameters');
    }
  } catch (err) {
    console.log('Error:', err);
    sendInternalServerError(res, 'Unexpected error during login');
  }
};

export const createUser = async (req: Request, res:Response) => {
  try{
    const user : User = req.body as User;
    console.log(user);
    sendSuccessResponse(res, 'User data inserted', user);
  }catch (err) {
    sendInternalServerError(res, 'Unexpected error during user creation');
  }
}