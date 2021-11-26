import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import './App.scss';
import './Normalize.scss';

import { Routs } from '../utils/routes.js';

import { MainPage, Coin, Home } from '../pages';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={Routs.HomeRoute} element={<Home />} />
        <Route path='/coin' element={<Home />} />
        <Route path='/main' element={<Home />} />
        <Route path='/main/page/0' element={<Home />} />
        <Route path='/main/page/' element={<Home />} />
        <Route path='/main/page/:PageNumber' element={<MainPage />} />
        <Route path='/coin/:id' element={<Coin />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
