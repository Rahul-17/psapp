import React, { useState } from 'react';
import Boxes from '../utility/Boxes';
import './face.css';
import Suggestions from '../components/Suggestions/Suggestions';

const FaceDetails = ({analysisData}) => {
  const [isLookingForwardClicked, setLookingForwardClicked] = useState(true);
  const [isLookingRightClicked, setLookingRightClicked] = useState(true);
  const [isLookingLeftClicked, setLookingLeftClicked] = useState(true);
  const [boxClicked,setBoxClicked] = useState('');

  const leftCount = analysisData.left;
  const rightCount = analysisData.right;
  const forwardCount = analysisData.forward;

  const total = leftCount + rightCount + forwardCount;

  const leftPercentage = Math.round((leftCount / total) * 100)
  const rightPercentage = Math.round((rightCount / total) * 100)
  const forwardPercentage = Math.round((forwardCount / total) * 100)

  const isAnyBoxClicked = !isLookingForwardClicked || !isLookingLeftClicked || !isLookingRightClicked

  return (
  <div className='face-container'>
    <div className='face-score-container'>
      <div onClick={() => setBoxClicked('Forward')}>
        <Boxes
          parameter={'Forward'}
          value={`${forwardPercentage}%`}
          isClicked={isLookingForwardClicked}
          setClicked={setLookingForwardClicked}
          setOtherClicked={{
            setLookingRightClicked,
            setLookingLeftClicked,
          }}
        />
      </div>
      <div onClick={() => setBoxClicked('Left')}>
        <Boxes
          parameter={'Left'}
          value={`${leftPercentage}%`}
          isClicked={isLookingLeftClicked}
          setClicked={setLookingLeftClicked}
          setOtherClicked={{
            setLookingRightClicked,
            setLookingForwardClicked,
          }}
        />
      </div>
      <div onClick={() => setBoxClicked('Right')}>
        <Boxes
          parameter={'Right'}
          value={`${rightPercentage}%`}
          isClicked={isLookingRightClicked}
          setClicked={setLookingRightClicked}
          setOtherClicked={{
            setLookingForwardClicked,
            setLookingLeftClicked,
          }}
        />
      </div>     
    </div>
    {isAnyBoxClicked && <Suggestions boxClicked={boxClicked} analysisData={analysisData}/>}
  </div>
  );
};

export default FaceDetails;