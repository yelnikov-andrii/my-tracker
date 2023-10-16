import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import { saveDealsToLocaleStorage } from '../helpers/saveDealsTolocaleStorage';
import { formatDate } from '../helpers/formateDate';

export interface DealState {
  deals: any[];
  dealIdToChange: null | number;
  dealsWithoutTimeline: any[];
  dealName: string;
  dealIdToAddAfterThis: null | number;
  dealIdToAddBeforeThis: null | number;
}

const initialState: DealState = {
  deals: [],
  dealIdToChange: null,
  dealsWithoutTimeline: [],
  dealName: '',
  dealIdToAddAfterThis: null,
  dealIdToAddBeforeThis: null,
};

export const dealSlice = createSlice({
  name: 'deal',
  initialState,
  reducers: {
    addDeal: (state, action) => {
      state.deals.push(action.payload);
      saveDealsToLocaleStorage(state.deals);
    },
    addDealAfterThis: (state, action) => {
      const foundIndex = state.deals.findIndex(deal => deal.id === state.dealIdToAddAfterThis);
      if (foundIndex !== -1) {
        state.deals.splice(foundIndex + 1, 0, action.payload);
        saveDealsToLocaleStorage(state.deals);
      }
    },
    addDealBeforeThis: (state, action) => {
      const foundIndex = state.deals.findIndex(deal => deal.id === state.dealIdToAddBeforeThis);
      if (foundIndex !== -1) {
        state.deals.splice(foundIndex, 0, action.payload);
        saveDealsToLocaleStorage(state.deals);
      }
    },
    getDealsFromStorage: (state) => {
      const dealsString = localStorage.getItem('deals');
      state.deals = [];
      if (dealsString) {
        state.deals = JSON.parse(dealsString);
      }
    },
    updateDeal: (state, action) => {
    const foundDeal = state.deals.find(deal => deal.id === action.payload);
    foundDeal.completed = !foundDeal.completed;
    saveDealsToLocaleStorage([...state.deals]);
    },
    removeDeal: (state, action) => {
      state.deals = state.deals.filter(deal => deal.id !== action.payload);
      saveDealsToLocaleStorage([...state.deals]);
    },
    selectDealIdToChange: (state, action) => {
      state.dealIdToChange = action?.payload?.id || null;
      state.dealName = state.deals.find(deal => deal.id === action?.payload?.id)?.name || '';
    },
    selectDealIdToAddAfterThis: (state, action) => {
      state.dealIdToAddAfterThis = action.payload;
    },
    selectDealIdToAddBeforeThis: (state, action) => {
      state.dealIdToAddBeforeThis = action.payload;
    },
    changeTheDeal: (state, action) => {
      const foundDeal = state.deals.find(deal => deal.id === state.dealIdToChange);
      foundDeal.name = action.payload.name;
      foundDeal.start = action.payload.start;
      foundDeal.finish = action.payload.finish;
      saveDealsToLocaleStorage([...state.deals]);
    },
    deleteCompletedTasks: (state, action) => {
      const formatedDate = formatDate(action.payload);
      state.deals = state.deals.filter(deal => (deal.date === formatedDate && !deal.completed) || deal.date !== formatedDate);
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
    },
    changeDealName: (state, action) => {
      state.dealName = action.payload;
    }
  },
});

export const { addDeal, updateDeal, removeDeal, selectDealIdToChange, changeTheDeal, deleteCompletedTasks, clearDeals, getDealsFromStorage, addDealWithoutTimeline, updateDealWithout, removeDealWithout, changeDealName, selectDealIdToAddAfterThis, addDealAfterThis, selectDealIdToAddBeforeThis, addDealBeforeThis } = dealSlice.actions;

export default dealSlice.reducer;