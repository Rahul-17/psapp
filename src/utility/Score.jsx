import React,{useState,useEffect} from 'react';
import './ScoreIndicator.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const ScoreIndicator = ({ score, maxScore = 1, isClicked }) => {
  const percentage = (score / maxScore);
  const [remarks,setRemarks] = useState('');
  
  useEffect(() => {
    if (percentage >= 2.5 && percentage <= 6) {
      setRemarks('Bad');
    } else if (percentage > 6 && percentage < 9) {
      setRemarks('Good');
    } else if (percentage >= 9) {
      setRemarks('Excellent');
    } else {
      setRemarks('Poor');
    }
  }, [percentage]);

  return (
    <div className= { isClicked ? "score-indicator clicked" : "score-indicator not-clicked"}>
      <div className='holder'>
        <div className='score-holder'>{percentage}</div>
        {/* <div className='remark'>{remarks}</div> */}
      </div>
    </div>
  );
};

export default ScoreIndicator;

