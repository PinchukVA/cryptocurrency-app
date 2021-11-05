import React  from 'react';

import './App.scss';
import './Normalize.scss';


import { 
  Header,
  CryptoItem,
  CryptoListHeader
} from '../components/index.js'

function App() {
  return (
    <div className="app">
      < Header/>
        <section className="catalogue">
          <CryptoListHeader/>
          <ul className="catalogue__list">
            <CryptoItem />
            <CryptoItem />
            <CryptoItem />
          </ul>
        </section>
    </div>
  );
}

export default App;
