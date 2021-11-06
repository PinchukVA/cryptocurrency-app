import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import './MainPage.scss';

import { 
  CryptoItem,
  CryptoListHeader,
  AddCryptoPopUp,
  UserPortfolioPopUp
} from '../../components/index'

import Eclipse_1s_145px from '../../static/images/svg/Eclipse_1s_145px.svg'

import { cryptoApi } from '../../api/CryptoApi'

function MainPage () {
  
  const [isAddCoin, setIsAddCoin] = useState(false)
  const [coinsList, setCoinsList] = useState([])
  const [isRequest, setIsRequest] = useState(true)
  
  const handleAddCoin = (id) =>{
    setIsAddCoin(!isAddCoin)
  }

  const getCoins = async () =>{
    try{
      let res;
      res = await cryptoApi.getCoins()
      if (res.status === 200){
        const array = Object.values(res.data.data)
        console.log('array', array)
        const coinsListCopy = [...coinsList]
        const coinsListNew = [...coinsListCopy, ...array]
        console.log('coinsListNew', coinsListNew)
        setCoinsList(coinsListNew)
        setIsRequest(false)
        // if (res.data.length !== 0){
        //   setTasksList(tasksListNew)
        //   setPage(prevPage => prevPage + 1)
        // }
        // setIsRequest(false)
      }
    }catch(error){
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
          // handleClick={() => handleOpenEditTask(item._id,item.name)}
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
    <section className="catalogue">

        <CryptoListHeader/>

        {isRequest &&<img src={Eclipse_1s_145px}/>}
        {isAddCoin && <AddCryptoPopUp/>}

        <ul className="catalogue__list">
        {renderCoins(coinsList)}    
        </ul>

    </section>
  )
}

export default MainPage;