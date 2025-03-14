import { getUserByUsername } from "./dbServices";

export const validateUserCredentials = async (userName: string, password: string) => {
  const result = await getUserByUsername(userName);
  if (!result.rowCount) {
    return { success: false, message: 'User not found' };
  }

  const user = result.rows[0];
  if (user.password !== password) {
    return { success: false, message: 'User not authorized' };
  }

  return { success: true, user };
};
