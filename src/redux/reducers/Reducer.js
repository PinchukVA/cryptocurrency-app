// import { cryptoApi } from '../../api/CryptoApi.js';

const getTotalInvest = () => {
  const watchListCopy = JSON.parse(localStorage.getItem('watchList'));
  if (watchListCopy === null || watchListCopy.length === 0) {
    return 0;
  }
  const totalValue = watchListCopy.reduce((a, b) => ({
    totInvest: +a.totInvest + +b.totInvest,
  }));
  return totalValue.totInvest;
};

const initialState = {
  headerCoins: [],
  watchList: JSON.parse(localStorage.getItem('watchList')) || [],
  coinToAdd: {},
  totalInvest: getTotalInvest(),
  InvestDifferent: '',
  InvestDifferentPersent: '',
  isAddCoin: false,
  isPortfolio: false,
  coinQtyError: false,
  coinQty: '',
  currentPage: 1,
};

export const Reducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'SET_TOP_COINS':
      return { ...state, headerCoins: payload };
    case 'SET_WATCH_LIST':
      return { ...state, watchList: payload };
    case 'SET_ADD_COIN':
      return { ...state, isAddCoin: payload };
    case 'SET_SHOW_PORTFOLIO':
      return { ...state, isPortfolio: payload };
    case 'SET_QTY_COIN':
      return { ...state, coinQty: payload };
    case 'SET_QTY_ERROR':
      return { ...state, coinQtyError: payload };
    case 'SET_PAGE':
      return { ...state, currentPage: payload };
    case 'SET_COIN_TO_ADD':
      return { ...state, coinToAdd: payload };
    case 'SET_INVEST_DIFF':
      return { ...state, InvestDifferent: payload };
    case 'SET_INVEST_DIFF_PERCENT':
      return { ...state, InvestDifferentPersent: payload };
    default:
      return { ...state };
  }
};
