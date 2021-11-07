import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import './Header.scss';

function Header ({onClick}) {

  const appState = useSelector( state => state.Reducer)

  const { headerCoins, watchList,} = appState;

  const renderTopCoins = (arr) => {
    let result;

      result = arr.map((item) => (
        <li className='header__item'>{item.name} : <span>{item.priceUsd.slice(0,7)} USD</span> </li>
      ));
      return result;
  }

  return (
    <header className='header'>

      <ul className='header__list'>
        {renderTopCoins(headerCoins)}
      </ul>

      <ul className='header__portfolio-list'>
        <li className='header__portfolio-item'> {watchList.length === 0 ? 'Portfolio empty' : ' Portf. Vol : You Rich'} </li>
        <li className='header__portfolio-item'>{watchList.length === 0 ? '' : ' Portf. Vol : You Rich'}</li>
      </ul>

      <button className='header__button' onClick={onClick}>
        <FontAwesomeIcon icon={faUserAlt} />
      </button>
      
    </header>
  );
}

export default Header;