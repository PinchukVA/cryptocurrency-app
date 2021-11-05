import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import './AddCryptoPopUp.scss';

function AddCryptoPopUp () {
  return (
   <>
    <div className='popUpAdd__wraper'>

      <div className='popUpAdd__block slideDown'>
        
        <div className='popUpAdd__info'>

          <p className='popUpAdd__text' >Add coin:</p>

          <button className='popUpAdd__close-button'>
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>

        </div>
        
        
        <form className='popUpAdd__form'>
          <label 
            className='popUpAdd__label'
            htmlFor='addCryptoInput'
          >
            Enter qty.
          </label>

          <input
            className='popUpAdd__input'
            name='addCryptoInput'
            type='text'
          />

          <input 
            className='popUpAdd__submit' 
            type='submit'
            value = 'Add'
          />
        </form>

      </div>

    </div>

    <div  className='popUpAdd__back'></div>
   </>
  );
}

export default AddCryptoPopUp;