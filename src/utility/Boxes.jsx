
import React, { useState } from 'react';
import './boxes.css';

import Suggestions from '../components/Suggestions/Suggestions';

const Boxes = ({
  parameter,
  value,
  isClicked,
  setClicked,
  setOtherClicked,
}) => {
  const handleClick = () => {
    setClicked(!isClicked);
    Object.values(setOtherClicked).forEach((setter) => setter(true));
  };

  return (
    <div>
      <div className='parameter-container'>
        <div
          className={isClicked ? 'parameter' : 'parameter-clicked'}
          onClick={handleClick}
        >
          <div className={isClicked ? 'value-holder' : 'value-holder-clicked'}>
            <span>{value}</span>
          </div>
          <div className='label'>
            <span>{parameter}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boxes;