import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage,faComment } from '@fortawesome/free-solid-svg-icons';
import './rightposture.css'

const RightPosture = () => {

    return (
        <div>
            <div className='gesture-display-for-right'><b>Consider watching this video to improve your posture</b></div>
                <div className='video-element'>
                    <iframe
                        width="90%"
                        height="350"
                        src='https://www.youtube.com/embed/cFLjudWTuGQ'
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded YouTube Video"
                    />
            </div>  
        </div>
    )
}
export default RightPosture;