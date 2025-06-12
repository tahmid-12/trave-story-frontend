export interface User {
  fullName: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  accesstoken: string;
  message: string;
}

export interface AuthState{
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}