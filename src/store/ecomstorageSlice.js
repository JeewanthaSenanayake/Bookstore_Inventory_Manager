import { createSlice } from '@reduxjs/toolkit'

export const ecomstorageSlice = createSlice({
  name: 'ecomstorage',
  initialState: {
    vendorData:{},
    rowData:[]
  },
  reducers: {  
    setVendorData: (state, action) => {
      state.vendorData = action.payload
    },
    setRowData: (state, action) => {
      console.log("Data->",action.payload)
      state.rowData = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setVendorData,setRowData } = ecomstorageSlice.actions

export default ecomstorageSlice.reducer