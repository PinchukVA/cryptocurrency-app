import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Pagination.scss';

function Pagination() {
  let navigate = useNavigate();
  const appState = useSelector((state) => state.Reducer);
  const { currentPage } = appState;

  const handleNextPage = (currentPage) => {
    const nextPage = +currentPage + 1;
    navigate(`/main/page/${nextPage}`);
  };

  const handlePrevPage = (currentPage) => {
    const nextPage = +currentPage - 1;
    navigate(`/main/page/${nextPage}`);
  };

  return (
    <>
      <div className='pagination'>
        {currentPage > 1 && (
          <button
            className='pagination__button'
            onClick={() => handlePrevPage(currentPage)}
          >
            <FontAwesomeIcon icon={faBackward} />
          </button>
        )}

        <span className='pagination__page'>{currentPage}</span>

        <button
          className='pagination__button'
          onClick={() => handleNextPage(currentPage)}
        >
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
    </>
  );
}

export default Pagination;
