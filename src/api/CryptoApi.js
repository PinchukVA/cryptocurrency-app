import axios from 'axios'

export const cryptoApi = {

  getCoins:  async () =>{
    return   axios.get(`https://api.coincap.io/v2/assets`,{
      params: {
        limit: 15
      }
    })
  },

  getCoinInfo:  async (coin) =>{
    return   axios.get(`https://api.coincap.io/v2/assets/${coin}`)
  }
}