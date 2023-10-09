import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { test } from "./mainpageSliceAPI";


const initialState = {
  loading: false,
  data: null
}

export const testThunk = createAsyncThunk( 'mainpage/getStaffbook', async ( data ) => await test(data) )

export const mainpageSlice = createSlice({
  name: 'mainpage',
  initialState,
  reducers: {
    clearData: (state, action) => {
      state.data = null;
    },

  },

  extraReducers: (builder) => { builder
    
    .addCase(testThunk.pending, ( state ) => { state.loading = true })
    .addCase(testThunk.fulfilled, ( state, action ) => {
      console.log(action.payload);
      state.data = action.payload;
      state.loading = false;
    })


  }
});

export const { clearData } = mainpageSlice.actions;

export const loading  = ( state ) => state.mainpage.loading;
export const data  = ( state ) => state.mainpage.data;


export default mainpageSlice.reducer;
