import React from 'react';

import './CryptoListHeader.scss';

function CryptoListHeader () {
  return (
    <ul className='catalogue__header'>
      <li className='catalogue__header__number' > Rank</li>
      <li className='catalogue__header__name' > Coin name</li>
      <li className='catalogue__header__market' > Market Cap</li>
      <li className='catalogue__header__price' > Price</li>
      <li className='catalogue__header__price' > Add coin</li>
  </ul>
  );
}

export default CryptoListHeader;