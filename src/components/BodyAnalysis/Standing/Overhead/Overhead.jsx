import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage,faComment } from '@fortawesome/free-solid-svg-icons';
import './overhead.css'

const Overhead = ({ overHead }) => {

    return (
        <div>
            {overHead > 0 && <div>
            <div className='gesture-display'><b>🙁 Incorrect Gesture : Arms Overhead</b></div>            
            <div className='voice-description'>    
                <div className='desc-icon'>
                    <FontAwesomeIcon icon={faMessage} className='font-icon' style={{color:"black"}}/>
                </div>
                <div className='desc-para'>
                    <p>                   
                    Having your arms overhead during a presentation can be distracting for the audience and may come across as overly theatrical or even uncomfortable. 
                    </p>
                </div>
            </div>
             <div className='voice-suggestions'>
                <div className='desc-icon'>
                    <FontAwesomeIcon icon={faComment} className='font-icon' style={{color:"black"}}/>
                </div>
                <div className='sugg-msg'>
                    <h2 className='sugg-msg-heading'>This can be avoided by:</h2>
                    <ul className='tips'>
                        <li className='tips-item'>Recognise why and when you tend to put your arms overhead.</li>
                        <li className='tips-item'>Aim for a neutral or relaxed posture.Keep your arms at your sides or use them for natural,expressive gestures.</li>
                        <li className='tips-item'>Use controlled and purposeful gestures to emphasize points.</li>
                        <li className='tips-item'>Incorporate movement into the presentation by walking around the stage or gesturing naturally with your hands.</li>
                        <li className='tips-item'>If relevant hold a prop or visual aids related to your presentation.</li>
                    </ul>
                </div>
            </div>
            </div>
            }
            {overHead === 0 && <div className='not-overhead'>
                <span>You seem to have given a perfect presentation. Kudos to you for a commendable presentation.</span>
                </div>}
        </div>
    )
}

export default Overhead;