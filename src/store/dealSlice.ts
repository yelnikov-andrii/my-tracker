import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LangState {
  deals: any[]
}

const initialState: LangState = {
  deals: [],
};

export const dealSlice: any = createSlice({
  name: 'deal',
  initialState,
  reducers: {
    addDeal: (state, action: PayloadAction<any>) => {
      state.deals.push(action.payload);
    },
    updateDeal: (state, action: PayloadAction<any>) => {
    const foundDeal = state.deals.find(deal => deal.id === action.payload);
    foundDeal.completed = !foundDeal.completed;
    },
    removeDeal: (state, action: PayloadAction<any>) => {
      state.deals = state.deals.filter(deal => deal.id !== action.payload);
    }
  },
});

export const { addDeal, updateDeal, removeDeal } = dealSlice.actions;

export default dealSlice.reducer;