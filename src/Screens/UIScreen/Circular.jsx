import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import OverallAnalysis from './OverallAnalysis';
import {Link,useLocation} from 'react-router-dom';

const CircularCounter = ( props ) => {
  const [currentTime, setCurrentTime] = useState(5);
  const history = useHistory();
  const location = useLocation();
  // console.log(props.analysisData)
  const analysisData = props.location.state.analysisData
  // console.log(analysisData);

  useEffect(() => {
    let interval
    if (currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(prevTime => prevTime - 1);
      }, 1000);
    } else {
      // <Link to={{pathname:"/analysis",state:analysisData}}></Link>
      history.push('/analysis',{analysisData: analysisData});
      // <OverallAnalysis analysisData={analysisData}/>
    }

    return () => clearInterval(interval);
}, [currentTime, history]);

  const calculateProgress = () => {
    return ((5 - currentTime) / 5) * 100;
  };

  return (
    <div style={{width:"100%",height:"100%",backgroundColor:"white"}}>
      <div style={{ marginTop: '10px' }}>
        <img src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/Supergraphic.jpg" alt="Colorful Banner" style={{ width: '100%', height: '10px' }} />
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',textAlign: 'center'}}>
        <h2>Analysing...</h2>     
      <div style={{ position: 'relative', width: '100px', height: '100px' }}>
        <svg width="100%" height="100%">
          <circle
           cx="50%"
           cy="50%"
           r="45%"
          fill="none"
          stroke="#ccc"
          strokeWidth="4"
        />
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="#3240CF"
          strokeWidth="4"
          strokeDasharray={`${calculateProgress()}, 100`}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="24"
        >
          {currentTime}
        </text>
      </svg>
    </div>
    </div>
    </div>
  );
};

export default CircularCounter;
