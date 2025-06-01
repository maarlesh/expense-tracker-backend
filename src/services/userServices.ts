import { USER_DETAILS, USER_DETAILS_COLUMNS } from "../configs/constants";
import { User } from "../interfaces/User";
import { getUserByUsername, insertRow } from "./dbServices";

export const validateUserCredentials = async (userName: string, password: string) => {
  const result = await getUserByUsername(userName);
  console.log('Result: ' , result);
  if (!result.rowCount) {
    return { success: false, message: 'User not found' };
  }

  const user = result.rows[0];
  if (user.password !== password) {
    return { success: false, message: 'User not authorized' };
  }

  return { success: true, user };
};

export const createUser = async (user: User) => {
  const result =  await insertRow(USER_DETAILS, USER_DETAILS_COLUMNS, [user.name, user.password]);
  if(!result.rowCount){
    return { success: false, message: 'User not inserted' };
  }
  return { success: true, user };
}