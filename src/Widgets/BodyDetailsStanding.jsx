import React, { useState } from 'react';
import Boxes from '../utility/Boxes';
import './body.css';
import Suggestions from '../components/Suggestions/Suggestions';

const BodyDetailsStanding = ({analysisData}) => {
  const [isFoldingArmsClicked, setFoldingArmsClicked] = useState(true);
  const [isHandsInPocketClicked, setHandsInPocketClicked] = useState(true);
  const [isArmsOverheadClicked,setArmOverheadClicked] = useState(true);
  const [isHandsClaspedClicked,setHandsClaspedClicked] = useState(true);
  const [isRightPostureClicked,setRightPostureClicked] = useState(true);
  const [boxClicked, setBoxClicked] = useState('');

  const armsOverheadCount = analysisData.armsOverheadCount;
  const inPocketCount = analysisData.inPocketCount;
  const foldedArmsCount = analysisData.foldedArmCount;
  const claspCount = analysisData.claspCount;
  const rightCount = analysisData.rightPose;

  const total = armsOverheadCount + inPocketCount + foldedArmsCount + claspCount + rightCount;

  const armsOverheadPercentage = Math.round((armsOverheadCount / total) * 100);
  const inPocketsPercentage = Math.round((inPocketCount / total) * 100)
  const foldedArmsPercentage = Math.round((foldedArmsCount / total) * 100)
  const claspPercentage = Math.round((claspCount / total) * 100)
  const rightPercentage = Math.round((rightCount / total) * 100)

  const isAnyBoxClicked = !isFoldingArmsClicked || !isHandsInPocketClicked || !isArmsOverheadClicked || !isHandsClaspedClicked || !isRightPostureClicked

  return (
    <div className='body-container'>
    <div className='body-score-container'>
      <div onClick={() => setBoxClicked('Folding Arms')}>
        <Boxes
          parameter={'Folding Arms'}
          value={`${foldedArmsPercentage}%`}
          isClicked={isFoldingArmsClicked}
          setClicked={setFoldingArmsClicked}
          setOtherClicked={{ setHandsInPocketClicked, setArmOverheadClicked, setHandsClaspedClicked,setRightPostureClicked }}
        />
      </div>
      <div onClick={() => setBoxClicked('Hands in pocket')}>
        <Boxes
          parameter={'Hands in pocket'}
          value={`${inPocketsPercentage}%`}
          isClicked={isHandsInPocketClicked}
          setClicked={setHandsInPocketClicked}
          setOtherClicked={{ setFoldingArmsClicked, setArmOverheadClicked, setHandsClaspedClicked,setRightPostureClicked }}
        />
      </div>
      <div onClick={() => setBoxClicked('Arms Overhead')}>
        <Boxes
          parameter={'Arms Overhead'}
          value={`${armsOverheadPercentage}%`}
          isClicked={isArmsOverheadClicked}
          setClicked={setArmOverheadClicked}
          setOtherClicked={{ setFoldingArmsClicked, setHandsInPocketClicked, setHandsClaspedClicked,setRightPostureClicked }}
        />
      </div>
      <div onClick={() => setBoxClicked('Hands Clasped')}>
        <Boxes
          parameter={'Hands clasped'}
          value={`${claspPercentage}%`}
          isClicked={isHandsClaspedClicked}
          setClicked={setHandsClaspedClicked}
          setOtherClicked={{ setFoldingArmsClicked, setHandsInPocketClicked, setArmOverheadClicked,setRightPostureClicked}}
        />
      </div>
      <div onClick={() => setBoxClicked('Right Posture')}>
        <Boxes
          parameter={'Right Posture'}
          value={`${rightPercentage}%`}
          isClicked={isRightPostureClicked}
          setClicked={setRightPostureClicked}
          setOtherClicked={{ setHandsInPocketClicked, setArmOverheadClicked, setHandsClaspedClicked,setFoldingArmsClicked }}
        />
      </div>  
    </div>
    {isAnyBoxClicked && <Suggestions boxClicked={boxClicked} claspPercentage={claspPercentage} foldedPercentage={foldedArmsPercentage} inPocket={inPocketsPercentage} overHead={armsOverheadPercentage}/>}
    {/* <iframe
                width="560"
                height="315"
                src='https://www.youtube.com/embed/cFLjudWTuGQ'
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded YouTube Video"
            /> */}
    </div>
  );
};

export default BodyDetailsStanding;