import axios from 'axios'

export const cryptoApi = {

  getCoins:  async (offset) =>{
    return   axios.get(`https://api.coincap.io/v2/assets`,{
      params: {
        limit: 10,
        offset:offset
      }
    })
  },

  getTopCoins:  async () =>{
    return   axios.get(`https://api.coincap.io/v2/assets`,{
      params: {
        limit: 3
      }
    })
  },

  getCoinInfo:  async (coin) =>{
    return   axios.get(`https://api.coincap.io/v2/assets/${coin}`)
  },
  
  getCoinChart:  async (coin, interval) =>{
    return   axios.get(`https://api.coincap.io/v2/assets/${coin}/history?interval=${interval}`)
  }
}