import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './features/main/mainpage';
import { testMode, root } from './config';

function App() {

  const _pathBase = testMode ? '' : `/${root}`

  return (
    <div className="App">
      <Routes>
        {/* <Route path={`/`} exact element={<MainPage/>}/> */}
        <Route path={`${_pathBase}/`} exact element={<MainPage/>}/> 
      </Routes>
    </div>
  );
}

export default App;
