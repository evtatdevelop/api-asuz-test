import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRemoteUser, getUserData, setUserLang, searchUsers } from "./mainpageSliceAPI";
import { getMainpageData, addPrefers, delPrefers } from "./mainpageSliceAPI";

const initialState = {
  tests: []
}

export const remoteUser   = createAsyncThunk( 'mainpage/remoteUser', async () => await getRemoteUser({}) );
export const getUserId    = createAsyncThunk( 'mainpage/getUserId', async ( data ) => await getUserData(data) );
export const getUserLogin = createAsyncThunk( 'mainpage/getUserLogin', async ( data ) => await getUserData(data) );
export const setLang      = createAsyncThunk( 'mainpage/setLang', async ( data ) => await setUserLang(data) );
export const searchUser   = createAsyncThunk( 'mainpage/searchUser', async ( data ) => await searchUsers(data) );
export const getMainpage  = createAsyncThunk( 'mainpage/getMainpage', async (data) => await getMainpageData(data) );
export const addToPrefers = createAsyncThunk( 'primarypage/addToPrefers', async ( data ) => await addPrefers(data) )
export const delToPrefers = createAsyncThunk( 'primarypage/delToPrefers', async ( data ) => await delPrefers(data) )

export const mainpageSlice = createSlice({
  name: 'mainpage',
  initialState,
  reducers: {},

  extraReducers: (builder) => { builder
    
    // remoteUser
    .addCase(remoteUser.pending, ( state ) => {
      state.tests = [...state.tests, { name: 'Getting a logged in user', query: 'remoteuser', data: null, result: null }];    
    })
    .addCase(remoteUser.fulfilled, ( state, action ) => {
      const test = state.tests.find(test => test.query === 'remoteuser');
      test.data = action.payload;
      test.result = Number.isInteger(Number(action.payload.id));
    })

    // userId
    .addCase(getUserId.pending, ( state ) => {
      state.tests = [...state.tests, { name: 'Getting user by ID', query: 'userId', data: null, result: null }];    
    })
    .addCase(getUserId.fulfilled, ( state, action ) => {
      const test = state.tests.find(test => test.query === 'userId');
      test.data = action.payload;
      test.result = Number.isInteger(Number(action.payload.id));
    })

    // userLogin
    .addCase(getUserLogin.pending, ( state ) => {
      state.tests = [...state.tests, { name: 'Getting user by Login', query: 'userLogin', data: null, result: null }];    
    })
    .addCase(getUserLogin.fulfilled, ( state, action ) => {
      const test = state.tests.find(test => test.query === 'userLogin');
      test.data = action.payload;
      test.result = Number.isInteger(Number(action.payload.id));
    })

    // setLang
    .addCase(setLang.pending, ( state ) => {
      state.tests = [...state.tests, { name: 'Setting the user language', query: 'setLang', data: null, result: null }];    
    })
    .addCase(setLang.fulfilled, ( state, action ) => {
      const test = state.tests.find(test => test.query === 'setLang');
      test.data = action.payload;
      test.result = state.tests.find(test => test.query === 'remoteuser').data.lang !== test.data.lang;
    })

    // searchUser
    .addCase(searchUser.pending, ( state ) => {
      state.tests = [...state.tests, { name: 'Search user by string', query: 'searchUser', data: null, result: null }];    
    })
    .addCase(searchUser.fulfilled, ( state, action ) => {
      const test = state.tests.find(test => test.query === 'searchUser');
      test.data = action.payload;
      test.result = test.data.length===1 && test.data[0].id === state.tests.find(test => test.query === 'remoteuser').data.id;
    })

    // getMainpage
    .addCase(getMainpage.pending, ( state ) => {
      state.tests = [...state.tests, { name: 'Retrieving Home Page Data', query: 'getMainpage', data: null, result: null }];    
    })
    .addCase(getMainpage.fulfilled, ( state, action ) => {
      const test = state.tests.find(test => test.query === 'getMainpage');
      test.data = action.payload;
      test.result = !!(test.data.sections && test.data.sections.length && test.data.dictionary);
    })

    // addToPrefers
    .addCase(addToPrefers.pending, ( state ) => {
      state.tests = [...state.tests, { name: 'Add to favorites', query: 'addToPrefers', data: null, result: null }];    
    })
    .addCase(addToPrefers.fulfilled, ( state, action ) => {
      const test = state.tests.find(test => test.query === 'addToPrefers');
      test.data = action.payload;
      test.result = action.payload.sections.find(sections => sections.prefix === 'FAVORITES').systems.length
                  - state.tests.find(test => test.query === 'getMainpage').data.sections.find(sections => sections.prefix === 'FAVORITES').systems.length
                  === 1;
    })

    // delToPrefers
    .addCase(delToPrefers.pending, ( state ) => {
      state.tests = [...state.tests, { name: 'Remove from favorites', query: 'delToPrefers', data: null, result: null }];    
    })
    .addCase(delToPrefers.fulfilled, ( state, action ) => {
      const test = state.tests.find(test => test.query === 'delToPrefers');
      test.data = action.payload;
      test.result = state.tests.find(test => test.query === 'addToPrefers').data.sections.find(sections => sections.prefix === 'FAVORITES').systems.length
                  - state.tests.find(test => test.query === 'delToPrefers').data.sections.find(sections => sections.prefix === 'FAVORITES').systems.length
                  === 1;
    })


  }
});

export const { clearData } = mainpageSlice.actions;
export const tests  = ( state ) => state.mainpage.tests;

export default mainpageSlice.reducer;
