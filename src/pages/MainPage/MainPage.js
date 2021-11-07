import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './MainPage.scss';

import { 
  CryptoItem,
  CryptoListHeader,
  AddCryptoPopUp,
  UserPortfolioPopUp,
  Header
} from '../../components/index'

import Eclipse_1s_145px from '../../static/images/svg/Eclipse_1s_145px.svg'

import { cryptoApi } from '../../api/CryptoApi'

import { setTopCoins } from '../../redux/actions/Actions.js'

function MainPage () {
  const dispatch = useDispatch();

  const [isAddCoin, setIsAddCoin] = useState(false)
  const [coinsList, setCoinsList] = useState([])
  const [isRequest, setIsRequest] = useState(true)
  const [coinQty, setCoinQty] = useState()
  const [coinQtyError, setCoinQtyError] = useState('')
  const [isPortfolio, setIsPortfolio] = useState(false)

  const handleOpenPortfolio= () =>{
    setIsPortfolio(!isPortfolio)
  }

  const handleAddCoin = () =>{
    setIsAddCoin(!isAddCoin)
  }

  const closeAddCoin = () =>{
    setIsAddCoin(!isAddCoin)
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

    if (result){
      console.log('handleSubmitCoinToPortfolio - coinQtyCopy', coinQtyCopy)
    }else{
      console.log('handleSubmitCoinToPortfolio - no')
    }
    
  }

  const getTopCoins = async () =>{
    try{
      let res;
      res = await cryptoApi.getTopCoins()
      if (res.status === 200){
        
        const array = res.data.data
        console.log('getTopCoins-array', array)
        dispatch(setTopCoins(array));
        
      }
    }catch(error){
      getTopCoins()
      console.log(error)
    }
  }
    
  const getCoins = async () =>{
    try{
      let res;
      res = await cryptoApi.getCoins()
      if (res.status === 200){
        await getTopCoins()
        const array = res.data.data
        console.log('array', array)
        const coinsListNew = [...array]
        console.log('coinsListNew', coinsListNew)
        setCoinsList(coinsListNew)
        setIsRequest(false)
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
          onClick={() => handleAddCoin()}
        />
      ));
      return result;
    }
   return 
  }

  
  useEffect(  () => {
    console.log('useEffect-start')
    getCoins()
  }, []);

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
          onClick={closeAddCoin}/>}

        <ul className="catalogue__list">
        {renderCoins(coinsList)}    
        </ul>

    </section>
    </>
  )
}

export default MainPage;