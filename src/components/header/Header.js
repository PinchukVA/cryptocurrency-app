import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';

import './Header.scss';

function Header () {
  return (
    <header className='header'>

      <ul className='header__list'>
        <li className='header__item'>bitcoin : 61619 USD </li>
        <li className='header__item'>ethereum : 4507 USD</li>
        <li className='header__item'>binance-coin : 610 USD </li>
      </ul>

      <ul className='header__portfolio-list'>
        <li className='header__portfolio-item'>Portf. Vol : 61619 USD </li>
        <li className='header__portfolio-item'>+15 USD (2.52%)</li>
      </ul>

      <button className='header__button' >
        <FontAwesomeIcon icon={faUserAlt} />
      </button>
      
    </header>
  );
}

export default Header;