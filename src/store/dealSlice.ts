import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { saveDealsToLocaleStorage } from '../helpers/saveDealsTolocaleStorage';

export interface LangState {
  deals: any[];
  dealIdToChange: null | number;
}

const initialState: LangState = {
  deals: [],
  dealIdToChange: null,
};

export const dealSlice: any = createSlice({
  name: 'deal',
  initialState,
  reducers: {
    addDeal: (state, action: PayloadAction<any>) => {
      state.deals.push(action.payload);
      saveDealsToLocaleStorage([...state.deals, action.payload]);
    },
    updateDeal: (state, action: PayloadAction<any>) => {
    const foundDeal = state.deals.find(deal => deal.id === action.payload);
    foundDeal.completed = !foundDeal.completed;
    saveDealsToLocaleStorage([...state.deals]);
    },
    removeDeal: (state, action: PayloadAction<any>) => {
      state.deals = state.deals.filter(deal => deal.id !== action.payload);
      saveDealsToLocaleStorage([...state.deals]);
    },
    selectDealIdToChange: (state, action: PayloadAction<any>) => {
      state.dealIdToChange = action.payload;
    },
    changeTheDeal: (state, action: PayloadAction<any>) => {
      const foundDeal = state.deals.find(deal => deal.id === state.dealIdToChange);
      foundDeal.name = action.payload.name;
      foundDeal.start = action.payload.start;
      foundDeal.finish = action.payload.finish;
      saveDealsToLocaleStorage([...state.deals]);
    },
    deleteCompletedTasks: (state) => {
      state.deals = state.deals.filter(deal => deal.completed === false);
      saveDealsToLocaleStorage([...state.deals]);
    }
  },
});

export const { addDeal, updateDeal, removeDeal, selectDealIdToChange, changeTheDeal, deleteCompletedTasks } = dealSlice.actions;

export default dealSlice.reducer;