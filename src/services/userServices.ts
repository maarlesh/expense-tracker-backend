import { USER_DETAILS, USER_DETAILS_COLUMNS } from "../configs/constants";
import { User } from "../interfaces/User";
import { getUserByUsername, insertRow } from "./dbServices";

export const validateUserCredentials = async (userName: string, password: string) => {
  const result = await getUserByUsername(userName);
  console.log('Result: ', result);
  if (!result.rowCount) {
    return { success: false, message: 'User not found' };
  }

  const user = result.rows[0];
  if (user.password !== password) {
    return { success: false, message: 'User not authorized' };
  }

  return { success: true, user };
};

export const createUser = async (user: User): Promise<{ success: boolean; user?: User; message?: string }> => {
  try {
    const result = await insertRow(
      USER_DETAILS,
      USER_DETAILS_COLUMNS,
      [user.name, user.password, user.email, user.phoneNumber]
    );

    if (!result.rowCount || result.rows.length === 0) {
      return { success: false, message: 'User not inserted' };
    }

    const insertedUser: User = {
      userId: result.rows[0].user_id,
      name: result.rows[0].name,
      password: result.rows[0].password,
      email: result.rows[0].email,
      phoneNumber: result.rows[0].phone_number,
    };

    return { success: true, user: insertedUser };
  } catch (err: any) {
    if (err.code === '23505') {
      if (err.detail.includes('name')) {
        return { success: false, message: 'Username already exists' };
      } else if (err.detail.includes('phone_number')) {
        return { success: false, message: 'Phone number already exists' };
      }
    }

    return { success: false, message: 'Database error: ' + err.message };
  }
};
