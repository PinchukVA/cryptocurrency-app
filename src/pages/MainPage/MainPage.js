import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import './MainPage.scss';

import {
  CryptoItem,
  CryptoListHeader,
  AddCryptoPopUp,
  UserPortfolioPopUp,
  Header,
  Pagination,
} from '../../components/index';

import Eclipse_1s_145px from '../../static/images/svg/Eclipse_1s_145px.svg';

import { cryptoApi } from '../../api/CryptoApi';

import {
  setPage,
} from '../../redux/actions/Actions.js';

function MainPage() {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.Reducer);
  const { isAddCoin, isPortfolio } = appState;
  const { PageNumber } = useParams();
  const CurrentOffset = PageNumber == 1 ? 0 : PageNumber * 10 - 10;

  const [renderList, setRenderList] = useState([]);
  const [isRequest, setIsRequest] = useState(true);

  const getCoins = async () => {
    try {
      const offsetRequestCopy = CurrentOffset;
      let res;
      res = await cryptoApi.getCoins(offsetRequestCopy);
      if (res.status === 200) {
        const array = res.data.data;
        const coinsListNew = [...array];
        setRenderList(coinsListNew);
        setIsRequest(false);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      getCoins();
      console.log(error);
    }
  };

  const renderCoins = (arr) => {
    if (!isRequest) {
      let result;

      result = arr.map((item, index) => (
        <CryptoItem key={item.id} item={item} taskId={index + 1} />
      ));
      return result;
    }
    return;
  };

  useEffect(() => {
    dispatch(setPage(PageNumber));
    getCoins();
  }, [PageNumber]);

  return (
    <>
      <Header />
      {isPortfolio && <UserPortfolioPopUp />}
      <section className='catalogue'>
        <CryptoListHeader />

        {isRequest && <img src={Eclipse_1s_145px} />}

        {isAddCoin && <AddCryptoPopUp />}

        <ul className='catalogue__list'>
          {!isRequest && renderCoins(renderList)}
        </ul>

        <Pagination />
      </section>
    </>
  );
}

export default MainPage;