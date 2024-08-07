import { createSlice } from '@reduxjs/toolkit'

export const ecomstorageSlice = createSlice({
  name: 'ecomstorage',
  initialState: {
    vendorData:{},
    rowData:[],
    searchResults:[]
  },
  reducers: {  
    setVendorData: (state, action) => {
      state.vendorData = action.payload
    },
    setRowData: (state, action) => {
      console.log("Data->",action.payload)
      state.rowData = action.payload
    },
    updateFavorite: (state, action) => {
      console.log("Data Id->",action.payload)
      state.rowData.map((row)=>{
        if(row.id === action.payload){
          row.favourite = !row.favourite
        }
      }
      );
    },
    romoveFavorite: (state, action) => {
      console.log("Data Id->",action.payload)
      state.rowData = state.rowData.filter((row) => row.id !== action.payload);
    },
    setSearchResults: (state, action) => {
      console.log("Search->",action.payload)
      state.searchResults = action.payload
    },
  },
})


export const { setVendorData,setRowData,updateFavorite,romoveFavorite,setSearchResults } = ecomstorageSlice.actions

export default ecomstorageSlice.reducer