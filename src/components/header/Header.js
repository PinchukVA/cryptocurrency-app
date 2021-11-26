import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import './Header.scss';

import {
  setShowPortfolio,
  setTopCoins,
  setInvestDifferent,
  setInvestDifferentPercent,
} from '../../redux/actions/Actions';
import { cryptoApi } from '../../api/CryptoApi';

function Header() {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.Reducer);
  const {
    headerCoins,
    watchList,
    totalInvest,
    isPortfolio,
    InvestDifferent,
    InvestDifferentPersent,
  } = appState;

  const singleRequest = async (id) => {
    try {
      let respons = cryptoApi.getCoinInfo(id);
      let result = await respons;
      const { data } = result.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getInvestResult = () => {
    try {
      const watchListCopy = JSON.parse(localStorage.getItem('watchList'));

      if (watchListCopy === null || watchListCopy.length === 0) {
        return 0;
      }
      let totalInvestCopy = totalInvest;
      let investResult = watchListCopy.map(async (item) => {
        let result = singleRequest(item.id);
        let newCoin = await result;
        while (newCoin === undefined) {
          result = singleRequest(item.id);
          newCoin = await result;
        }
        return newCoin.priceUsd.slice(0, 7) * item.qty;
      });
      return Promise.all(investResult)
        .then((values) => {
          let result = values.reduce((sum, item) => sum + item, 0);
          return result;
        })
        .then((result) => {
          let difference = (totalInvestCopy - result).toFixed(2);
          let percentageDiff = ((difference / totalInvestCopy) * 100).toFixed(
            2
          );
          dispatch(setInvestDifferent(difference));
          dispatch(setInvestDifferentPercent(percentageDiff));
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getTopCoins = async () => {
    try {
      let res;
      res = await cryptoApi.getTopCoins();
      if (res.status === 200) {
        const array = res.data.data;
        dispatch(setTopCoins(array));
      }
    } catch (error) {
      getTopCoins();
      console.log(error);
    }
  };

  useEffect(() => {
    getTopCoins();
    getInvestResult();
    console.log('useEffect-header')
  }, [watchList]);

  const renderTopCoins = (arr) => {
    let result;

    result = arr.map((item) => (
      <li className='header__item' key={item.id}>
        {item.name} : <span>{item.priceUsd.slice(0, 7)} USD</span>
      </li>
    ));
    return result;
  };

  return (
    <header className='header'>
      <div className='header__info'>
        <ul className='header__list'>{renderTopCoins(headerCoins)}</ul>

        <ul className='header__portfolio-list'>
          <li className='header__portfolio-item'>
            {totalInvest <= 0
              ? 'Portfolio empty'
              : ` Portf. Vol :  ${totalInvest} USD`}
          </li>
          <li className='header__portfolio-item'>
            {totalInvest <= 0
              ? ''
              : ` ${InvestDifferent} USD (${InvestDifferentPersent}%)`}
          </li>
        </ul>
      </div>

      <button
        className='header__button'
        onClick={() => dispatch(setShowPortfolio(!isPortfolio))}
      >
        <FontAwesomeIcon icon={faUserAlt} />
      </button>
    </header>
  );
}

export default Header;
