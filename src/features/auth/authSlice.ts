import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, AuthResponse, User } from './authTypes';
import { signUp, login, getUser, logout } from './auththunks';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    //Sugn UP
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Sign up failed';
        state.isAuthenticated = false;
      });
    // LOGIN
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        localStorage.removeItem("hasLoggedOut");
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Login failed';
        state.isAuthenticated = false;
      });

    // GET USER
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    })
      .addCase(getUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || 'User fetch failed';
      });

    // LOGOUT
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.setItem('hasLoggedOut', 'true');
    })
      .addCase(logout.rejected, (state, action) => {
        state.error = typeof action.payload === 'string' ? action.payload : 'Logout failed';
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
