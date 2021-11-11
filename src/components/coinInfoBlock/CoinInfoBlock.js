import React from 'react';

import './CoinInfoBlock.scss';

function CoinInfoBlock({ item }) {
  const changeDataView = (str) => {
    return Number(str)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <div className='coinPage__info'>
      <span>
        <p>Rank #</p> {item.rank}
      </span>
      <span>
        <p>Market Cap:</p>$ {changeDataView(item.marketCapUsd)}
      </span>
      <span>
        <p>Price:</p> $ {item.priceUsd.slice(0, 7)}
      </span>
      <span>
        <p>Volume 24h:</p>$ {changeDataView(item.volumeUsd24Hr)}
      </span>
      <span>
        <p>Change 24h:</p> {item.changePercent24Hr.slice(0, 5)} %
      </span>
      <span>
        <p>Circulating Supply:</p> {changeDataView(item.supply)}
      </span>
      <span>
        <p>Average Price 24h:</p>
        {item.vwap24Hr}
      </span>
      <span>
        <p>Max Supply:</p>
        {item.maxSupply === null ? '--' : changeDataView(item.maxSupply)}
      </span>
    </div>
  );
}

export default CoinInfoBlock;
