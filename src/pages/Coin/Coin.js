import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import './Coin.scss';
import Eclipse_1s_145px from '../../static/images/svg/Eclipse_1s_145px.svg'

import { cryptoApi } from '../../api/CryptoApi'

import { 
  LineChart,
  AddCryptoPopUp,
  UserPortfolioPopUp,
  Header
} from '../../components/index'

import { setTopCoins, setWatchList } from '../../redux/actions/Actions.js'

function Coin () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [coinsInfo, setCoinInfo] = useState()
  const [isRequest, setIsRequest] = useState(true)
  const [isChartAdd, setIsChartAdd] = useState(true)
  const [chartLabels, setChartLabels] = useState([])
  const [chartValues, setChartValues] = useState([])
  const [isAddCoin, setIsAddCoin] = useState(false)
  const [isPortfolio, setIsPortfolio] = useState(false)
  const [coinQty, setCoinQty] = useState()
  const [coinQtyError, setCoinQtyError] = useState('')

  const handleOpenPortfolio= () =>{
    setIsPortfolio(!isPortfolio)
  }

  const getTopCoins = async () =>{
    try{
      let res;
      res = await cryptoApi.getTopCoins()
      if (res.status === 200){
        
        const array = res.data.data
        dispatch(setTopCoins(array));
        
      }
    }catch(error){
      getTopCoins()
      console.log(error)
    }
  }

  const closeAddCoin = () =>{
    setIsAddCoin(!isAddCoin)
    setCoinQtyError(false)
    setCoinQty('')
  }

  const getCoinInfo = async () =>{
    try{
      let res = await cryptoApi.getCoinInfo(id)
      if (res.status === 200){
        const info = res.data.data
        await getChartData()
        await getTopCoins()
        setIsChartAdd(false)
        setCoinInfo(info)
        setIsRequest(false)
      }
    }catch(error){
      getCoinInfo()
    }
  }
  
  const getChartData = async (interval='d1') =>{
    try{

        let chart = await cryptoApi.getCoinChart(id,interval)
        
        if (chart.status === 200){
          const ChartData = chart.data.data

          const newChartLabels = ChartData.map((item)=>{
            return item.date.slice(5,16).replace('T',' ').replace('-','.')
          })

          const newChartValues = ChartData.map((item)=>{
            return item.priceUsd
          })
          
          setChartLabels(newChartLabels)
          setChartValues(newChartValues)
          setIsChartAdd(false)
        }
    }catch(error){
      getChartData()
    }
  }
  const changeDataView = (str) =>{
    return Number(str).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const handleChangeCoinQty = (e) =>{
    setCoinQty(e.target.value)
    setCoinQtyError('')
  }

  const handleSubmitCoinToPortfolio = (e) =>{
    e.preventDefault();
    const coinQtyCopy = coinQty;
    const re = new RegExp('^[-+]?[0-9]*[.,]?[0-9]+(?:[eE][-+]?[0-9]+)?$');
    const result = re.test(coinQtyCopy);
    const coinIdCopy = id;
    const coinCopy = coinsInfo
    const watchListCopy = JSON.parse(localStorage.getItem('watchList')) || []

    if (result){
      
      const sumCost = coinQtyCopy * coinCopy.priceUsd
     
      const watchCoin = watchListCopy.findIndex(item => item.id === coinIdCopy);
      
      if ( watchCoin === -1) {
        const newCoin = {
          id: coinCopy.id,
          name: coinCopy.name,
          qty:coinQtyCopy,
          totInvest: sumCost.toFixed(0)
        }
        watchListCopy.push(newCoin)
        localStorage.setItem('watchList', JSON.stringify(watchListCopy))
        dispatch(setWatchList(watchListCopy));
        closeAddCoin()
      } else{

        const changeCoin = watchListCopy.find(item => item.id === coinIdCopy);

        const newCoin = {
          id: changeCoin.id,
          name: changeCoin.name,
          qty:+changeCoin.qty+ +coinQtyCopy,
          totInvest: +changeCoin.totInvest+ +sumCost.toFixed(0)
        }

        const watchListNew = watchListCopy.map(obj => {
          if (obj.id === newCoin.id) {
            return newCoin;
          }
          return obj;
        });

        localStorage.setItem('watchList', JSON.stringify(watchListNew))
        dispatch(setWatchList(watchListNew));
        closeAddCoin()
      }
    }else{
      setCoinQtyError(true)
    }
    
  }

  const handleChangeInterval = (e) =>{
    getChartData(e.target.value)
  }

  const handleAddCoin = () =>{
    setIsAddCoin(!isAddCoin)
  }

  useEffect(  () => {
    getCoinInfo()
  }, []);


  return (
    <>
    <Header onClick={handleOpenPortfolio}/>
    {isPortfolio && <UserPortfolioPopUp onClick={handleOpenPortfolio}/>}

    {isAddCoin && <AddCryptoPopUp 
          onSubmit={handleSubmitCoinToPortfolio} 
          onChange={handleChangeCoinQty} 
          value={coinQty} 
          errorMesage={coinQtyError}
          onClick={handleAddCoin}/>}
     <section className='coinPage'>

      {isRequest &&<img className='coinPage__loader' src={Eclipse_1s_145px}/>}

      {!isRequest &&

      <div  className='coinPage__main'>
        
        <div  className='coinPage__header'>

          <button className='coinPage__button' data-title='Return' onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowCircleLeft} /></button>
          <a href={coinsInfo.explorer} className='coinPage__link'>{coinsInfo.name}</a>
          <h4>{coinsInfo.symbol}</h4>
          <button className='coinPage__button' data-title='Add to portfolio' onClick ={handleAddCoin}><FontAwesomeIcon icon={faPlusCircle} /></button>

        </div>

        <div  className='coinPage__info'>

          <span><p>Rank #</p> {coinsInfo.rank}</span>
          <span>
            <p>Market Cap:</p>$ {changeDataView(coinsInfo.marketCapUsd)}
          </span>
          <span><p>Price:</p> $ {coinsInfo.priceUsd.slice(0,7)}</span>
          <span>
            <p>Volume 24h:</p>$ {changeDataView(coinsInfo.volumeUsd24Hr)} 
          </span>
          <span><p>Change 24h:</p> {coinsInfo.changePercent24Hr.slice(0,5)} %</span>
          <span>
            <p>Circulating Supply:</p> { changeDataView(coinsInfo.supply) }
          </span>
          <span><p>Average Price 24h:</p>{coinsInfo.vwap24Hr}</span>
          <span>
            <p>Max Supply:</p>{coinsInfo.maxSupply === null ? '--' :  changeDataView(coinsInfo.maxSupply)  }
          </span>

        </div>
        {isChartAdd ? <img className='coinPage__loader' src={Eclipse_1s_145px}/> : 
        <div  className='coinPage__graph'>

          <div  className='coinPage__interval__wraper'>
            <p>Change Interval </p>
            <button value='h1' onClick={handleChangeInterval}>1 hour</button>
            <button value='h6' onClick={handleChangeInterval}>6 hour</button>
            <button value='h12' onClick={handleChangeInterval}>12 hours</button>
            <button value='d1' onClick={handleChangeInterval}>1 day</button>
          </div>

        <LineChart
          chartLabels = {chartLabels}
          chartValues = {chartValues}
        />

        </div>
      }

      </div>}

    </section>
  </>  
  )
}

export default Coin;