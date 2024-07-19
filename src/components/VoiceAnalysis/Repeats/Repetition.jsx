import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage,faComment } from '@fortawesome/free-solid-svg-icons';
import './repetition.css';

const Repetition = ({repeats,count}) => {

    return (
        <div>
        {repeats.length > 0 && 
        <div className='container-repeat'>
            <div className='table-div'>
                <h2 className='sugg-msg-heading'>Repeated Words:</h2>
            <div className='table'>
                <table className='table-container'>
                    <thead>
                        <tr>
                            <th>Words</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repeats.map((word, index) => (
                            <tr key={index}>
                            <td>{word}</td>
                            <td>{count[index]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
      </div>
           <div className='voice-description'>
                <div className='desc-icon'>
                    <FontAwesomeIcon icon={faMessage} className='font-icon' style={{color:"black"}}/>
                </div>
                <div className='desc-para'>
                    <p>Repetition is the act of repeating sounds, words, phrases, or full sentences in speech.As a literary
                        device, it is used to stress key points or to achieve a certain rhythm, tone, or style of prose - which
                        is why it is so common in poetry.
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
        </div>}
        {repeats.length === 0 && 
        <div className='desc-no-repeat'>
                    <p>Your Speech is to the point and clear. You have not used any word more than twice. Keep up the good work.
                    </p>
        </div>}
        </div>
    )
}

export default Repetition;