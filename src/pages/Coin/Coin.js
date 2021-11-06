import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import './Coin.scss';
import Eclipse_1s_145px from '../../static/images/svg/Eclipse_1s_145px.svg'

import { cryptoApi } from '../../api/CryptoApi'

function Coin () {

  const { id } = useParams();

  const [coinsInfo, setCoinInfo] = useState()
  const [isRequest, setIsRequest] = useState(true)

  const getCoinInfo = async () =>{
    try{
      let res;
      res = await cryptoApi.getCoinInfo(id)
      if (res.status === 200){
        const info = res.data.data
        console.log('Coin page - info', info)
        setCoinInfo(info)
        setIsRequest(false)
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(  () => {
    console.log('useEffect-start')
    getCoinInfo()
  }, []);

  return (
     <section className="coinPage">

      {isRequest &&<img className="coinPage__loader" src={Eclipse_1s_145px}/>}

      {!isRequest &&

      <div  className="coinPage__main">
        
        <div  className="coinPage__header">
          <a href={coinsInfo.explorer} className="coinPage__link">{coinsInfo.name}</a>
         <h4>{coinsInfo.symbol}</h4>
         <button>Click me</button>
        </div>

        <div  className="coinPage__info">
          <span><p>Rank #</p> {coinsInfo.rank}</span>
          <span><p>Price:</p> {coinsInfo.priceUsd}</span>
          <span><p>Change 24h:</p> {coinsInfo.changePercent24Hr}</span>
          <span><p>Volume 24h:</p>{coinsInfo.volumeUsd24Hr}</span>
          <span><p>Market Cap:</p>{coinsInfo.marketCapUsd}</span>
          <span><p>Average Price 24h:</p>{coinsInfo.vwap24Hr}</span>
          <span><p>Circulating Supply:</p> {coinsInfo.supply}</span>
          <span><p>Max Supply:</p>{coinsInfo.maxSupply}</span>
        </div>

        <div  className="coinPage__graph">
          
        </div>

      </div>}

    </section>
  )
}

export default Coin;