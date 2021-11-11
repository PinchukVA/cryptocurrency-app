import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import './AddCryptoPopUp.scss';
import {
  setAddCoin,
  setQtyCoin,
  setQtyError,
  setWatchList,
} from '../../../redux/actions/Actions';

function AddCryptoPopUp() {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.Reducer);
  const { coinQty, coinQtyError, idCoinToAdd, coinList, coinPrice, coinToAdd } = appState;

  const closeAddCoin = () => {
    dispatch(setAddCoin(false));
    dispatch(setQtyCoin(''));
    dispatch(setQtyError(false));
  }

  const handleSubmitCoinToPortfolio = (e) => {
    e.preventDefault();
    const coinQtyCopy = coinQty;
    const re = new RegExp('^[-+]?[0-9]*[.,]?[0-9]+(?:[eE][-+]?[0-9]+)?$');
    const result = re.test(coinQtyCopy);
    const coinIdCopy = coinToAdd.id;
    const watchListCopy = JSON.parse(localStorage.getItem('watchList')) || [];

    if (result) {
      const sumCost = coinQtyCopy * coinToAdd.priceUsd.slice(0, 7);
      const watchCoin = watchListCopy.findIndex(
        (item) => item.id === coinIdCopy
      );
      if (watchCoin === -1) {
        const newCoin = {
          id: coinIdCopy,
          name: coinToAdd.name,
          qty: coinQtyCopy,
          totInvest: sumCost.toFixed(0),
        };
        watchListCopy.push(newCoin);
        localStorage.setItem('watchList', JSON.stringify(watchListCopy));
        dispatch(setWatchList(watchListCopy));
        dispatch(setAddCoin(false));
        dispatch(setQtyCoin(''));
        dispatch(setQtyError(false));
      } else {
        const changeCoin = watchListCopy.find((item) => item.id === coinIdCopy);

        const newCoin = {
          id: changeCoin.id,
          name: changeCoin.name,
          qty: +changeCoin.qty + +coinQtyCopy,
          totInvest: +changeCoin.totInvest + +sumCost.toFixed(0),
        };

        const watchListNew = watchListCopy.map((obj) => {
          if (obj.id === newCoin.id) {
            return newCoin;
          }
          return obj;
        });

        localStorage.setItem('watchList', JSON.stringify(watchListNew));
        dispatch(setWatchList(watchListNew));
        dispatch(setAddCoin(false));
        dispatch(setQtyCoin(''));
        dispatch(setQtyError(false));
      }
    } else {
      dispatch(setQtyError(true));
    }
  }

  const handleChangeCoinQty = (e) => {
    dispatch(setQtyCoin(e.target.value));
    dispatch(setQtyError(false));
  };
  
  return (
    <>
      <div className='popUpAdd__wraper'>
        <div className='popUpAdd__block slideDown'>
          <div className='popUpAdd__info'>
            <p className='popUpAdd__text'>Add coin to portfolio</p>

            <button
              className='popUpAdd__close-button'
              onClick={() => closeAddCoin()}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </div>

          <form className='popUpAdd__form' onSubmit={handleSubmitCoinToPortfolio}>
            <label className='popUpAdd__label' htmlFor='addCryptoInput'>
              Enter qty.
            </label>

            <input
              className='popUpAdd__input'
              name='addCryptoInput'
              type='text'
              value={coinQty}
              onChange={handleChangeCoinQty}
            />

            <input className='popUpAdd__submit' type='submit' value='Add' />
          </form>
          {coinQtyError && (
            <span className='popUpAdd__error'>
              Value must be number. Try again
            </span>
          )}
        </div>
      </div>

      <div className='popUpAdd__back'></div>
    </>
  );
}

export default AddCryptoPopUp;
