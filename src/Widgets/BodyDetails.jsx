import React, { useState } from 'react';
import Boxes from '../utility/Boxes';
import './body.css';
import Suggestions from '../components/Suggestions/Suggestions';

const BodyDetails = ({analysisData}) => {
  const [isCenteredClicked, setCenteredClicked] = useState(true);
  const [isNotCenteredClicked, setNotCenteredClicked] = useState(true);
  const [boxClicked, setBoxClicked] = useState('');

  const isAnyBoxClicked = !isCenteredClicked || !isNotCenteredClicked;
  const centeredCount = analysisData.centeredCount;
  const notCenteredCount = analysisData.notCentered;
  const total = centeredCount + notCenteredCount;
  const centerPercentage = Math.round((centeredCount / total ) * 100);
  const notCenterPercentage = Math.round((notCenteredCount / total) * 100);

  return (
    <div className='body-container'>
    <div className='body-score-container'>
      <div onClick={() => setBoxClicked('Centered')}>
        <Boxes
          parameter={'Centered'}
          value={`${centerPercentage}%`}
          isClicked={isCenteredClicked}
          setClicked={setCenteredClicked}
          setOtherClicked={{ setNotCenteredClicked }}
        />
      </div>
      <div onClick={() => setBoxClicked('Not Centered')}>
        <Boxes
          parameter={'Not Centered'}
          value={`${notCenterPercentage}%`}
          isClicked={isNotCenteredClicked}
          setClicked={setNotCenteredClicked}
          setOtherClicked={{ setCenteredClicked }}
        />
      </div>
      
    </div>
    {isAnyBoxClicked && <Suggestions boxClicked={boxClicked} center={centerPercentage} notcenter={notCenterPercentage}/>}
    </div>
  );
};

export default BodyDetails;