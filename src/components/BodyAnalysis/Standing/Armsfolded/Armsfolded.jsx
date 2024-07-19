import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage,faComment } from '@fortawesome/free-solid-svg-icons';
import './armsfolded.css'

const Armsfolded = ({foldedPercentage}) => {

    return (
        <div>
            {foldedPercentage > 0 && <div>
            <div className='gesture-display'><b>🙁 Incorrect Gesture : Folding Arms</b></div>            
            <div className='voice-description'>    
                <div className='desc-icon'>
                    <FontAwesomeIcon icon={faMessage} className='font-icon' style={{color:"black"}}/>
                </div>
                <div className='desc-para'>
                    <p>
                    Folding your arms during a presentation can send unintended signals to your audience, 
                    such as defensiveness or a lack of openness. 
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
                        <li className='tips-item'>Using hand gestures to engage your audience.</li>
                        <li className='tips-item'>If you are unsure what to do with your hands,use anchor points like holding a pointer,a notecard,etc.</li>
                        <li className='tips-item'>Walking around the stage or moving your hands naturally can reduce the tendency to fold your arms.</li>
                    </ul>
                </div>
            </div>
            </div>
}       
            {foldedPercentage === 0 && 
             <div className='not-folded'>   
             <span>Nice job! You have done a great job at keeping your audience engaged.</span>
        </div>}
        </div>
    )
}

export default Armsfolded;