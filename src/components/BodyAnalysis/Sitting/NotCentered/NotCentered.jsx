import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage,faComment } from '@fortawesome/free-solid-svg-icons';
import './notcentered.css';

const NotCentered = ({percentage}) => {
    let string = ''
    if(percentage > 85)string = 'You were of position most of the time. Got to work a lot on positioning!'
    else if(percentage > 50 && percentage < 85)string ='Still there is room for a improvement. Just try to stay within the center grid.'
    else if(percentage > 30 && percentage < 50){
        string = 'Not bad! Definitely can do better.'
    }
    else if(percentage > 10 && percentage < 30){
        string = 'Almost there. A little bit more towards the center next time.'
    }
    else{
        string = 'Excellent work champ!'
    }

    return (
        <div>
            <div className='notCentered-remarks'>
                <span>Remarks:</span>
                <span>{string}</span>
             </div>
             <div className='notCentered-suggestions'>
                <div className='desc-icon'>
                    <FontAwesomeIcon icon={faComment} className='font-icon' style={{color:"black"}}/>
                </div>
                <div className='sugg-msg'>
                    <h2 className='sugg-msg-heading'>Tips and Suggestion:</h2>
                    <ul className='tips'>
                        <li className='tips-item'>Use the grid lines to help you position yourself so that you are perfectly centered in the camera.</li>
                        <li className='tips-item'>Make sure you nose lies on the point of center of the page at all times.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NotCentered;