import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import './PortfolioItem.scss';

import { 
  DeleteCryptoSmall
} from '../index'

function PortfolioItem () {

  return (
    <>
      <li className='p-list__item'>

        <ul className='p-list__item__wrapper'>
          <li className='p-list__item__name' > bitcoin</li>
          <li className='p-list__item__qty' > 2</li>
          <li className='p-list__item__price' > 61619</li>
          <li className='p-list__item__cost' > 125485</li>
        </ul>

        <  DeleteCryptoSmall />

      </li>

    </> 
  )
}

export default PortfolioItem;