import { Request, Response } from 'express';
import pool from '../helpers/dbHelper';
import { sendSuccessResponse, sendInternalServerError, sendInvalidParameters, sendUnauthorisedError } from '../helpers/responseHelper';
import { User } from '../interfaces/User';
import { generateAccessToken, generateRefreshToken } from '../services/authServices';
import { validateUserCredentials } from '../services/userServices';
import { insertRow } from '../services/dbServices';
import { USER_DETAILS, USER_DETAILS_COLUMNS } from '../configs/constants';


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    if (userName && password) {
      const result = await validateUserCredentials(userName, password);
      if (result.success) {
        const user = result.user;
        const accessToken = generateAccessToken(user.user_id);
        const refreshToken = generateRefreshToken(user.user_id);

        sendSuccessResponse(res, 'User Validated', {
          message: 'User authenticated successfully',
          accessToken,
          refreshToken,
        });
      } else {
        sendUnauthorisedError(res, 'User not authorized');
      }
    } else {
      sendInvalidParameters(res, 'User not found');
    }
  }
  catch (err) {
    sendInternalServerError(res, 'Unexpected error during login'+err);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body as User;
    console.log(user);
    await insertRow(USER_DETAILS, USER_DETAILS_COLUMNS, [user.name, user.password]);
    sendSuccessResponse(res, 'User data inserted', user);
  } catch (err) {
    sendInternalServerError(res, 'Unexpected error during user creation' + err);
  }
}