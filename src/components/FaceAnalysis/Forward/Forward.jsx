import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage,faComment } from '@fortawesome/free-solid-svg-icons';
import './forward.css'

const Forward = () => {

    return (
        <div>
             <div className='forward-expression-type'>
                <span>Facial Expressions type:</span>
                <span>Engaging 🙂 </span>
             </div>
             <div className='voice-suggestions'>
                <div className='desc-icon'>
                    <FontAwesomeIcon icon={faComment} className='font-icon' style={{color:"black"}}/>
                </div>
                <div className='sugg-msg'>
                    <h2 className='sugg-msg-heading'>Tips and Suggestion:</h2>
                    <ul className='tips'>
                        <li className='tips-item'>Good eye contact shows interest.</li>
                        <li className='tips-item'>Although looking forward is what one must do but make sure you do not stare at a particular spot.</li>
                        <li className='tips-item'>Try to maintain eye contact with your audience at all times.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Forward;