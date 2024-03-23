import { ThunkAction, UnknownAction, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import customerSlice from "./Customer/CustomerSlice"
import KoronaDetailsSlice from './KoronaDetails/KoronaDetailsSlice'
import authSlice from './auth2/auth.slice'
export const store = configureStore({
    reducer: {
      customer:customerSlice,
      koronaDetails:KoronaDetailsSlice,
      auth:authSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch: () => AppDispatch = useDispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    Promise<ReturnType> | ReturnType,
    RootState,
    unknown,
    UnknownAction
>