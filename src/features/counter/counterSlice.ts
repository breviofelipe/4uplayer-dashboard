// src/features/counter/counterSlice.ts
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

// Definir o tipo para o estado
interface CounterState {
  value: number;
}

// Estado inicial
const initialState: CounterState = {
  value: 0,
};

// Criar a slice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Exportar actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Exportar o reducer
export default counterSlice.reducer;
