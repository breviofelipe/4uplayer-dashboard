import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'src/sections/user/user-table-row';

import { createSlice } from '@reduxjs/toolkit';

interface UsersState {
  users: User[]
}

const initialState: UsersState = {
    users: [],  
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<{ users : User[]}>) => {
      state.users = action.payload.users;
    },
    moreUsers: (state, action: PayloadAction<{ users : User[]}>) => {
        const oldUsers = state.users;
        const newUsers = action.payload.users;
        state.users = [...oldUsers, ...newUsers];
    },
  },
});

export const { setUsers, moreUsers } = usersSlice.actions;
export default usersSlice.reducer;
