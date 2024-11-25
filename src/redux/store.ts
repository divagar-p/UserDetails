import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slice/LoginSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

// Define RootState and AppDispatch types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
