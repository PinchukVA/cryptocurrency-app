import React from 'react';

import './CoinChart.scss';

function CoinChart({ onClick }) {

  return (
    <div className='coinPage__interval__wraper'>
      <p>Change Interval </p>
      <button value='h1' onClick={onClick}>
        1 hour
      </button>
      <button value='h6' onClick={onClick}>
        6 hour
      </button>
      <button value='h12' onClick={onClick}>
        12 hours
      </button>
      <button value='d1' onClick={onClick}>
        1 day
      </button>
    </div>
  );
}

export default CoinChart;
