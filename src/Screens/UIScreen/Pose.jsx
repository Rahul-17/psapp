import * as cam from "@mediapipe/camera_utils";
import * as mediapipePose from "@mediapipe/pose";
import React, { useState,useEffect, useRef } from 'react';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'
import { Pose } from "@mediapipe/pose";
// import { Holistic } from "@mediapipe/holistic";
// import * as mediapipeHolistic from "@mediapipe/holistic";
import Webcam from 'react-webcam'
// import CircularCounter from './Circular';
import { useHistory } from "react-router";
import { run } from "../../stt/grammar";
import StartAnalyse from "../../utility/StartAnalyse";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const UserPose = () => {
// refs to the html elements
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const history = useHistory();
// const landmarkRef = useRef(null);
    const [isListening, setIsListening] = useState(false);
// const [transcript, setTranscript] = useState('');
    const [transcripts, setTranscripts] = useState([]);
    const [analyzing, setAnalyzing] = useState(false);
    const [timeLeft,setTimeLeft] = useState(15);
    const [analysisData,setAnalysisData] = useState({
                                                  repetitive:[],
                                                  fillers:[],
                                                  wpm:0,
                                                  repeatCount:[],
                                                    })


    const [countdownInterval, setCountdownInterval] = useState(null);
    // landmarkRef = new LandmarkGrid(landmarkContainer);
    let camera = null; // variable to initialize the camera
    // function to draw the landmarks once the pose has been determnined

    let leftWrist;
    let rightWrist;
    let leftShoulder;
    let rightShoulder;
    let leftElbow;
    let rightElbow;
    const threshold = 5.0;
    const centerThreshold = 0.1 * (window.screen.height/2);
    let foldedArms = 0;
    let overHead = 0;
    let inPockets = 0;
    let claps = 0;
    let rightPosture = 0;
    let totalObservations = 0;
    let foldedArmsPercentage = 0;
    let overHeadPercentage = 0;
    let inPocketsPercentage = 0;
    let clapsPercentage = 0;
    let rightPosturePercentage = 0;
    let wrongPosePercentage;
    let leftFoot;
    let rightFoot;
    let startTime

    function calculateAngle(x1,y1,x2,y2,x3,y3){
      const angle1 = Math.atan2(y1 - y2,x1 - x2);
      const angle2 = Math.atan2(y3 - y2,x3 - x2);

      let angle = angle1 - angle2;
      if(angle < 0){
        angle += 2 * Math.PI;
      }

      return angle * 180 / Math.PI;
    }

    function calculateDistance(x1,y1,x2,y2){
      const deltaX = x1 - x2;
      const deltaY = y1 - y2;

      return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    function calculateMidPoint(x1,y1,x2,y2){
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;

      return [midX,midY];
    }

    function euclidean(x,y){
      const deltaX = x - (window.screen.width/2);
      const deltaY = y - (window.screen.height/2);

      const distance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));

      return distance;
    }

    function onResults(results) {
// Define the canvas elements
      canvasRef.current.width = webcamRef.current.video.videoWidth
      canvasRef.current.height = webcamRef.current.video.videoHeight
      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext("2d")
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(results.image,0,0,canvasElement.width,canvasElement.height)
      // if(!results.poseLandmarks){
      //   alert("User not in frame!")
      // }

      // console.log(results.poseLandmarks);
      leftShoulder = results.poseLandmarks[11];
      rightShoulder = results.poseLandmarks[12];
      leftElbow = results.poseLandmarks[13];
      rightElbow = results.poseLandmarks[14];
      leftWrist = results.poseLandmarks[15];
      rightWrist = results.poseLandmarks[16];
      leftFoot = results.poseLandmarks[31];
      rightFoot = results.poseLandmarks[32];
      const leftHip = results.poseLandmarks[23];
      const rightHip = results.poseLandmarks[24];
      const leftKnee = results.poseLandmarks[25];
      const rightKnee = results.poseLandmarks[26];
      const leftAnkle = results.poseLandmarks[27];
      const rightAnkle = results.poseLandmarks[28];

      const [midX,midY] = calculateMidPoint(leftShoulder.x,leftShoulder.y,rightShoulder.x,rightShoulder.y);
      const distance = euclidean(midX,midY);

      if(distance <= centerThreshold){
        console.log("Centered")
      }
      else{
        console.log("Not Centered")
      }

      // const hipToKneeDistance = calculateDistance(leftShoulder.x,leftShoulder.y,leftHip.x,leftHip.y);
      // const kneeToAnkleDistance = calculateDistance(rightShoulder.x,rightShoulder.y,rightHip.x,rightHip.y);

      // if(leftKnee.y > leftHip.y)console.log("Sitting");
      // else console.log("Standing")

      // if (hipToKneeDistance < maxHipToKneeDistance && kneeToAnkleDistance < maxKneeToAnkleDistance) {
      //     console.log("Standing");
      // }
      // else {
      //   console.log("Sitting");
      // }

      const leftAngle = calculateAngle(leftShoulder.x,leftShoulder.y,leftElbow.x,leftElbow.y,leftWrist.x,leftWrist.y);
      const rightAngle = calculateAngle(rightShoulder.x,rightShoulder.y,rightElbow.x,rightElbow.y,rightWrist.x,rightWrist.y);

      if ((leftAngle >= 50 - threshold && leftAngle <= 90 + threshold) &&
      (rightAngle >= 250 - threshold && rightAngle <= 300 + threshold)) {
          foldedArms += 1;
      } else if ((leftAngle >= 290 - threshold && leftAngle <= 330 + threshold) &&
      (rightAngle >= 40 - threshold && rightAngle <= 80 + threshold)) {
          overHead += 1;
      } else if ((leftAngle >= 150 - threshold && leftAngle <= 220 + threshold) &&
      (rightAngle >= 180 - threshold && rightAngle <= 220 + threshold)) {
          inPockets += 1;
      } else if ((leftAngle >= 65 - threshold && leftAngle <= 105 + threshold) &&
      (rightAngle >= 260 - threshold && rightAngle <= 300 + threshold)) {
          claps += 1;
      } else {
          rightPosture += 1;
      }

      totalObservations = foldedArms + overHead + inPockets + claps + rightPosture;

      foldedArmsPercentage = (foldedArms / totalObservations) * 100;
      overHeadPercentage = (overHead / totalObservations) * 100;
      inPocketsPercentage = (inPockets / totalObservations) * 100;
      clapsPercentage = (claps / totalObservations) * 100;
      rightPosturePercentage = (rightPosture / totalObservations) * 100;

      wrongPosePercentage = 100 - rightPosturePercentage
      // console.log(wrongPosePercentage);



      drawConnectors(canvasCtx,results.poseLandmarks, mediapipePose.POSE_CONNECTIONS,{ color: '#3240CF', lineWidth: 2 });
      // The dots are the landmarks
      drawLandmarks(canvasCtx, results.poseLandmarks,{ color: 'red', lineWidth: 2, radius: 3 });
      canvasCtx.restore();
  }

  let recognition;

  const startListening = () => {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new window.SpeechRecognition();

    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.addEventListener('result', handleSpeechResult);
    recognition.start();

    startTime = new Date().getTime();
    console.log(startTime);
    setIsListening(true);

    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(interval); // Stop the timer if timeLeft is 0 or less
          stopListening();
          return 0; // Return 0 to prevent going into negative numbers
        }
      });
    }, 1000);

    setCountdownInterval(interval);

    if(isListening){
      setTimeout(() => {
        stopListening();
      }, 15000);
    }

    if(analyzing){
      setAnalyzing(false)
    }

    setTranscripts([])
  }

  const stopListening = () => {
    if (recognition) {
      recognition.removeEventListener('result', handleSpeechResult);
      recognition.stop();
    }
    if (countdownInterval) {
      clearInterval(countdownInterval);
      setTimeLeft(15); // Clear the countdown interval if it exists
    }
    setIsListening(false);

    if (!analyzing) { // Check if analyzing is not already true
      setAnalyzing(true);
      // setTimeout(() => {
      //   setAnalyzing(false);
      // }, 5000);
    }
  }


  const handleSpeechResult = (event) => {
    // let interimTranscript = '';
    Array.from(event.results).forEach((result) => {
      const transcript = result[0].transcript.trim();
      if (result.isFinal) {
        setTranscripts(prevTranscripts => [...prevTranscripts, transcript]);
        // interimTranscript = '';
      } else {
        // interimTranscript += transcript;
      }
    });
  }

  useEffect(() => {
    console.log('Transcripts:', transcripts);
    logFiltersAndRepetitiveWords();
  }, [transcripts]);


  const logFiltersAndRepetitiveWords = () => {
    const words = transcripts.join(' ').toLowerCase().split(/\s+/);
    const wordCounts = {};
    const repetitive = [];
    const repetitiveCount = [];
    const sentences = [];
    const fillers = [
      "um", "uh", "like", "you know", "actually", "basically", "literally", "sort of", "kind of", "I mean", "well", "so", "yeah", "right", "okay", "alright", "hmm", "ah", "oh", "wow", "oh my god", "oh no", "oops", "uh-huh", "huh", "yeah", "yeap", "yep", "nope", "well", "let me think", "let's see", "I guess", "I suppose", "I think", "I believe", "I don't know", "I'm not sure", "maybe", "perhaps", "possibly", "probably", "hopefully", "actually", "seriously", "definitely", "absolutely", "totally", "certainly", "surely", "anyway", "anyways", "however", "though", "nevertheless", "moreover", "furthermore", "in addition", "by the way", "on the other hand", "as a matter of fact", "to be honest", "to tell you the truth", "in my opinion", "from my perspective", "personally", "according to me", "I feel like", "I mean"
    ];
    run(transcripts.join(' '));
  // .then(response => {
  //   // Extract incorrect sentences from the JSON response
  //   // const { data } = response;
  //   // data.edits.forEach(edit => {
  //   //   sentences.push(edit.sentence);
  //   // });
  //   console.log(response);
  // })
  // .catch(error => {
  //   console.error("Error:", error);
  // });

    const endTime = new Date().getTime();

    words.forEach(word => {
      if (!wordCounts[word]) {
        wordCounts[word] = 0;
      }
      wordCounts[word]++;
    });

    for (let word in wordCounts) {
      if (wordCounts[word] > 2) {
        repetitive.push(word);
        repetitiveCount.push(wordCounts[word]);
      }
    }
    

    const fillerWordsFound = words.filter(word => fillers.includes(word));
    const duration = 15000;
    const durationInMinutes = duration / (60 * 1000); // Convert duration from milliseconds to minutes
    const wpm = Math.round(words.length / durationInMinutes);

    setAnalysisData({
      repetitive: repetitive,
      fillers: fillerWordsFound,
      wpm: wpm,
      repeatCount: repetitiveCount
    })

    console.log('Transcripts:', transcripts.join(' '));
    console.log('Repetitive Words:', repetitive);
    console.log('Filler Words:', fillerWordsFound);
    console.log('Words per Minute (WPM):', wpm);
    console.log(duration)
  }

  useEffect(() => {
  // {
    const userPose = new mediapipePose.Pose({
      locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
    },
  });
  userPose.setOptions({
    maxNumFaces: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
  userPose.onResults(onResults);
  if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
        await userPose.send({ image: webcamRef.current.video });
        },
        width: 1280, 
        height: 720,
      });
      camera.start();
    }
  // }
  // const holistic = new Holistic({locateFile: (file) => {
  //   return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
  // }});
  // holistic.setOptions({
  //   modelComplexity: 1,
  //   smoothLandmarks: true,
  //   enableSegmentation: true,
  //   smoothSegmentation: true,
  //   refineFaceLandmarks: true,
  //   minDetectionConfidence: 0.5,
  //   minTrackingConfidence: 0.5
  // });
  // holistic.onResults(onResults);
  // if (
  //   typeof webcamRef.current !== "undefined" &&
  //   webcamRef.current !== null
  //   ) {
  // const camera = new cam.Camera(webcamRef.current.video, {
  //   onFrame: async () => {
  //     await holistic.send({image: webcamRef.current.video});
  //   },
  //   width: 1280,
  //   height: 720
  // });
  // camera.start();
  // }
  }, []);

    return (
    <div>
      <div className="App">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 10,
          }}
        >
          <div style={{ border: '1px solid white', boxSizing: 'border-box' }}></div>
          <div style={{ border: '1px solid white', boxSizing: 'border-box' }}></div>
          <div style={{ border: '1px solid white', boxSizing: 'border-box' }}></div>
          <div style={{ border: '1px solid white', boxSizing: 'border-box' }}></div>
          <div style={{ border: '1px solid white', boxSizing: 'border-box' }}></div>
          <div style={{ border: '1px solid white', boxSizing: 'border-box' }}></div>
          <div style={{ border: '1px solid white', boxSizing: 'border-box' }}></div>
          <div style={{ border: '1px solid white', boxSizing: 'border-box' }}></div>
          <div style={{ border: '1px solid white', boxSizing: 'border-box' }}></div>
        </div>
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
          }}
        ></canvas>
        <div className="landmark-grid-container"></div>
        <div 
          style={{ 
            position: 'absolute', 
            bottom: '20px', 
            left: '50%', 
            transform: 'translateX(-50%)',
            zIndex: 12,display:"flex",
            flexDirection:"column",
            gap:"20px" 
          }}
        >
        <div 
          style={{
            width:"100px",
            height:"30px",
            borderRadius:"20px",
            backgroundColor:"white",
            zIndex:"11",
            padding:"10px",
            color:"black",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          }}
        >
          <span style={{ fontSize: "20px" }}>{`00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`}</span>
        </div>
          <button
            style={{ fontSize: '24px', padding: '10px 20px', borderRadius: '50%',zIndex:"12" }}
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? '🎤' : '🔴'}
          </button>
        </div>      
      </div>
      {analyzing && (<StartAnalyse analysisData={analysisData}/>)}
    </div>
  ) 
};


export default UserPose;
