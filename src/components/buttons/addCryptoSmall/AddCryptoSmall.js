import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import './AddCryptoSmall.scss';

function AddCryptoSmall({ onClick }) {
  return (
    <button className='l-list__item__button' onClick={() => onClick()}>
      <FontAwesomeIcon icon={faPlusSquare} />
    </button>
  );
}

export default AddCryptoSmall;
