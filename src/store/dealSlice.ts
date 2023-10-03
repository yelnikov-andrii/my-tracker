import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { saveDealsToLocaleStorage } from '../helpers/saveDealsTolocaleStorage';

export interface LangState {
  deals: any[];
  dealIdToChange: null | number;
  dealsWithoutTimeline: any[];
}

const initialState: LangState = {
  deals: [],
  dealIdToChange: null,
  dealsWithoutTimeline: [],
};

export const dealSlice: any = createSlice({
  name: 'deal',
  initialState,
  reducers: {
    addDeal: (state, action: PayloadAction<any>) => {
      state.deals.push(action.payload);
      saveDealsToLocaleStorage(state.deals);
    },
    getDealsFromStorage: (state) => {
      const dealsString = localStorage.getItem('deals');
      state.deals = [];
      if (dealsString) {
        state.deals = JSON.parse(dealsString);
      }
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
    },
    clearDeals: (state) => {
      state.deals = [];
    },
    addDealWithoutTimeline: (state, action) => {
      state.dealsWithoutTimeline.push(action.payload);
    },
    updateDealWithout: (state, action) => {
      const foundDeal = state.dealsWithoutTimeline.find(deal => deal.id === action.payload);
      foundDeal.completed = !foundDeal.completed;
    },
    removeDealWithout: (state, action) => {
      state.dealsWithoutTimeline = state.dealsWithoutTimeline.filter((deal: any) => deal.id !== action.payload);
    }
  },
});

export const { addDeal, updateDeal, removeDeal, selectDealIdToChange, changeTheDeal, deleteCompletedTasks, clearDeals, getDealsFromStorage, addDealWithoutTimeline, updateDealWithout, removeDealWithout } = dealSlice.actions;

export default dealSlice.reducer;