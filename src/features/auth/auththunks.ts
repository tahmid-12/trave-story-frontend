import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import type { AuthResponse,User } from "./authTypes";

export const signUp = createAsyncThunk<AuthResponse, { fullName: string, email: string; password: string }>('auth/signup', async (credentials, { rejectWithValue}) => {
    try{
        const response = await axiosInstance.post<AuthResponse>('/auth/sign-up', credentials);
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(err: any){
        return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
});

export const login = createAsyncThunk<AuthResponse, { email: string; password: string }>('auth/login', async (credentials, { rejectWithValue}) => {
    try{
        const response = await axiosInstance.post<AuthResponse>('/auth/log-in', credentials);
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(err: any){
        return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
});

export const getUser = createAsyncThunk<
  { user: User },
  void,
  { rejectValue: string }
>('auth/getUser', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<{ user: User }>('/auth/get-user');
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch user');
  }
});

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axiosInstance.post('/auth/log-out'); // triggers res.clearCookie
      return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Logout failed'
      );
    }
  }
);