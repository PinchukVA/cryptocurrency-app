// const localStorTopCoins = localStorage.getItem('Top Coins')

const initialState = {
  headerCoins:[],
  watchList:[]
};

export const Reducer = (state = initialState, action) => {
  console.log('Reducer-initialState', initialState)
  const {payload} = action;
  switch(action.type){
    case 'SET_TOP_COINS':
      console.log('SET_TOP_COINS',action.payload)
      return {...state,headerCoins: payload}
    default:
      return {...state}
  }
}