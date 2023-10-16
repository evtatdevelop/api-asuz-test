import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRemoteUser, getUserData, setUserLang, searchUsers } from "./mainpageSliceAPI";
import { getMainpageData, addPrefers, delPrefers } from "./mainpageSliceAPI";

const initialState = {
  testing: null,
  tests: [],
  logs: [],
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
  reducers: {
    addLog: (state, action) => {
      state.logs = [...state.logs, action.payload]
    }, 
    setTesting: (state, action) => {
      state.testing = action.payload;
    }, 
  },

  extraReducers: (builder) => { builder
    
    // remoteUser
    .addCase(remoteUser.pending, ( state ) => {

      state.tests = [{ name: 'Getting a logged in user', query: 'remoteuser', data: null, result: null }];
      state.logs = [...state.logs, 'Getting remote user...'];
    })
    .addCase(remoteUser.fulfilled, ( state, action ) => {
      const test = state.tests.find(test => test.query === 'remoteuser');
      test.data = action.payload;
      test.result = Number.isInteger(Number(action.payload.id));
      state.logs = [...state.logs, `Received user: ID  ${action.payload.id}, Login: ${action.payload.login}` ];
    })

    // userId
    .addCase(getUserId.pending, ( state ) => {
      state.tests = [...state.tests, { name: 'Getting user by ID', query: 'userId', data: null, result: null }]; 
      const remoteUser = state.tests.find(test => test.query === 'remoteuser').data;
      state.logs = [...state.logs, `Getting user by ID=${remoteUser.id}...`];
    })
    .addCase(getUserId.fulfilled, ( state, action ) => {
      const test = state.tests.find(test => test.query === 'userId');
      test.data = action.payload;
      test.result = Number.isInteger(Number(action.payload.id));
      state.logs = [...state.logs, `Received user: Login ${action.payload.login}` ];
    })

    // userLogin
    .addCase(getUserLogin.pending, ( state ) => {
      state.tests = [...state.tests, { name: 'Getting user by Login', query: 'userLogin', data: null, result: null }];
      const remoteUser = state.tests.find(test => test.query === 'remoteuser').data;
      state.logs = [...state.logs, `Getting user by Login=${remoteUser.login}...`];
    })
    .addCase(getUserLogin.fulfilled, ( state, action ) => {
      const test = state.tests.find(test => test.query === 'userLogin');
      test.data = action.payload;
      test.result = Number.isInteger(Number(action.payload.id));
      state.logs = [...state.logs, `Received user: ID ${action.payload.id}` ];
    })

    // setLang
    .addCase(setLang.pending, ( state ) => {
      state.tests = [...state.tests, { name: 'Setting the user language', query: 'setLang', data: null, result: null }];
      state.logs = [...state.logs, `Changing the interface language...`];
    })
    .addCase(setLang.fulfilled, ( state, action ) => {
      const test = state.tests.find(test => test.query === 'setLang');
      test.data = action.payload;
      test.result = state.tests.find(test => test.query === 'remoteuser').data.lang !== test.data.lang;
      state.logs = [...state.logs, `Interface language changed to: ${action.payload}` ];
    })

    // searchUser
    .addCase(searchUser.pending, ( state ) => {
      state.tests = [...state.tests, { name: 'Search user by string', query: 'searchUser', data: null, result: null }];
      const remoteUser = state.tests.find(test => test.query === 'remoteuser').data;
      state.logs = [...state.logs, `Searching user by string=${remoteUser.email.split('@')[0]}...`];    
    })
    .addCase(searchUser.fulfilled, ( state, action ) => {
      const test = state.tests.find(test => test.query === 'searchUser');
      test.data = action.payload;
      test.result = test.data.length===1 && test.data[0].id === state.tests.find(test => test.query === 'remoteuser').data.id;
      state.logs = [...state.logs, `Received user: ${action.payload[0].first_name} ${action.payload[0].last_name}` ];
    })

    // getMainpage
    .addCase(getMainpage.pending, ( state ) => {
      state.tests = [...state.tests, { name: 'Retrieving Home Page Data', query: 'getMainpage', data: null, result: null }];
      state.logs = [...state.logs, `Obtaining data for the AMS main page...`];
    })
    .addCase(getMainpage.fulfilled, ( state, action ) => {
      const test = state.tests.find(test => test.query === 'getMainpage');
      test.data = action.payload;
      test.result = !!(test.data.sections && test.data.sections.length && test.data.dictionary);
      state.logs = [...state.logs, `Sections received: ${action.payload.sections.length}`]; 
    })

    // addToPrefers
    .addCase(addToPrefers.pending, ( state ) => {
      state.tests = [...state.tests, { name: 'Add to favorites', query: 'addToPrefers', data: null, result: null }];
      state.logs = [...state.logs, `Adding a random system to favorites...`];
    })
    .addCase(addToPrefers.fulfilled, ( state, action ) => {
      const test = state.tests.find(test => test.query === 'addToPrefers');
      test.data = action.payload;
      test.result = action.payload.sections.find(sections => sections.prefix === 'FAVORITES').systems.length
                  - state.tests.find(test => test.query === 'getMainpage').data.sections.find(sections => sections.prefix === 'FAVORITES').systems.length
                  === 1;
       const pl_syst = action.payload.sections.find(sections => sections.prefix === 'FAVORITES').systems.map(syst => syst.system_prefix);
       const st_syst = state.tests.find(test => test.query === 'getMainpage').data.sections.find(sections => sections.prefix === 'FAVORITES').systems.map(syst => syst.system_prefix);
       state.logs = [...state.logs, `'${pl_syst.filter(system_prefix => !st_syst.includes(system_prefix))}' application has been added`]; 
    })

    // delToPrefers
    .addCase(delToPrefers.pending, ( state ) => {
      state.tests = [...state.tests, { name: 'Remove from favorites', query: 'delToPrefers', data: null, result: null }];
      state.logs = [...state.logs, `Removing an added system from favorites...`];
    })
    .addCase(delToPrefers.fulfilled, ( state, action ) => {
      const test = state.tests.find(test => test.query === 'delToPrefers');
      test.data = action.payload;
      test.result = state.tests.find(test => test.query === 'addToPrefers').data.sections.find(sections => sections.prefix === 'FAVORITES').systems.length
                  - state.tests.find(test => test.query === 'delToPrefers').data.sections.find(sections => sections.prefix === 'FAVORITES').systems.length
                  === 1;
      const pl_syst = action.payload.sections.find(sections => sections.prefix === 'FAVORITES').systems.map(syst => syst.system_prefix);
      const st_syst = state.tests.find(test => test.query === 'addToPrefers').data.sections.find(sections => sections.prefix === 'FAVORITES').systems.map(syst => syst.system_prefix);
      state.logs = [...state.logs, `'${st_syst.filter(system_prefix => !pl_syst.includes(system_prefix))}' application has been removed`];                   
      state.testing = 'stop'                       
    })


  }
});

export const { addLog, setTesting } = mainpageSlice.actions;
export const tests  = ( state ) => state.mainpage.tests;
export const logs  = ( state ) => state.mainpage.logs;
export const testing  = ( state ) => state.mainpage.testing;

export default mainpageSlice.reducer;
