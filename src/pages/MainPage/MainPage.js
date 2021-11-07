import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate} from 'react-router-dom'

import './MainPage.scss';

import { 
  CryptoItem,
  CryptoListHeader,
  AddCryptoPopUp,
  UserPortfolioPopUp,
  Header,
  Pagination
} from '../../components/index'

import Eclipse_1s_145px from '../../static/images/svg/Eclipse_1s_145px.svg'

import { cryptoApi } from '../../api/CryptoApi'

import { setTopCoins, setWatchList } from '../../redux/actions/Actions.js'

function MainPage () {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const  { PageNumber }  = useParams();
  

  const CurrentOffset = PageNumber == 1 ? 0 : (PageNumber*10) -10
  
  // const [offsetRequest, setOffsetRequest] = useState(CurrentOffset)
  const [isAddCoin, setIsAddCoin] = useState(false)
  const [coinsList, setCoinsList] = useState([])
  const [isRequest, setIsRequest] = useState(true)
  const [coinQty, setCoinQty] = useState()
  const [coinQtyError, setCoinQtyError] = useState(false)
  const [idCoinToAdd, setIdCoinToAdd] = useState('')
  const [isPortfolio, setIsPortfolio] = useState(false)
  const [currentPage, setCurrentPage] = useState(PageNumber)

  const handleNextPage = () =>{
    
    const nextPage = +PageNumber+1
    navigate(`/main/page/${nextPage}`)
    setCurrentPage(nextPage)
  }

  const handlePrevPage = () =>{
    
    const nextPage = +PageNumber-1
    navigate(`/main/page/${nextPage}`)
    setCurrentPage(nextPage)
  }
  

  const handleOpenPortfolio= () =>{
    setIsPortfolio(!isPortfolio)
  }

  const handleAddCoin = (id) =>{
    setIsAddCoin(!isAddCoin)
    setIdCoinToAdd(id)
  }

  const closeAddCoin = () =>{
    setIsAddCoin(!isAddCoin)
    setCoinQtyError(false)
    setCoinQty('')
  }

  const handleChangeCoinQty = (e) =>{
    setCoinQty(e.target.value)
    setCoinQtyError(false)
  }

  const handleSubmitCoinToPortfolio = (e) =>{
    e.preventDefault();
    const coinQtyCopy = coinQty;
    const re = new RegExp('^[-+]?[0-9]*[.,]?[0-9]+(?:[eE][-+]?[0-9]+)?$');
    const result = re.test(coinQtyCopy);
    const coinIdCopy = idCoinToAdd;
    const coinsListCopy = JSON.parse(JSON.stringify(coinsList))
    const watchListCopy = JSON.parse(localStorage.getItem('watchList')) || []

    if (result){
      const coin = coinsListCopy.find(item => item.id === coinIdCopy);
      const sumCost = coinQtyCopy * coin.priceUsd
      const watchCoin = watchListCopy.findIndex(item => item.id === coinIdCopy);
      if ( watchCoin === -1) {
        const newCoin = {
          id: coin.id,
          name: coin.name,
          qty:coinQtyCopy,
          totInvest: sumCost.toFixed(0)
        }
        watchListCopy.push(newCoin)
        localStorage.setItem('watchList', JSON.stringify(watchListCopy))
        dispatch(setWatchList(watchListCopy));
        closeAddCoin()
      }else{
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
    
  const getCoins = async () =>{
    try{
      const offsetRequestCopy = CurrentOffset
      let res;
      res = await cryptoApi.getCoins(offsetRequestCopy)
      if (res.status === 200){
        await getTopCoins()
        const array = res.data.data
        const coinsListNew = [...array]
        setCoinsList(coinsListNew)
        setIsRequest(false)
        window.scrollTo(0,0)
      }
    }catch(error){
      getCoins()
      console.log(error)
    }
  }

  const renderCoins = (arr) => {
    if (!isRequest){
      let result;

      result = arr.map((item,index) => (
        < CryptoItem
          key={item.id}
          item={item}
          taskId = {index+1}
          onClick={() => handleAddCoin(item.id)}
        />
      ));
      return result;
    }
   return 
  }

  
  useEffect(  () => {
    getCoins()
  }, [currentPage]);
  console.log('Start Main Page - check currentPage ', currentPage)
  console.log('Start Main Page - check PageNumber ', PageNumber)
  
  return (
    <>
    <Header onClick={handleOpenPortfolio}/>
    {isPortfolio && <UserPortfolioPopUp onClick={handleOpenPortfolio}/>}
    <section className="catalogue">

        <CryptoListHeader/>

        {isRequest &&<img src={Eclipse_1s_145px}/>}

        {isAddCoin && <AddCryptoPopUp 
          onSubmit={handleSubmitCoinToPortfolio} 
          onChange={handleChangeCoinQty} 
          value={coinQty} 
          errorMesage={coinQtyError}
          onClick={closeAddCoin}/>}

        <ul className="catalogue__list">
        {renderCoins(coinsList)}    
        </ul>

        <Pagination
          pageNumber ={currentPage}
          clickNext={()=>handleNextPage()}
          clickPrev={()=>handlePrevPage()}
        />

    </section>
    </>
  )
}

export default MainPage;