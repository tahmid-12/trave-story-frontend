import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { travelApi } from '../features/travel/travelApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [travelApi.reducerPath]: travelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(travelApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch