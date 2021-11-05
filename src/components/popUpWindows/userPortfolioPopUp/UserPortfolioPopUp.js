import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import './UserPortfolioPopUp.scss';

import { 
  PortfolioHeader,
  PortfolioItem
} from '../../index'

function UserPortfolioPopUp () {

  return (
    <>
    <div className='popUpPortfolio__wraper'>

      <div className='popUpPortfolio__block slideDown'>
  
        <div className='popUpPortfolio__info'>

        <PortfolioHeader/>

          <button className='popUpPortfolio__close-button'>
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>

        </div>

        <PortfolioItem/>
        <PortfolioItem/>
        <PortfolioItem/>

      </div>
    </div>

    <div  className='popUpPortfolio__back'></div>
   </> 
  )
}

export default UserPortfolioPopUp;