import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../Type/types";

type AuthStateType = {
    user: User | null,
    isAuthanticated: boolean,
    isInitialized: boolean
}

const initialState = {
    user: null,
    isAuthanticated: false,
    isInitialized: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Set the authenticated user and update the authentication status
        setUser: (state: AuthStateType, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthanticated = true
        },
       // Set the initialization status
        setInitialize: (state: AuthStateType) => {
            state.isInitialized = true
        }
    }
})

export const { setUser, setInitialize } = authSlice.actions

export default authSlice.reducer