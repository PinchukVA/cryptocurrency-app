import React from 'react';

import './PortfolioItem.scss';

import { 
  DeleteCryptoSmall
} from '../index'

function PortfolioItem ({item, onClick}) {

  return (
    <>
      <li className='p-list__item'>

        <ul className='p-list__item__wrapper'>
          <li className='p-list__item__name' > {item.name}</li>
          <li className='p-list__item__qty' > {item.qty}</li>
          <li className='p-list__item__price' >$ {Number(item.totInvest).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</li>
        </ul>

        <  DeleteCryptoSmall onClick={onClick}/>

      </li>

    </> 
  )
}

export default PortfolioItem;