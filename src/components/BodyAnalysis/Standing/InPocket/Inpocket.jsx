import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage,faComment } from '@fortawesome/free-solid-svg-icons';
import './inpocket.css'

const Inpocket = ({ inPocket }) => {

    return (
        <div>
            {inPocket > 0 && <div>
            <div className='gesture-display'><b>🙁 Incorrect Gesture : Hands in pocket</b></div>            
            <div className='voice-description'>    
                <div className='desc-icon'>
                    <FontAwesomeIcon icon={faMessage} className='font-icon' style={{color:"black"}}/>
                </div>
                <div className='desc-para'>
                    <p>
                    Having your hands in your pockets during a presentation can make you appear unprofessional or disengaged
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
                        <li className='tips-item'>Keep your hands out of your pockets to project confidence and openness.</li>
                        <li className='tips-item'>Always try to use an open body language in order to keep your speech and hands free flowing.</li>
                        <li className='tips-item'>Record your presentation to become more comfortable with your hands naturally.</li>
                    </ul>
                </div>
            </div>
            </div>
}
        {inPocket === 0 && <div className='not-in-pocket'>
                <span>Excellent attempt. Your presentation was as professional as it could get.</span>
            </div>}
        </div>
    )
}

export default Inpocket;