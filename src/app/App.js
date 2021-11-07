import React  from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.scss';
import './Normalize.scss';

import { Routs } from '../utils/routes.js'

import { 
    MainPage, 
    Coin, 
    Home 
} from '../pages'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Routs.HomeRoute} element={<Home />} />
        <Route path={Routs.MainRoute} element={<MainPage />} />
        <Route path='/coin/:id' element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
