import React,{useState} from 'react';
import Pace from '../VoiceAnalysis/WPM/Pace';
import './suggestions.css';
import Repetition from '../VoiceAnalysis/Repeats/Repetition';
import Filler from '../VoiceAnalysis/Fillers/Filler';
import Centered from '../BodyAnalysis/Sitting/Centered/Centered';
import NotCentered from '../BodyAnalysis/Sitting/NotCentered/NotCentered';
import Forward from '../FaceAnalysis/Forward/Forward'
import Left from '../FaceAnalysis/Left/Left';
import Right from '../FaceAnalysis/Right/Right';
import Armsfolded from '../BodyAnalysis/Standing/Armsfolded/Armsfolded';
import Clasped from '../BodyAnalysis/Standing/Clasped/Clasped';
import Inpocket from '../BodyAnalysis/Standing/InPocket/Inpocket';
import Overhead from '../BodyAnalysis/Standing/Overhead/Overhead';
import RightPosture from '../BodyAnalysis/Standing/RightPosture/Rightposture';

const Suggestions = ( {boxClicked,analysisData,center,notcenter,claspPercentage,foldedPercentage,inPocket,overHead} ) => {
    const data = analysisData;

    return (
        <div className='suggestions-container'>
            {boxClicked === 'WPM' && <Pace wpm={data.wpm}/>}
            {boxClicked === 'Repetition' && <Repetition repeats={data.repetitive} count={data.repeatCount}/>}
            {boxClicked === 'Fillers' && <Filler fillers={data.fillers} fillerCount={data.fillerCounts}/>}
            {boxClicked === 'Centered' && <Centered percentage={center}/>}
            {boxClicked === 'Not Centered' && <NotCentered percentage={notcenter}/>}
            {boxClicked === 'Forward' && <Forward />}
            {boxClicked === 'Left' && <Left left={data.left}/>}
            {boxClicked === 'Right' && <Right right={data.right}/>}
            {boxClicked === 'Folding Arms' && <Armsfolded foldedPercentage={foldedPercentage}/>}
            {boxClicked === 'Hands Clasped' && <Clasped claspPercentage={claspPercentage}/>}
            {boxClicked === 'Hands in pocket' && <Inpocket inPocket={inPocket}/>}
            {boxClicked === 'Arms Overhead' && <Overhead overHead={overHead}/>}
            {boxClicked === 'Right Posture' && <RightPosture />}
        </div>        
    )
}

export default Suggestions;