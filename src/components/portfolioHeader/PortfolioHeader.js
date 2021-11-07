import React from 'react';

import './PortfolioHeader.scss';

function PortfolioHeader () {
  return (
    <ul className='portfolio__header'>
      <li className='portfolio__header__number' >Name</li>
      <li className='portfolio__header__name' > Qty.</li>
      <li className='portfolio__header__market' > Buy cost</li>
      <li className='portfolio__header__market' > Price</li>
      <li className='portfolio__header__price' > Total cost</li>
  </ul>
  );
}

export default PortfolioHeader;