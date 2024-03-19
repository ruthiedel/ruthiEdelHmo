
import { KoronaDetails } from '../../Type/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DetailsStateType = {
  details: KoronaDetails[]
}

const initialState: DetailsStateType = {
    details: []
}

const KoronaDetailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    addKoronaDetails: (state: DetailsStateType, action: PayloadAction<KoronaDetails>) => {
      state.details.push(action.payload)
    },
    deleteKoronaDetails: (state: DetailsStateType, action: PayloadAction<String>) => {
    state.details = state.details.filter(p => p.customerId !== action.payload)
    return state
    },
    updateKoronaDetails: (state: DetailsStateType, action: PayloadAction< KoronaDetails>) => {
      for (let i = 0; i < state.details.length; i++) {
        if (state.details[i].customerId == action.payload.customerId) {
          state.details[i] = action.payload
        }
      }
      return state
    },
    setDetails: (state: DetailsStateType, action: PayloadAction<KoronaDetails[]>) => {
      state.details = action.payload; // Update the favorites array with the payload data
    },
  }
})


// Export actions and reducer
export const { addKoronaDetails, deleteKoronaDetails, updateKoronaDetails,setDetails } = KoronaDetailsSlice.actions;
export default KoronaDetailsSlice.reducer;