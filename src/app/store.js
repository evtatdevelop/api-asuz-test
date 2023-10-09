import { configureStore } from '@reduxjs/toolkit';
import mainpageReducer from '../features/main/mainpageSlice'

export const store = configureStore({
  reducer: {
    mainpage: mainpageReducer
  },
});