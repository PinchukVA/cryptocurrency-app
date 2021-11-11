import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import './Coin.scss';
import Eclipse_1s_145px from '../../static/images/svg/Eclipse_1s_145px.svg';

import { cryptoApi } from '../../api/CryptoApi';

import {
  LineChart,
  AddCryptoPopUp,
  UserPortfolioPopUp,
  Header,
  CoinInfoBlock,
  CoinChart,
} from '../../components/index';

import { setAddCoin, setCoinToAdd } from '../../redux/actions/Actions.js';

function Coin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.Reducer);
  const { isAddCoin, isPortfolio } = appState;
  const { id } = useParams();

  const [coinsInfo, setCoinInfo] = useState();
  const [isRequest, setIsRequest] = useState(true);
  const [isChartAdd, setIsChartAdd] = useState(true);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartValues, setChartValues] = useState([]);

  const getCoinInfo = async () => {
    try {
      let res = await cryptoApi.getCoinInfo(id);
      if (res.status === 200) {
        const info = res.data.data;
        await getChartData();
        setCoinInfo(info);
        setIsRequest(false);
      }
    } catch (error) {
      getCoinInfo();
    }
  };

  const getChartData = async (interval = 'd1') => {
    try {
      let chart = await cryptoApi.getCoinChart(id, interval);

      if (chart.status === 200) {
        const ChartData = chart.data.data;

        const newChartLabels = ChartData.map((item) => {
          return item.date.slice(5, 16).replace('T', ' ').replace('-', '.');
        });

        const newChartValues = ChartData.map((item) => {
          return item.priceUsd;
        });

        setChartLabels(newChartLabels);
        setChartValues(newChartValues);
        setIsChartAdd(false);
      }
    } catch (error) {
      getChartData();
    }
  };

  const handleChangeInterval = (e) => {
    getChartData(e.target.value);
  };

  const handleOpenAddCoin = (item) => {
    dispatch(setAddCoin(true));
    dispatch(setCoinToAdd(item));
  };

  useEffect(() => {
    getCoinInfo();
  }, []);

  return (
    <>
      <Header />
      {isPortfolio && <UserPortfolioPopUp />}

      {isAddCoin && <AddCryptoPopUp />}
      <section className='coinPage'>
        {isRequest && (
          <img className='coinPage__loader' src={Eclipse_1s_145px} />
        )}

        {!isRequest && (
          <div className='coinPage__main'>
            <div className='coinPage__header'>
              <button
                className='coinPage__button'
                data-title='Return'
                onClick={() => navigate(-1)}
              >
                <FontAwesomeIcon icon={faArrowCircleLeft} />
              </button>
              <a href={coinsInfo.explorer} className='coinPage__link'>
                {coinsInfo.name}
              </a>
              <h4>{coinsInfo.symbol}</h4>
              <button
                className='coinPage__button'
                data-title='Add to portfolio'
                onClick={() => handleOpenAddCoin(coinsInfo)}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </button>
            </div>

            <CoinInfoBlock item={coinsInfo} />

            {isChartAdd ? (
              <img className='coinPage__loader' src={Eclipse_1s_145px} />
            ) : (
              <div className='coinPage__graph'>
                <CoinChart onClick={handleChangeInterval} />

                <LineChart
                  chartLabels={chartLabels}
                  chartValues={chartValues}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}

export default Coin;
