import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './DeleteCryptoSmall.scss';

function DeleteCryptoSmall({ onClick }) {
  return (
    <button className='p-list__item__button' onClick={onClick}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}

export default DeleteCryptoSmall;
