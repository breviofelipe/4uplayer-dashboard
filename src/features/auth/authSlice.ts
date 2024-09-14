// src/features/auth/authSlice.ts
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string, picturePath: string, email: string } | null;
  username: string | null,
  token: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  username: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string, picturePath: string, email: string, token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
