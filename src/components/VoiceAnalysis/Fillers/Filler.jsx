import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage,faComment } from '@fortawesome/free-solid-svg-icons';
import './filler.css'

const Filler = ({fillers,fillerCount}) => {

    return (
        <div>
            {fillers.length > 0 && 
        <div className='container-fillers'>
            <div className='table-div'>
                <h2 className='sugg-msg-heading'>Filler Words:</h2>
            <div className='table'>
                <table className='table-container'>
                    <thead>
                        <tr>
                            <th>Fillers</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fillers.map((word, index) => (
                            <tr key={index}>
                            <td>{word}</td>
                            <td>{fillerCount[index]}</td>
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
                    <p>Filler words are words or phrases that people use to "fill in" empty spaces in their speech. 
                        They are often used when a person is thinking about what to say next, or when they are unsure of what to say.
                        Common filler words include "um," "uh," "like," and "you know." 
                        While it is normal to use filler words occasionally, using them too frequently can make you sound less confident and less professional.
                        Filler words can be very common, and they can be used by people of all ages and backgrounds.
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
                        <li className='tips-item'>Be aware of fillers</li>
                        <li className='tips-item'>Pace your speech based on what's needed and utilise pauses effectively.</li>
                    </ul>
                </div>
            </div>
        </div>}
        {fillers.length === 0 && 
        <div className='desc-no-repeat'>
                    <p>Your Speech is to the point and clear. You have not used any filler. Keep up the good work.
                    </p>
        </div>}
        </div>
    )
}

export default Filler;