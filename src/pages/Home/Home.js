import React, {useEffect} from 'react';
import { useNavigate  } from 'react-router-dom';

import './Home.scss';

import { Routs, linkToRoute } from '../../utils/routes'

function Home () {

  const navigate = useNavigate ();

  useEffect (() => {
      linkToRoute(navigate, Routs.MainRoute)
  },[])

  return (
    <>
    </>
  )
}

export default Home;