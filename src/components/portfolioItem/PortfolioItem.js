import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import './PortfolioItem.scss';

import { 
  DeleteCryptoSmall
} from '../index'

function PortfolioItem ({item}) {

  return (
    <>
      <li className='p-list__item'>

        <ul className='p-list__item__wrapper'>
          <li className='p-list__item__name' > {item.name}</li>
          <li className='p-list__item__qty' > {item.qty}</li>
          <li className='p-list__item__price' >$ {Number(item.totInvest).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</li>
        </ul>

        <  DeleteCryptoSmall />

      </li>

    </> 
  )
}

export default PortfolioItem;