import { Request, Response } from 'express';
import { sendSuccessResponse, sendInternalServerError, sendInvalidParameters, sendUnauthorisedError } from '../helpers/responseHelper';
import { User } from '../interfaces/User';
import { generateAccessToken, generateRefreshToken } from '../services/authServices';
import { validateUserCredentials, createUser } from '../services/userServices';


export const loginUser = async (req: Request, res: Response) => {
  try {
    const userName = req.query.userName;
    const password = req.query.password;
    if (userName && password && typeof userName == 'string' && typeof password == 'string') {
      const result = await validateUserCredentials(userName, password);
      if (result.success) {
        const user = result.user;
        // const accessToken = generateAccessToken(user.user_id);
        // const refreshToken = generateRefreshToken(user.user_id);

        sendSuccessResponse(res, 'User Validated', {
          message: 'User authenticated successfully',
          name: user.name,
          user_id: user.user_id
        });
      } else {
        sendUnauthorisedError(res, 'User not authorized');
      }
    } else {
      sendInvalidParameters(res, 'Username and password fields are required', []);
    }
  }
  catch (err) {
    sendInternalServerError(res, 'Unexpected error during login'+err);
  }
};

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body as User;
    var result = createUser(user);
    if((await result).success){
      sendSuccessResponse(res, 'User data inserted', user);
    }
  } catch (err) {
    sendInternalServerError(res, 'Unexpected error during user creation' + err);
  }
}