import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faVideo, faMicrophoneSlash,faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import './SwitchAudioAndVideo.css';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd';

const SwitchAudioAndVideo = (props) => {
  const [mic, setMic] = useState(false);
  const [video, setVideo] = useState(false);
  const history = useHistory();
  const duration = props.location.state.duration.current;
  const recordingEnabled = props.location.state.recordingEnabled;
  console.log("PERMISSSION", recordingEnabled, props.location.state) //modified by Rahul
  //modified by Rahul
  const handleVoiceClick = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setMic(!mic);
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  const handleVideoClick = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        setVideo(!video);
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  };
  //modified by Rahul
  const handleClick = () => {
    if(mic === true && video === true){
      history.push('/camera',{duration: duration,recordingEnabled:recordingEnabled});
    }
    else{
      Modal.warning({
        title: 'Warning',
        content: 'Please enable camera and microphone to proceed!',
      });
    }
  }

  return (
    <div className="container" style={{overflow:"auto"}}>
      <div className="banner">
        <img
          src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/Supergraphic.jpg"
          alt="Colorful Banner"
          style={{ width: '100%', height: '10px' }}
        />
      </div>
      <div className="content">
        <div className="message">Please enable camera and microphone to proceed</div>
        <div className="controls">
          <div
            className={`control-icon ${mic ? 'line-through' : ''}`}
            onClick={handleVoiceClick}
          >
            <FontAwesomeIcon icon={mic ? faMicrophone : faMicrophoneSlash} />
          </div>
          <div
            className={`control-icon ${video ? 'line-through' : ''}`}
            onClick={handleVideoClick}
          >
            <FontAwesomeIcon icon={video ? faVideo : faVideoSlash} />
          </div>
        </div>
        <div className="audio-visualization">
          <img
            src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/audio_lines.png"
            alt="Audio Lines"
            height="100"
          />
        </div>
        <div>
          <button
            onClick= {handleClick}
            className='permissions-next'
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwitchAudioAndVideo;