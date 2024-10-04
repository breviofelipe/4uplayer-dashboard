// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice';
import usersReducer from './features/users/usersSlice';
import counterReducer from './features/counter/counterSlice';
import transferReducer from './features/transfers/transfersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    users: usersReducer,
    transfers: transferReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
