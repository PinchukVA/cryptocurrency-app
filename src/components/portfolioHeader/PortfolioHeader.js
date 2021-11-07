import React from 'react';

import './PortfolioHeader.scss';

function PortfolioHeader () {
  return (
    <ul className='portfolio__header'>
      <li className='portfolio__header__number' >Name</li>
      <li className='portfolio__header__name' > Qty.</li>
      <li className='portfolio__header__market' > Total invest</li>
  </ul>
  );
}

export default PortfolioHeader;