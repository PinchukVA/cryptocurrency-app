import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import './UserPortfolioPopUp.scss';

import { 
  PortfolioHeader,
  PortfolioItem
} from '../../index'

import { setWatchList } from '../../../redux/actions/Actions.js'

function UserPortfolioPopUp ({onClick}) {
  const dispatch = useDispatch();
  const appState = useSelector( state => state.Reducer)
  const { watchList} = appState;

  const deleteCoin = (id) => {
    console.log('deleteCoin', id)
    const storeListCopy = [...watchList]
    const watchListCopy = JSON.parse(localStorage.getItem('watchList')) 

    storeListCopy.splice(storeListCopy.findIndex(item => item.id === id), 1);
    watchListCopy.splice(watchListCopy.findIndex(item => item.id === id), 1);

    localStorage.setItem('watchList', JSON.stringify(watchListCopy))
    dispatch(setWatchList(storeListCopy));
  }

  

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
        onClick={()=>deleteCoin(item.id)}
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