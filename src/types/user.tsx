export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export interface UserData {
  name: string;
  email: string;
  spentAmount: number;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: UserData;
}

export type UserActionTypes = LoginSuccessAction;
