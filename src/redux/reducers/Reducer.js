import { cryptoApi } from '../../api/CryptoApi.js'

const getTotalInvest = () =>{
  const watchListCopy = JSON.parse(localStorage.getItem('watchList'))
  if (watchListCopy === null || watchListCopy.length === 0 ){
    return 0
  }
  const totalValue = watchListCopy.reduce((a, b) => ({totInvest: +a.totInvest + +b.totInvest}))
  return totalValue.totInvest
}

const getInvestResult = async () =>{
  try{
    const watchListCopy = JSON.parse(localStorage.getItem('watchList'))
    
    if (watchListCopy === null || watchListCopy.length === 0 ){
      return 0
    }
    
    const investResult = watchListCopy.map((item) => {
      let res = `https://api.coincap.io/v2/assets/${item.id}`
      return res
      
    })
  }catch(error){
    console.log(error)
  }
}

const initialState = {
  headerCoins:[],
  watchList: JSON.parse(localStorage.getItem('watchList')) || [],
  totalInvest:getTotalInvest(),
  InvestResult:getInvestResult(),
};

export const Reducer = (state = initialState, action) => {
  console.log('Reducer-initialState', initialState)
  const {payload} = action;
  switch(action.type){
    case 'SET_TOP_COINS':
      return {...state,headerCoins: payload}
      case 'SET_WATCH_LIST':
      return {...state,watchList: payload}
    default:
      return {...state}
  }
}

