export interface UserData {
  id: string;
  userId: string;
  name: string;
  phone: string;
  createdAt: string;
  accessToken: string;
  refreshToken: string;
}
export interface UserSliceState {
  data: UserData | null;
}
