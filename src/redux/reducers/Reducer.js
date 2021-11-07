import { cryptoApi } from '../../api/CryptoApi.js'

const getTotalInvest = () =>{
  const watchListCopy = JSON.parse(localStorage.getItem('watchList'))
  console.log('ReduxStore-getTotalInvest-1')
  if (watchListCopy === null || watchListCopy.length === 0 ){
    console.log('ReduxStore-getTotalInvest-2')
    return 0
  }
  console.log('ReduxStore-getTotalInvest-3')
  const totalValue = watchListCopy.reduce((a, b) => ({totInvest: +a.totInvest + +b.totInvest}))
  return totalValue.totInvest
}

// const getInvestResult = async () =>{
//   try{
//     const watchListCopy = JSON.parse(localStorage.getItem('watchList'))
    
//     if (watchListCopy === null || watchListCopy.length === 0 ){
//       return 0
//     }
    
//     const investResult = watchListCopy.map(async (item) => {
//       let res = await cryptoApi.getCoinInfo(item.id)
//       if (res.status === 200){
//         const info = res.data.data
//         let totalCost = info.priceUsd * item.qty
//         return totalCost
//       }
//     })
//     console.log('Redux-store-investResult',investResult)
//     // return totalValue.totInvest
//   }catch(error){
//     console.log(error)
//   }
// }

const initialState = {
  headerCoins:[],
  watchList: JSON.parse(localStorage.getItem('watchList')) || [],
  totalInvest:getTotalInvest(),
  // InvestResult:getInvestResult(),
};

export const Reducer = (state = initialState, action) => {
  console.log('Reducer-initialState', initialState)
  const {payload} = action;
  switch(action.type){
    case 'SET_TOP_COINS':
      console.log('SET_TOP_COINS',action.payload)
      return {...state,headerCoins: payload}
      case 'SET_WATCH_LIST':
      console.log('SET_TOP_COINS',action.payload)
      return {...state,watchList: payload}
    default:
      return {...state}
  }
}

