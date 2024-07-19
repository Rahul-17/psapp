import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import './left.css';

const Left = ({ left }) => {
    return (
        <div>
            {left > 0 && 
                <div>
                    <div className='left-expression-type'>
                        <span>Facial Expressions type:</span>
                        <span>Remembering 🤔</span>
                    </div>
                    <div className='voice-suggestions'>
                        <div className='desc-icon'>
                            <FontAwesomeIcon icon={faComment} className='font-icon' style={{ color: "black" }} />
                        </div>
                        <div className='sugg-msg'>
                            <h2 className='sugg-msg-heading'>Tips and Suggestion:</h2>
                            <ul className='tips'>
                                <li className='tips-item'>Practice to improve confidence</li>
                                <li className='tips-item'>Looking left shows your lack of confidence</li>
                                <li className='tips-item'>Try to maintain eye contact with your audience at all times and keep them engaged</li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
            {left === 0 && 
                <div className='not-left'>
                    <span>Excellent work! You seem to be confident with your speech. This is a result of your persistent effort.</span>
                </div>
            }
        </div>
    )
}

export default Left;
