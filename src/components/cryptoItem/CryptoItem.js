import React from 'react';
import { Link } from 'react-router-dom'

import './CryptoItem.scss';

import { AddCryptoSmall } from '../../components/index'


function CryptoItem ({item, onClick}) {
  return (

      <li className='l-list__item'>

        <Link to={`/coin/${item.id}`} className="l-list__item-link">
          <ul className='l-list__item__wrapper'>
            <li className='l-list__item__number' > {item.rank}</li>

            <li className='l-list__item__name' > 
            {item.name} 
            <p className='l-list__item__symbol'>
              {item.symbol}
            </p>
            </li>
            
            <li className='l-list__item__market' > $ {Number(item.marketCapUsd).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</li>
            <li className='l-list__item__price' >  $ {item.priceUsd.slice(0,7)}</li>
          </ul>
        </Link>

        <AddCryptoSmall
          onClick ={onClick}
        />

      </li>

  );
}

export default CryptoItem;