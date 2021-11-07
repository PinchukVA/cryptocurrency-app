import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import './Pagination.scss';



function Pagination ({pageNumber,clickPrev,clickNext}) {
  return (
    <>
    <div className ='pagination'>
      
      {pageNumber !==1 &&<button className ='pagination__button' onClick ={clickPrev}> <FontAwesomeIcon icon={faBackward} /></button>
      }

      <span className ='pagination__page'>{pageNumber}</span>

      <button className ='pagination__button' onClick ={clickNext} ><FontAwesomeIcon icon={faForward} /></button>
      
    </div>
    </>
  );
}

export default Pagination;