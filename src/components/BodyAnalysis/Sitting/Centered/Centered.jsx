import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage,faComment } from '@fortawesome/free-solid-svg-icons';
import './centered.css';

const Centered = ({ percentage }) => {
    let string = ''
    if(percentage > 85)string = 'Great going. You were centered most of the time.'
    else if(percentage > 50 && percentage < 85)string ='Not bad. Just try to follow the grid lines.'
    else{
        string = 'You were off position for most of the time. Got to work on positioning!'
    }

    
    return (
        <div className='centered-container'>
             <div className='centered-remarks'>
                <span>Remarks:</span>
                <span>{string}</span>
             </div>
             <div className='centered-suggestions'>
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

export default Centered;