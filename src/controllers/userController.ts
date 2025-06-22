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
          userId: user.user_id
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
    const userId = parseFloat(req.params.userId);

    const name = req.query.name as string;
    const password = req.query.password as string;
    const email = req.query.email as string | undefined;
    const phoneNumber = req.query.phoneNumber as string | undefined;

    // Validate required fields
    if (!name || name.trim() === '' || !password || password.trim() === '') {
      return sendInvalidParameters(res, 'Name and password fields are required and cannot be empty', []);
    }

    const user: User = {
      userId: userId,
      name: name.trim(),
      password: password.trim(),
      email,
      phoneNumber,
    };

    const result = await createUser(user);
    
    console.debug('Result:', result);
    if (result.success) {
      sendSuccessResponse(res, 'User data inserted', result.user);
    } else {
      sendInternalServerError(res, 'User creation failed', result || 'Unknown error');
    }
  } catch (err) {
    sendInternalServerError(res, 'Unexpected error during user creation: ' + err);
  }
};
