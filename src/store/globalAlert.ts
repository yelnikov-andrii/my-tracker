import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateInterface {
    alert: string;
}

const globalAlert: StateInterface = {
    alert: '',
}

export const alertSlice = createSlice({
    name: 'global_alert',
    initialState: globalAlert,
    reducers: {
        setGlobalAlert: (state: StateInterface, action: PayloadAction<string>) => {
            state.alert = action.payload;
        },
        clearGlobalAlert: (state: StateInterface) => {
            state.alert = '';
        }
    }
});

export const { setGlobalAlert, clearGlobalAlert } = alertSlice.actions;
export default alertSlice.reducer;
