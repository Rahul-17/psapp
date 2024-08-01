import React,{ useState,useRef,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { PieChart } from '@mui/x-charts/PieChart';
import './overall.css';
import { Carousel } from 'antd';
// import Box from '../../utility/Boxes';
import Boxes from '../../utility/Boxes';
import VoiceDetails from '../../Widgets/VoiceDetails';
import BodyDetails from '../../Widgets/BodyDetails';
import FaceDetails from '../../Widgets/FaceDetails';
import BodyDetailsStanding from '../../Widgets/BodyDetailsStanding';
import SimpleDialog from '../../utility/DialogBox';
import { useHistory } from 'react-router-dom';
import ScoreIndicator from '../../utility/Score';
import SpeechAnalyzer from '../../stt/SpeechAnalyser';

const OverallAnalysis = ( analysisData ) => {
    const history = useHistory()
    const [isVoiceClicked,setVoiceClicked] = useState(true);
    const [isBodyClicked,setBodyClicked] = useState(true);
    const [isFaceClicked,setFaceClicked] = useState(true);
    console.log(analysisData.location.state.analysisData)

    const { 
      personMoment, wpm, fillers, repetitive, centeredCount, notCentered, 
      forward, left, right, foldedArmCount, inPocketCount, 
      armsOverheadCount, claspCount,rightPose,duration
    } = analysisData.location.state.analysisData;

    // console.log(rightPose)
    
    const [voiceScore, setVoiceScore] = useState(0);
    const [bodyScore, setBodyScore] = useState(0);
    const [faceScore, setFaceScore] = useState(0);
    const [overallScore, setOverallScore] = useState(0);
    const paceScoreRef = useRef(0);
    const fillerScoreRef = useRef(0);
    const repeatScoreRef = useRef(0);

    const class1 = [
      "um", "uh", "like", "you know", "sort of", "kind of", "I mean", "well", "so", "yeah", 
      "right", "okay", "alright", "hmm", "ah", "oh", "wow", "oh my god", "oh no", "oops", 
      "uh-huh", "huh", "yeah", "yeap", "yep", "nope", "let me think", "let's see", "I guess", 
      "I suppose", "I think", "I believe", "I don't know", "I'm not sure", "maybe"
    ];
    
    const class2 = [
      "actually", "basically", "literally", "I feel like", "possibly", "probably", "hopefully", 
      "seriously", "definitely", "absolutely", "totally", "certainly", "surely"
    ];
    
    const class3 = [
      "anyway", "anyways", "however", "though", "nevertheless", "moreover", "furthermore", 
      "in addition", "by the way", "on the other hand", "as a matter of fact", "to be honest", 
      "to tell you the truth", "in my opinion", "from my perspective", "personally", 
      "according to me", "I feel like", "I mean"
    ];

    const countFillers = (fillers) => {
      let class1Count = 0;
      let class2Count = 0;
      let class3Count = 0;
    
      fillers.forEach(filler => {
        if (class1.includes(filler)) {
          class1Count++;
        } else if (class2.includes(filler)) {
          class2Count++;
        } else if (class3.includes(filler)) {
          class3Count++;
        }
      });
    
      return { class1Count, class2Count, class3Count };
    }
    
    
    useEffect(() => {
      let newVoiceScore = 0;
      let paceScore = 0;
      let fillerScore = 0;
      let repeatScore = 0;
      const {class1Count,class2Count,class3Count} = countFillers(fillers);
      const totalCount = class1Count + class2Count + class3Count;
      
      // if (wpm >= 120 && wpm <= 160) newVoiceScore += 1;
      if(wpm >= 120 && wpm <= 160)paceScore += 2.5
      else if(wpm >= 110 && wpm < 120 || wpm > 160 && wpm <= 170)paceScore = 2;
      else if(wpm >= 100 && wpm < 110 || wpm > 170 && wpm <= 180)paceScore = 1.5;
      else if(wpm >= 90 && wpm < 100 || wpm > 180 && wpm <= 190)paceScore = 1;
      else if(wpm >=80 && wpm < 90 || wpm > 190 && wpm <= 200)paceScore = 0.5;

      paceScoreRef.current = paceScore;
   
      // if (fillers.length === 0) newVoiceScore += 1;
      if(duration === 15){
        if(totalCount === 0)fillerScore = 2.5;
        else if(totalCount === 1)fillerScore = 1.5
        else if(totalCount === 2)fillerScore = 1
      }
      else if(duration === 30){
        if(totalCount === 0)fillerScore = 2.5;
        else if(totalCount === 1)fillerScore = 2
        else if(totalCount === 2)fillerScore = 1.5
        else if(totalCount === 3)fillerScore = 1
      }
      else if(duration >= 60){
        if(totalCount >= 0 && totalCount <= 4)fillerScore = 2.5;
        else if(totalCount >= 5 && totalCount <= 7)fillerScore = 1.5
        else if(totalCount >= 8 && totalCount <= 10)fillerScore = 1
      }

      fillerScoreRef.current = fillerScore

      // if (repetitive.length === 0) newVoiceScore += 1;
      // if (repetitive.length === 0) repeatScore = 2.5;

      if(duration === 15){
        if(repetitive.length === 0)repeatScore = 2.5;
        else if(repetitive.length === 1)repeatScore = 1.5
        else if(repetitive.length === 2)repeatScore = 1
      }
      else if(duration === 30){
        if(repetitive.length === 0)repeatScore = 2.5;
        else if(repetitive.length === 1)repeatScore = 2
        else if(repetitive.length === 2)repeatScore = 1.5
        else if(repetitive.length === 3)repeatScore = 1
      }
      else if(duration >= 60){
        if(repetitive.length >= 0 && repetitive.length <= 4)repeatScore = 2.5;
        else if(repetitive.length >= 5 && repetitive.length <= 7)repeatScore = 1.5
        else if(repetitive.length >= 8 && repetitive.length <= 10)repeatScore = 1
      }

      repeatScoreRef.current = repeatScore

      newVoiceScore = paceScore + fillerScore + repeatScore;
      // newVoiceScore = Math.floor((newVoiceScore / 4))
      setVoiceScore(newVoiceScore);
    
      let newBodyScore = 0;
      if (personMoment === 'Sitting') {
        const totalBodyScore = centeredCount + notCentered;
        const centerPercentage = (centeredCount / totalBodyScore) * 100;
        newBodyScore = parseFloat(centerPercentage.toFixed());
    
      } else {
        const total = armsOverheadCount + inPocketCount + foldedArmCount + claspCount + rightPose;
        if (total === 0) {
          // Handle the case where total is 0 to avoid division by zero
          newBodyScore = 0;
        } else {
          const armsOverheadPercentage = Math.round((armsOverheadCount / total) * 100);
          const inPocketsPercentage = Math.round((inPocketCount / total) * 100);
          const foldedArmsPercentage = Math.round((foldedArmCount / total) * 100);
          const claspPercentage = Math.round((claspCount / total) * 100);
          const rightPercentage = Math.round((rightPose / total) * 100);
          
          newBodyScore = rightPercentage
        }
      }
      newBodyScore = (newBodyScore / 10); //added by Rahul
      newBodyScore = parseFloat(newBodyScore.toFixed(1)); //uncommented by Rahul
      setBodyScore(newBodyScore);
    
      const total = forward + left + right;
      const forwardPercentage = Math.round((forward / total) * 100);
      let newFaceScore = (forwardPercentage / 10); //removed *10 by Rahul
      newFaceScore = parseFloat(newFaceScore.toFixed(1));
      setFaceScore(newFaceScore);

      const newOverallScore = ((newVoiceScore + newBodyScore + newFaceScore) / 3) //removed / 30 by Rahul
      setOverallScore(parseFloat(newOverallScore.toFixed(1)));
    }, [personMoment, wpm, fillers, repetitive, centeredCount, notCentered, forward, left, right, foldedArmCount, inPocketCount, armsOverheadCount, claspCount]);
    

    const handleVoiceClick = () => {
        setVoiceClicked(!isVoiceClicked);
        setBodyClicked(true);
        setFaceClicked(true);
    }

    const handleBodyClick = () => {
        setBodyClicked(!isBodyClicked);
        setVoiceClicked(true);
        setFaceClicked(true);
    }

    const handleFaceClick = () => {
        setFaceClicked(!isFaceClicked);
        setVoiceClicked(true);
        setBodyClicked(true);
    }

    const handlePracticeClick = () => {
      history.push('/set-timer-to-speak')
    }

    const containerClass = personMoment === 'Sitting' ? 'box-container center' : 'box-container center';


    // const isAnyIconClicked = !isVoiceClicked || !isBodyClicked || !isFaceClicked;


    return (
        <div className='container'>
          <div className='heading-container'>
            <span className='heading'>Overall Score</span>
          </div>

          <div className='banner-container'>
            <img src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/Supergraphic.jpg" alt="Colorful Banner" className='banner-image'/>
          </div>

          <div className='analysis-container'>
              <div className='score-container'>
                  <div className='score-display'>
                      <span className='score'>Overall Score : {overallScore} / 10</span>
                  </div>
                  <div style={{marginTop:"20px",marginBottom:"20px",display:"flex",flexDirection:"row",gap:"5px"}} className='transcript'>
                      <SimpleDialog transcript={analysisData.location.state.analysisData.transcript}/>
                      <SpeechAnalyzer transcript={analysisData.location.state.analysisData.transcript}/>
                  </div>
                    <div className='icon-grid'>
                          <div className={ isVoiceClicked ? 'icon-item' : 'icon-item-clicked'} onClick={handleVoiceClick}>
                          <img
                              src= {isVoiceClicked ?
                              'https://publicspeakingapp.blob.core.windows.net/carouselimages/voiceAnalysis.png' : 'https://publicspeakingapp.blob.core.windows.net/clickanimationicons/Voice Analysis-icon-without-bg.png'}
                              alt="Speech Icon"
                              className='icon'
                          />
                          <ScoreIndicator score={voiceScore} isClicked={!isVoiceClicked}/>
                          <div className={ isVoiceClicked ? 'icon-label' : 'icon-label-clicked'}>Voice Analysis</div>
                          </div>
                          <div className={ isBodyClicked ? 'icon-item' : 'icon-item-clicked'} onClick={handleBodyClick}>
                          <img
                              src= { isBodyClicked ? 
                              'https://publicspeakingapp.blob.core.windows.net/carouselimages/bodyAnalysis.png' : 'https://publicspeakingapp.blob.core.windows.net/clickanimationicons/screen-body_Language-icon-without-bg.png'}
                              alt="Body Icon"
                              className='icon'
                          />
                          <ScoreIndicator score={bodyScore}  isClicked={!isBodyClicked}/>
                          <div className={ isBodyClicked ? 'icon-label' : 'icon-label-clicked'}>Body Analysis</div>
                          </div>
                          <div className={ isFaceClicked ? 'icon-item' : 'icon-item-clicked'} onClick={handleFaceClick}>
                          <img
                              src= { isFaceClicked ?
                              'https://publicspeakingapp.blob.core.windows.net/carouselimages/faceAnalysis.png' : 'https://publicspeakingapp.blob.core.windows.net/clickanimationicons/screen-face_expectations-icon-without-bg.png'}
                              alt="Face Icon"
                              className='icon'
                          />
                          <ScoreIndicator score={faceScore}  isClicked={!isFaceClicked}/>
                          <div className={ isFaceClicked ? 'icon-label' : 'icon-label-clicked'}>Face Analysis</div>
                          </div>
                      </div>
                      
              </div> 

              { !isVoiceClicked ? (
                  <div className='box-container center'>
                    <VoiceDetails analysisData={analysisData.location.state.analysisData} paceScore={paceScoreRef.current} fillerScore={fillerScoreRef.current} repeatScore={repeatScoreRef.current}/>
                  </div>
                ) : 
                !isBodyClicked ? (
                  <div className={containerClass}>
                    {/* <BodyDetailsStanding analysisData={analysisData.location.state.analysisData}/> */}
                    {personMoment === 'Sitting' && <BodyDetails analysisData={analysisData.location.state.analysisData}/> }
                    {personMoment === 'Standing' && <BodyDetailsStanding analysisData={analysisData.location.state.analysisData}/>}
                  </div>
                ) : 
                !isFaceClicked ? (
                  <div className='box-container center'>
                    <FaceDetails analysisData={analysisData.location.state.analysisData}/>
                  </div>
                ) :
                ( 
                  <div className='footer'>
                    <div className='footer-container'>
                      <button className='practice-btn' onClick={handlePracticeClick}>
                        Practice Again
                      </button>
                    </div>
                  </div>
                )}

          </div>
        </div>
      )
}

export default OverallAnalysis;