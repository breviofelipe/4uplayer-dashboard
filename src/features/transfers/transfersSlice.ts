import type { PayloadAction } from '@reduxjs/toolkit';
import type { History } from 'src/sections/transfers/transfers-history-table-row';

import { createSlice } from '@reduxjs/toolkit';

interface TransfersHistoryState {
  histories: History[]
}

const initialState: TransfersHistoryState = {
    histories: [],  
};

const transfersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setHistories: (state, action: PayloadAction<{ histories : History[]}>) => {
      state.histories = action.payload.histories;
    },
    moreHistories: (state, action: PayloadAction<{ histories : History[]}>) => {
        const old = state.histories;
        const news = action.payload.histories;
        state.histories = [...old, ...news];
    },
  },
});

export const { setHistories, moreHistories } = transfersSlice.actions;
export default transfersSlice.reducer;
