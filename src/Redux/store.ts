import {configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import customerSlice from "./Customer/CustomerSlice"
import KoronaDetailsSlice from './KoronaDetails/KoronaDetailsSlice'
export const store = configureStore({
    reducer: {
      customer:customerSlice,
      koronaDetails:KoronaDetailsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch: () => AppDispatch = useDispatch