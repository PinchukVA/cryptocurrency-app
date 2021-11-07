import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import './UserPortfolioPopUp.scss';

import { 
  PortfolioHeader,
  PortfolioItem
} from '../../index'

function UserPortfolioPopUp ({onClick}) {

  const appState = useSelector( state => state.Reducer)

  const { headerCoins, watchList,} = appState;

  const renderLists = (arr) => {

    if (arr.length === 0){
      return (
        <p className='popUpPortfolio__message'>Sorry, you portfolio is empty. Add coin to portfolio</p>
      )
    }
    const result = arr.map((item) => (
      < PortfolioItem
        key={item.id}
        item={item}
      />
    ));

    return result;
  }

  return (
    <>
    <div className='popUpPortfolio__wraper'>

      <div className='popUpPortfolio__block slideDown'>
  
        <div className='popUpPortfolio__info'>

        <PortfolioHeader/>

          <button className='popUpPortfolio__close-button' onClick={onClick}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>

        </div>
        {renderLists(watchList)}
      </div>
    </div>

    <div  className='popUpPortfolio__back'></div>
   </> 
  )
}

export default UserPortfolioPopUp;