import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import './AddCryptoPopUp.scss';

function AddCryptoPopUp ({onClick,value,onChange,onSubmit,errorMesage}) {
  return (
   <>
    <div className='popUpAdd__wraper'>

      <div className='popUpAdd__block slideDown'>
        
        <div className='popUpAdd__info'>

          <p className='popUpAdd__text' >Add coin to portfolio</p>

          <button className='popUpAdd__close-button' onClick ={onClick}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>

        </div>
        
        
        <form className='popUpAdd__form' onSubmit={onSubmit}>
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
            value={value}
            onChange={onChange}
          />

          <input 
            className='popUpAdd__submit' 
            type='submit'
            value = 'Add'
          />
        </form>
        {errorMesage && <span className='popUpAdd__error'> Value must be number. Try again</span>}
      </div>

    </div>

    <div  className='popUpAdd__back'></div>
   </>
  );
}

export default AddCryptoPopUp;