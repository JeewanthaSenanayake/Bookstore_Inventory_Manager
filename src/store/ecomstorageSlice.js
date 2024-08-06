import { createSlice } from '@reduxjs/toolkit'

export const ecomstorageSlice = createSlice({
  name: 'ecomstorage',
  initialState: {
    vendorData:{}
  },
  reducers: {  
    setVendorData: (state, action) => {
      state.vendorData = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setVendorData } = ecomstorageSlice.actions

export default ecomstorageSlice.reducer