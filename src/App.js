import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './features/main/mainpage';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path={`/`} exact element={<MainPage/>}/> 
      </Routes>
    </div>
  );
}

export default App;
