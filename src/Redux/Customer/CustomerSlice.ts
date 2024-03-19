
import { Customer } from '../../Type/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CustomerStateType = {
  customers: Customer[]
}

const initialState: CustomerStateType = {
    customers: []
}

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomer: (state: CustomerStateType, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload)
    },
    deleteCustomer: (state: CustomerStateType, action: PayloadAction<String>) => {
    state.customers = state.customers.filter(p => p.idNumber !== action.payload)
    return state
    },
    updateCustomer: (state: CustomerStateType, action: PayloadAction< Customer>) => {
      for (let i = 0; i < state.customers.length; i++) {
        if (state.customers[i].idNumber == action.payload.idNumber) {
          state.customers[i] = action.payload
        }
      }
      return state
    },
    setCustomers: (state: CustomerStateType, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload; // Update the favorites array with the payload data
    },
  }
})


// Export actions and reducer
export const { addCustomer, deleteCustomer, updateCustomer,setCustomers } = customerSlice.actions;
export default customerSlice.reducer;