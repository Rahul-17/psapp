// import React,{useState} from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMessage,faComment } from '@fortawesome/free-solid-svg-icons';
// import './right.css'

// const Right = ({ right }) => {

//     return (
//         <div>
//              {right > 0 && <div className='right-expression-type'>
//                 <span>Facial Expressions type:</span>
//                 <span>Rehearsing 🙄 </span>
//              </div>
//              <div className='voice-suggestions'>
//                 <div className='desc-icon'>
//                     <FontAwesomeIcon icon={faComment} className='font-icon' style={{color:"black"}}/>
//                 </div>
//                 <div className='sugg-msg'>
//                     <h2 className='sugg-msg-heading'>Tips and Suggestion:</h2>
//                     <ul className='tips'>
//                         <li className='tips-item'>Practice a lot more.Try to rehearse the script before the presentation or speech</li>
//                         <li className='tips-item'>Looking right is often seen as a sign of unpreparedness</li>
//                         <li className='tips-item'>When you look right, it becomes difficult to establish a connect with the audience</li>
//                     </ul>
//                 </div>
//             </div>}
//             {right === 0 && <div className='not-right'>
//                 Greate job! You seem to have practiced your script beforehand.
//                 </div>

//             }
//         </div>
//     )
// }

// export default Right;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import './right.css';

const Right = ({ right }) => {
    return (
        <div>
            {right > 0 && 
                <div>
                    <div className='right-expression-type'>
                        <span>Facial Expressions type:</span>
                        <span>Rehearsing 🙄</span>
                    </div>
                    <div className='voice-suggestions'>
                        <div className='desc-icon'>
                            <FontAwesomeIcon icon={faComment} className='font-icon' style={{color: "black"}} />
                        </div>
                        <div className='sugg-msg'>
                            <h2 className='sugg-msg-heading'>Tips and Suggestion:</h2>
                            <ul className='tips'>
                                <li className='tips-item'>Practice a lot more. Try to rehearse the script before the presentation or speech.</li>
                                <li className='tips-item'>Looking right is often seen as a sign of unpreparedness.</li>
                                <li className='tips-item'>When you look right, it becomes difficult to establish a connection with the audience.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
            {right === 0 && 
                <div className='not-right'>
                    <span>Great job! You seem to have practiced your script beforehand.</span>
                </div>
            }
        </div>
    );
}

export default Right;
