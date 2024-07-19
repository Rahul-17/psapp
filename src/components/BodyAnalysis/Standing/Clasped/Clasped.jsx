import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage,faComment } from '@fortawesome/free-solid-svg-icons';
import './clasped.css'

const Clasped = ({ claspPercentage }) => {
    let string = ''

    if(claspPercentage >= 0 && claspPercentage < 5)string='Great work! You do not seem to be very nervous.'
    else if(claspPercentage > 5 && claspPercentage <= 7)string='I think you are a tad bit nervous which definitely can be worked on. Just keep at it.'
    return (
        <div>
        {claspPercentage > 7 && <div>
            <div className='gesture-display'><b>🙁 Incorrect Gesture : Hands Clasped</b></div>            
            <div className='voice-description'>    
                <div className='desc-icon'>
                    <FontAwesomeIcon icon={faMessage} className='font-icon' style={{color:"black"}}/>
                </div>
                <div className='desc-para'>
                    <p>
                    Clasping your hands during a presentation can give off an impression of nervousness or insecurity.
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
                        <li className='tips-item'>Aim for a relaxed posture.</li>
                        <li className='tips-item'>Incorporate purposeful hand gestures to emphasize key points and add expressiveness to your presentation.</li>
                        <li className='tips-item'>Practice deep breathing,visualisation or other relaxation techniques before your speech to calm your nerves.</li>
                    </ul>
                </div>
            </div>
            </div>
        }       
        {claspPercentage <= 7 && 
            <div className='not-clasped'>   
                 <span>{string}</span>
            </div>
        }
        </div>
    )
}

export default Clasped;