import { configureStore } from '@reduxjs/toolkit'
import ecomstorageReducer from './ecomstorageSlice'

export default configureStore({
    reducer: {
    ecomstorage: ecomstorageReducer,
  },
})