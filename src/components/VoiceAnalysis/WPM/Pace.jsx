import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage,faComment } from '@fortawesome/free-solid-svg-icons';
import './pace.css';
import ReactSpeedometer from "react-d3-speedometer";

const Pace = ({wpm}) => {

    return (
        <div className='container-voice'>
            <div className='voice-speedometer'>
                <ReactSpeedometer
                    value={wpm}  
                    currentValueText= {`${wpm} WPM`}
                    needleColor='black'
                    startColor='#ac0067'
                    endColor='#ac0067'
                    segments={1}
                    maxValue={500}
                    maxSegmentLabels={0}
                    ringWidth={20}
                />
            </div>
            <div className='voice-description'>
                <div className='desc-icon'>
                    <FontAwesomeIcon icon={faMessage} className='font-icon' style={{color:"black"}}/>
                </div>
                <div className='desc-para'>
                    <p>The average speaking rate for public speaking is between 120 and 160 words per minute.
                       However, this can vary depending on the type of speech, the audience, and the speaker's comfort level.
                    </p>
                </div>
            </div>
            <div className='voice-suggestions'>
                <div className='desc-icon'>
                    <FontAwesomeIcon icon={faComment} className='font-icon' style={{color:"black"}}/>
                </div>
                <div className='sugg-msg'>
                    <h2 className='sugg-msg-heading'>Tips and Suggestion:</h2>
                    <ul className='tips'>
                        <li className='tips-item'>Practice regularly and be aware of your speech rate.</li>
                        <li className='tips-item'>Pause and Enunciate clearly.</li>
                        <li className='tips-item'>Use breathing techniques.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Pace;