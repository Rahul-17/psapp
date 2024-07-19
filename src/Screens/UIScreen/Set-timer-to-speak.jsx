import React, { useState, useEffect,useRef } from 'react';
import up from '../../assets/up-arrow.png';
import down from '../../assets/down-arrow.png';
import { useHistory } from 'react-router';
import './settimer.css'
import {Modal} from 'antd'

const SetTimerToSpeak = () => {
  const [counter, setCounter] = useState(0);
  const [formattedCounter, setFormattedCounter] = useState('');
  const [displayTime, setDisplayTime] = useState('');
  const history = useHistory();
  const duration = useRef(0);


  useEffect(() => {
    setFormattedCounter(counter.toString().padStart(2, '0'));
  }, [counter]);

  useEffect(() => {
    if (duration.current > 45 && duration.current < 60) {
      setDisplayTime('1:00');
    } else if (duration.current >= 60) {
      const minutes = Math.floor(duration.current / 60);
      const seconds = duration.current % 60;
      setDisplayTime(`${minutes} : ${seconds.toString().padStart(2, '0')}`);
    } else {
      setDisplayTime('');
    }
  }, [duration.current]);

  const handleDecrement = () => {
    if (counter >= 15) {
      setCounter(counter - 15);
      duration.current -= 15;
    }
  };

  const handleIncrement = () => {
    setCounter(counter + 15);
    duration.current += 15;
  };

  const handleNext = () => {
    if (counter === 0) {
      Modal.warning({
        title:"Timer not set",
        content:"Please set a valid timer duration."
      })
    } else {
      // Navigate to the next screen with the selected duration
      // You can use the `formattedCounter` or `counter` value as needed
      console.log(`Navigating to next screen with duration: ${counter} seconds`);
      history.push('/permissions',{duration: duration})
    }
  };

  return (
      <div className='timer-container'>
          <div style={{ marginTop: '10px' }}>
          <img src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/Supergraphic.jpg" alt="Colorful Banner" style={{ width: '100%', height: '10px' }} />
      </div>

      <div
        className='timer-main-container'
      >
        <div
          className='timer-main-container-text'
        >
          Select the time duration for which you want to speak
        </div>
        <div style={{ marginTop: '10px', marginBottom: '30px' }}>
          <img
            src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/audio_lines.png"
            alt="Audio Lines"
            height="100"
          />
        </div>
        <div
          className='timer-main-container-counter-div'
        >
          <div className='timer-main-container-counter'>
            <button
            className='timer-main-container-counter-buttons'
            onClick={handleDecrement}
            >
              <img src={down} alt='down'/>
            </button>
            <div
              className='timer-main-container-counter-display'
            >
              {/* 00 : {formattedCounter} */}
              {displayTime ? displayTime : `00 : ${formattedCounter}`}
            </div>
            <button
              className='timer-main-container-counter-buttons'
              onClick={handleIncrement}
            >
              <img src={up} alt='up'/>
            </button>
          </div>
        
        <button
            className='timer-main-container-counter-next-button'
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      <div 
        className='timer-over-main-container'
      >         
        <div 
          className='timer-over-main-container-div'
        >
          <div
            className='timer-over-main-container-text'
          >
            Select yes if you want to record your session.
          </div>
          <div className='timer-over-main-container-buttons'>
            <button
              className='timer-over-main-container-yes'
            >
              Yes
            </button>
            <button
              className='timer-over-main-container-no'
            >
              No
            </button>
          </div>
        </div>

        </div>
      </div>
     
    </div>
  );
};

export default SetTimerToSpeak;