export interface UserData {
  name: string;
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
}
export interface UserSliceState {
  data: UserData | null;
}
