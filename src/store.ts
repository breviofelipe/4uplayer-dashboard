// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice';
import usersReduer from './features/users/usersSlice';
import counterReducer from './features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    users: usersReduer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
