import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import './AddCryptoSmall.scss';

function AddCryptoSmall () {
  return (
        <button className='l-list__item__button'>
           <FontAwesomeIcon icon={faPlusSquare} />
        </button>
  );
}

export default AddCryptoSmall;