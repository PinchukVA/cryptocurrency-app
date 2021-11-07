const getTotalInvest = () =>{
  const watchListCopy = JSON.parse(localStorage.getItem('watchList'))
  if (watchListCopy === null ){
    return 0
  }
  const totalValue = watchListCopy.reduce((a, b) => ({totInvest: +a.totInvest + +b.totInvest}))
  return totalValue
}

const initialState = {
  headerCoins:[],
  watchList: JSON.parse(localStorage.getItem('watchList')) || [],
  totalInvest:getTotalInvest()
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

