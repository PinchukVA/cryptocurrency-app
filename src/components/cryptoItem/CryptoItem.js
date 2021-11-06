import React from 'react';
import { Link } from 'react-router-dom'

import './CryptoItem.scss';

import { AddCryptoSmall } from '../../components/index'


function CryptoItem ({item, taskId, onClick}) {
  return (

      <li className='l-list__item'>

        <Link to={`/coin/${item.id}`} className="l-list__item-link">
          <ul className='l-list__item__wrapper'>
            <li className='l-list__item__number' > {taskId}</li>
            <li className='l-list__item__name' > {item.name}</li>
            <li className='l-list__item__market' > {`$ ${Number(item.marketCapUsd).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`}</li>
            <li className='l-list__item__price' > {`$ ${Number(item.priceUsd).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`}</li>
          </ul>
        </Link>

        <AddCryptoSmall
          onClick ={onClick}
        />

      </li>

  );
}

export default CryptoItem;