import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateInterface {
    isAuth: boolean;
    user: null | any;
}

const authState: StateInterface = {
    isAuth: false,
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: authState,
    reducers: {
        changeAuth: (state: StateInterface, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        changeUser: (state: StateInterface, action: PayloadAction<any>) => {
            state.user = action.payload;
        }
    }
});

export const { changeAuth, changeUser } = authSlice.actions;
export default authSlice.reducer;
