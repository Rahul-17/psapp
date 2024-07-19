import React, { useState } from 'react';
import Boxes from '../utility/Boxes';
import './voice.css';
import Suggestions from '../components/Suggestions/Suggestions';

const VoiceDetails = ({ analysisData,paceScore,repeatScore,fillerScore }) => {
  // const { repetitive,fillers,wpm,repeatCount } = analysisData;
  const [isWPMClicked, setWPMClicked] = useState(true);
  const [isFillersClicked, setFillersClicked] = useState(true);
  const [isRepeatsClicked, setRepeatsClicked] = useState(true); 
  const [isGrammarClicked, setGrammarClicked] = useState(true);
  const [boxClicked, setBoxClicked] = useState('');

  const isAnyBoxClicked = !isWPMClicked || !isFillersClicked || !isRepeatsClicked || !isGrammarClicked;

  return (
  <div className='voice-container'>
    <div className='voice-box-container'>
      <div onClick={() => {setBoxClicked('WPM')}}>
        <Boxes
          parameter={'Pace(WPM)'}
          // value={analysisData.wpm}
          value={paceScore}
          isClicked={isWPMClicked}
          setClicked={setWPMClicked}
          setOtherClicked={{
            setFillersClicked,
            setRepeatsClicked,
            setGrammarClicked,
          }}
        />
      </div>
      <div onClick={() => {setBoxClicked('Fillers')}}>
        <Boxes
          parameter={'Fillers'}
          // value={analysisData.fillers.length}
          value={fillerScore}
          isClicked={isFillersClicked}
          setClicked={setFillersClicked}
          setOtherClicked={{
            setWPMClicked,
            setRepeatsClicked,
            setGrammarClicked,
          }}
        />
      </div>
      <div onClick={() => {setBoxClicked('Repetition')}}>
        <Boxes
          parameter={'Repetition'}
          // value={analysisData.repetitive.length}
          value={repeatScore}
          isClicked={isRepeatsClicked}
          setClicked={setRepeatsClicked}
          setOtherClicked={{
            setWPMClicked,
            setFillersClicked,
            setGrammarClicked,
          }}
        />
      </div>
      <div onClick={() => {setBoxClicked('Grammar')}}>
        <Boxes
          parameter={'Grammar'}
          value={0}
          isClicked={isGrammarClicked}
          setClicked={setGrammarClicked}
          setOtherClicked={{
            setWPMClicked,
            setFillersClicked,
            setRepeatsClicked,
          }}
        />
      </div>   
    </div>
    {isAnyBoxClicked && <Suggestions boxClicked={boxClicked} analysisData={analysisData}/>}
  </div>
  );
};

export default VoiceDetails;