export interface User {
  fullName: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  accesstoken: string;
  message: string;
}
