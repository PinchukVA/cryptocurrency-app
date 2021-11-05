import React from 'react';

import './CryptoItem.scss';

import { AddCryptoSmall } from '../../components/index'

function CryptoItem () {
  return (

      <li className='l-list__item'>

        <ul className='l-list__item__wrapper'>
          <li className='l-list__item__number' > 1</li>
          <li className='l-list__item__name' > bitcoin</li>
          <li className='l-list__item__market' > 1162410339002</li>
          <li className='l-list__item__price' > 61619</li>
        </ul>

        <AddCryptoSmall/>

      </li>

  );
}

export default CryptoItem;