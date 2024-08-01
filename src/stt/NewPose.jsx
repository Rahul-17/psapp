import React, { useRef, useEffect, useState } from 'react';
import {
 PoseLandmarker,
 FilesetResolver,
 DrawingUtils,
} from "https://cdn.skypack.dev/@mediapipe/tasks-vision";
import Webcam from 'react-webcam';
import StartAnalyse from '../utility/StartAnalyse';
import createPoseLandmarker from '../model/poseLandmarker';
import CircularCounter from '../Screens/UIScreen/Circular';
import axios from "axios";

 const NewPoseTest = ({location}) => {
 const duration = location.state.duration;
 const recordingEnabled = location.state.recordingEnabled; //added by Rahul
 console.log(duration)
 console.log("RECORDING ENABLED", recordingEnabled, location.state); //added by Rahul
 // let poseLandmarker;
 let runningMode = "IMAGE";
 const minutes = Math.floor(duration / 60);
 const seconds = duration % 60;
 const [displayTime,setDisplayTime] = useState(`${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`);
 console.log(displayTime)
 const [webcamRunning,setWebcamRunning] = useState(true);
 const [transcripts, setTranscripts] = useState([]);
 const webcamRef = useRef(null);
 const canvasRef = useRef(null);
 const mediaRecorderRef = useRef(null);
 const videoRecorderRef = useRef(null);
 const socketRef = useRef(null);
 const [analyzing, setAnalyzing] = useState(false);
 const videoHeight = window.innerHeight;
 const videoWidth = window.innerWidth;
 const [startTime, setStartTime] = useState(null);
 const [stopTime, setStopTime] = useState(null);
 const [timeLeft,setTimeLeft] = useState(duration);
 const [countdownInterval, setCountdownInterval] = useState(null);
 const [timeDifference, setTimeDifference] = useState(null);
 const [isListening,setIsListening] = useState(false);
 const [videoChunks, setVideoChunks] = useState([]);
 const [recordedVideo, setRecordedVideo] = useState(null); //added by Rahul
 const [analysisData,setAnalysisData] = useState({
                                                   repetitive:[],
                                                   fillers:[],
                                                   wpm:0,
                                                   repeatCount:[],
                                                   fillerCounts:[],
                                                   centeredCount:0,
                                                   notCentered:0,
                                                   foldedArmCount:0,
                                                   inPocketCount:0,
                                                   armsOverheadCount:0,
                                                   claspCount:0,
                                                   personMoment:'',
                                                   transcript:'',
                                                   left:0,
                                                   right:0,
                                                   forward:0,
                                                   rightPose:0,
                                                   duration: duration,
                                                 })
 const sitting = useRef(0);
 const standing = useRef(0);
 const centered = useRef(0);
 const notCentered = useRef(0);
 const timerId = useRef(null);
 const foldedArmCount = useRef(0);
 const inPocketCount = useRef(0);
 const armsOverhead = useRef(0);
 const claspCount = useRef(0);  
 const leftCount = useRef(0);
 const rightCount = useRef(0);
 const forwardCount = useRef(0);
 const rightPoseCount = useRef(0);    
 const [poseLandmarker, setPoseLandmarker] = useState(null);
 
 useEffect(() => {
   const loadModel = async () => {
     console.log("Loading")
     const loadedPoseLandmarker = await createPoseLandmarker();
     setPoseLandmarker(loadedPoseLandmarker);
     console.log("Loaded")
   };
   loadModel();
 }, []);
 //added by Rahul
useEffect(() => {
  if(poseLandmarker) {
    if(!timerId.current){
   timerId.current = setTimeout(() => {
      handleWebcamClick();
    },1000);  
  }
  }
},[poseLandmarker]);
  const isPersonCentered = (x,y) => {
   return ((x >= 0.40 && x <= 0.61) && (y >= 0.44 && y <= 0.60));
 }

 const run = async (text) => {
   try {
     const response = await axios.post(
       'https://api.sapling.ai/api/v1/edits',
       {
         "key": 'A4YJV73IP1CASD8CNZB2BQ2FBU0UWIFG', // replace with your API key
         "session_id": 'test session',
         text,
       }
     );

     const { status, data } = response;
     const sentences = [];
     console.log({ status });
     data.edits.forEach(edit => {
         sentences.push(edit.sentence);
     });
     console.log(JSON.stringify(data, null, 4));
     // console.log(sentences)
   } catch (err) {
     const { msg } = err.response.data;
     console.log({ err: msg });
   }
 }

 function calculateAngle(pointA, pointB, pointC) {
   // Vector from pointB to pointA
   const vectorBA = {
       x: pointA.x - pointB.x,
       y: pointA.y - pointB.y
   };
   // Vector from pointB to pointC
   const vectorBC = {
       x: pointC.x - pointB.x,
       y: pointC.y - pointB.y
   };
   // Dot product of BA and BC
   const dotProduct = vectorBA.x * vectorBC.x + vectorBA.y * vectorBC.y;
   // Magnitudes of the vectors
   const magnitudeBA = Math.sqrt(vectorBA.x * vectorBA.x + vectorBA.y * vectorBA.y);
   const magnitudeBC = Math.sqrt(vectorBC.x * vectorBC.x + vectorBC.y * vectorBC.y);
   // Calculate the angle in radians
   const angleRadians = Math.acos(dotProduct / (magnitudeBA * magnitudeBC));
   // Convert the angle to degrees
   const angleDegrees = angleRadians * (180 / Math.PI);
   return angleDegrees;
}
    const startListening = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });//added by Rahul
    const videoStream = await navigator.mediaDevices.getUserMedia({video: true, audio:true}); //added by Rahul
    console.log({ stream });
    if (!MediaRecorder.isTypeSupported('audio/webm') && !MediaRecorder.isTypeSupported("video"))
       return alert('Browser not supported')
     // const mediaRecorder = new MediaRecorder(stream, {
     //  mimeType: 'audio/webm',
     // })
     //added by Rahul
     mediaRecorderRef.current = new MediaRecorder(stream, {
       mimeType: 'audio/webm',
     })
     videoRecorderRef.current = new MediaRecorder(videoStream, {
      mimeType:"video/webm; codecs=vp9"
     })
     console.log("Video Recorder created ", videoRecorderRef.current);
     
     //added by Rahul
     videoRecorderRef.current.start();
     videoRecorderRef.current.ondataavailable = (event) => {
      console.log("data available called")
     if(event.data.size > 0){
      console.log(event.data, event)
      setVideoChunks((prevChunk) => [...prevChunk, event.data]);
     }
     }

     console.log("videoChunks", videoChunks);
     console.log("MediaRecorder created", mediaRecorderRef.current);
     socketRef.current = new WebSocket('wss://api.deepgram.com/v1/listen?filler_words=true', [
       'token',
       'a1b9f5f424d116094b6ff4e8fc364aa42178db0f',
     ])
     console.log(socketRef.current)
     socketRef.current.onopen = () => {
       console.log("Connected")
       const currentTime = new Date();
       setStartTime(currentTime);
       console.log(startTime)
       setIsListening(true);
       setStopTime(null); // Resets stop time
       setTimeDifference(null);
       console.log({ event: 'onopen' })
       mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
         if (event.data.size > 0 && socketRef.current.readyState == 1) {
           socketRef.current.send(event.data)
           console.log(event.data)
         }
       })
       mediaRecorderRef.current.start(1000)
       setTranscripts([])
       if(analyzing){
         setAnalyzing(false)
       }
     }
     socketRef.current.onmessage = (message) => {
       // console.log(`Message is ${message}`)
       const received = JSON.parse(message.data)
       // console.log(received);
       const transcript = received.channel.alternatives[0].transcript
       if (transcript && received.is_final) {
         console.log(transcript)
         setTranscripts(prevTranscripts => [...prevTranscripts, transcript]);
       }
     }
     // socketRef.current.onmessage = (message) => {
     //  const received = JSON.parse(message.data);
     //  const { transcript, is_final } = received.channel.alternatives[0];
     //  if (transcript) {
     //    if (is_final) {
     //      console.log(transcript);
     //      setTranscripts((prevTranscripts) => [...prevTranscripts, transcript]);
     //    } else {
     //      // Handle intermediate transcripts
     //      setTranscripts((prevTranscripts) => {
     //        const lastTranscript = prevTranscripts[prevTranscripts.length - 1];
     //        if (lastTranscript) {
     //          const updatedTranscript = lastTranscript + transcript;
     //          return [...prevTranscripts.slice(0, -1), updatedTranscript];
     //        } else {
     //          return [transcript];
     //        }
     //      });
     //    }
     //  }
     // };

     const interval = setInterval(() => {
       setTimeLeft(prevTime => {
         if (prevTime > 0) {
           const minutes = Math.floor(prevTime / 60);
           const seconds = prevTime % 60;
           setDisplayTime(`${minutes} : ${seconds.toString().padStart(2, '0')}`);
           return prevTime - 1;
         } else {
           clearInterval(interval);
           // setTimeout(() => {
           //  stopListening();
           // },2000) // Stop the timer if timeLeft is 0 or less
           stopListening()
           setWebcamRunning(true)
           setDisplayTime('00 : 00');
           return 0; // Return 0 to prevent going into negative numbers
         }
       });
     }, 1000);
     setCountdownInterval(interval);
     //   if(isListening){
     //    setTimeout(() => {         
     //    console.log("Stopped")
     //    setWebcamRunning(true)
     //    stopListening();
     //  }, duration * 1000);
     // }
     socketRef.current.onclose = () => {
       console.log({ event: 'onclose' })
     }
     socketRef.current.onerror = (error) => {
       console.log({ event: 'onerror', error })
     }
  }
useEffect(() => {
  //added by Rahul
  const videoBlob = new Blob(videoChunks, {type: "video/webm"});
  console.log("Video Size", videoBlob.size)
  const videoURL = URL.createObjectURL(videoBlob);
  console.log("Video URL", videoURL);
  setRecordedVideo(videoURL); 
},[videoChunks]);
  const stopListening = () => {
   // setTimeout(() => {
     if (mediaRecorderRef.current) {
       mediaRecorderRef.current.stop();
       mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
       console.log("Mediarecorder stopped")
     }
     //added by Rahul
     if(videoRecorderRef.current){
      videoRecorderRef.current.stop();
      console.log("video recorder stopped");
      videoRecorderRef.current.addEventListener("stop", (event) => {
        console.log(videoChunks.length, videoChunks)
        const videoBlob = new Blob(videoChunks, {type: "video/webm"});
        console.log("Video Size", videoBlob.size)
        const videoURL = URL.createObjectURL(videoBlob);
        console.log("Video URL", videoURL);
        setRecordedVideo(videoURL); 
      })
     }

     const handleStop = () => {
       if (socketRef.current) {
         socketRef.current.close();
         console.log("Socket closed")
       }
       if (countdownInterval) {
         clearInterval(countdownInterval);
         // Clear the countdown interval if it exists
       }
       setTimeLeft(duration);
       const currentTime = new Date();
       setStopTime(currentTime);
       console.log(stopTime)
       console.log("Stopped listening");
       if(!analyzing){
             setAnalyzing(true)
       }
       setIsListening(false);
     }
     mediaRecorderRef.current.addEventListener('stop', handleStop, { once: true });
   // },1250)
   // if (mediaRecorderRef.current) {
   //  mediaRecorderRef.current.stop();
   //  mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
   //  console.log("Mediarecorder stopped")
   // }
   // const handleStop = () => {
   //  if (socketRef.current) {
   //    socketRef.current.close();
   //    console.log("Socket closed")
   //  }
   //  if (countdownInterval) {
   //    clearInterval(countdownInterval);
   //    // Clear the countdown interval if it exists
   //  }
   //  setTimeLeft(duration);
   //  const currentTime = new Date();
   //  setStopTime(currentTime);
   //  console.log(stopTime)
   //  console.log("Stopped listening");
   //  if(!analyzing){
   //        setAnalyzing(true)
   //  }
   //  setIsListening(false);
   // }
   // mediaRecorderRef.current.addEventListener('stop', handleStop, { once: true });
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
   const fillers = [
     "um", "uh", "like", "you know", "actually", "basically", "literally", "sort of", "kind of", "I mean", "well", "so", "yeah", "right", "okay", "alright", "hmm", "ah", "oh", "wow", "oh my god", "oh no", "oops", "uh-huh", "huh", "yeah", "yeap", "yep", "nope", "well", "let me think", "let's see", "I guess", "I suppose", "I think", "I believe", "I don't know", "I'm not sure", "maybe", "perhaps", "possibly", "probably", "hopefully", "actually", "seriously", "definitely", "absolutely", "totally", "certainly", "surely", "anyway", "anyways", "however", "though", "nevertheless", "moreover", "furthermore", "in addition", "by the way", "on the other hand", "as a matter of fact", "to be honest", "to tell you the truth", "in my opinion", "from my perspective", "personally", "according to me", "I feel like", "I mean"
   ];
   const fillerCounts = fillers.map(filler => ({ filler, count: 0 }));
   run(transcripts.join(' '));
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
   words.forEach(word => {
     const fillerIndex = fillerCounts.findIndex(f => f.filler === word);
     if (fillerIndex !== -1) {
         fillerCounts[fillerIndex].count++;
     }
 });

   const fillerWordsFound = words.filter(word => fillers.includes(word));
   const durationInSeconds = duration * 1000;
   const durationInMinutes = durationInSeconds / (60 * 1000); // Convert duration from milliseconds to minutes
   const wpm = Math.round(words.length / durationInMinutes);
   // const actualSpeakingTimeInSeconds = (stopTime - startTime) / 1000;
   // const actualSpeakingTimeInMinutes = actualSpeakingTimeInSeconds / 60;
   // const wpm = actualSpeakingTimeInMinutes > 0 ? Math.round(words.length / actualSpeakingTimeInMinutes) : 0;
   setAnalysisData({
     repetitive: repetitive,
     fillers: fillerCounts.filter(f => f.count > 0).map(f => f.filler),
     wpm: wpm,
     repeatCount: repetitiveCount,
     fillerCounts: fillerCounts.filter(f => f.count > 0).map(f => f.count),
     centeredCount: centered.current,
     notCentered: notCentered.current,
     personMoment: sitting.current > standing.current ? 'Sitting' : 'Standing',
     foldedArmCount: foldedArmCount.current,
     armsOverheadCount: armsOverhead.current,
     inPocketCount: inPocketCount.current,
     claspCount: claspCount.current,
     transcript: transcripts.join(' '),
     left: leftCount.current,
     right: rightCount.current,
     forward: forwardCount.current,
     rightPose: rightPoseCount.current,
     duration: duration
 });
   console.log('Transcripts:', transcripts.join(' '));
   console.log('Repetitive Words:', repetitive);
   console.log('Filler Words:', fillerWordsFound);
   console.log('Words per Minute (WPM):', wpm);
 }
 //added by Rahul
 const handleGetUserMedia = () => {
   return !!navigator.mediaDevices?.getUserMedia;
  };

 const handleWebcamClick = () => {
  console.log("WEBCAM CLICK CALLED");
   if (handleGetUserMedia()) {
    console.log("WEBCAM GETUSER MEDIA")
     enableCam();
   } else {
     console.warn("getUserMedia() is not supported by your browser");
   }
 };
 // const cleanup = () => {
 //  if (webcamRef.current && webcamRef.current.video) {
 //    const stream = webcamRef.current.video.srcObject;
 //    if (stream) {
 //      stream.getTracks().forEach((track) => track.stop());
 //    }
 //  }
 // };
 const enableCam = () => {
   const videoElement = webcamRef.current.video; // Accessing the video element
   if (!poseLandmarker) {
     console.log("Wait! poseLandmarker not loaded yet.");
     return;
   }
   if (webcamRunning === true) {
     setWebcamRunning(false)
     startListening()
   } else {
     console.log("Webcam set to false")
     setWebcamRunning(true)
     // setTimeout(() => {
     //  stopListening()
     // },2000)  
     stopListening()
     // cleanup();
   }
   const constraints = {
     video: true
   };
   navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
     videoElement.srcObject = stream;
     videoElement.addEventListener("loadeddata", predictWebcam);
   });
   // if(webcamRunning){
   //  startListening();
   // }
 };
 let lastVideoTime = -1;
 const predictWebcam = async () => {
   console.log("predictWebcam called")
     if (!webcamRunning) {
   return; // Exit if webcam is not running
 }
   const videoElement = webcamRef.current.video; // Accessing the video element
   const canvasElement = canvasRef.current;
   const canvasCtx = canvasElement.getContext("2d");
   const drawingUtils = new DrawingUtils(canvasCtx);
   canvasElement.style.height = videoHeight;
   videoElement.style.height = videoHeight;
   canvasElement.style.width = videoWidth;
   videoElement.style.width = videoWidth;
   if (runningMode === "IMAGE") {
     runningMode = "VIDEO";
     await poseLandmarker.setOptions({ runningMode: "VIDEO" });
   }
   const startTimeMs = performance.now();
   if (lastVideoTime !== videoElement.currentTime) {
     lastVideoTime = videoElement.currentTime;
     poseLandmarker.detectForVideo(videoElement, startTimeMs, (result) => {
       canvasCtx.save();
       canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
       // for (const landmark of result.landmarks) {
       //  drawingUtils.drawLandmarks(landmark, {
       //    color: 'red',
       //    radius: 0.25
       //  });
       //  drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS, {
       //    color: '#3240CF',
       //    lineWidth: 1
       //  });
       // }
       canvasCtx.restore();
     });
   }
   const container = poseLandmarker.landmarks;
   // console.log(container)
   if(container[0]){
     const nose = container[0][0];
     const leftEye = container[0][2];
     const rightEye = container[0][5];
     const leftShoulder = container[0][11];
     const rightShoulder = container[0][12];
     const leftElbow = container[0][13];
     const rightElbow = container[0][14];
     const leftWrist = container[0][15];
     const rightWrist = container[0][16]; 
     const leftHip = container[0][23];
     const rightHip = container[0][24];
     const leftKnee = container[0][25];
     const rightKnee = container[0][26];
     const leftPinky = container[0][17];
     const rightPinky = container[0][18];
     const leftIndex = container[0][19];
     const rightIndex = container[0][20];
     const eyesCenterX = (leftEye.x + rightEye.x) / 2;
     const eyesCenterY = (leftEye.y + rightEye.y) / 2;
     const horizontalDistance = nose.x - eyesCenterX;
     const threshold = 0.02;
     if (horizontalDistance > threshold) {
       leftCount.current += 1;
     } else if (horizontalDistance < -threshold) {
       rightCount.current += 1;
     } else {
       forwardCount.current += 1;
     }
     const rangeForClasp = Math.abs(Math.abs(leftIndex.x - rightIndex.x))
     // console.log(rangeForClasp)
     if(leftPinky.visibility > 0.9 && rightPinky.visibility > 0.9){
       if(rangeForClasp >= 0.03 && rangeForClasp <= 0.08){
         claspCount.current += 1;
       }
     }
     if(leftHip.visibility < 0.5 && rightHip.visibility < 0.5){
       sitting.current += 1;
     }
     else{
       standing.current += 1;
     }
     const isCentered = isPersonCentered(nose.x,nose.y)
     if(isCentered){
       // setCentered(prevCentered => prevCentered + 1);
       // console.log(centered)
       centered.current += 1;
     }
     else{
       // setNotCentered(prevNotCentered => prevNotCentered + 1);
       // console.log(notCentered)
       notCentered.current += 1;
     }
     // console.log(leftIndex.visibility)
     const overHeadLeftAngle = calculateAngle(leftShoulder,rightShoulder,rightElbow)
     const overHeadRightAngle = calculateAngle(rightShoulder,leftShoulder,leftElbow)
     const inPocketLeftAngle = calculateAngle(leftShoulder,leftElbow,leftWrist)
     const inPocketRightAngle = calculateAngle(rightShoulder,rightElbow,rightWrist);
     const foldedArmsLeftAngle = calculateAngle(leftShoulder,leftElbow,leftWrist)
     const foldedArmsRightAngle = calculateAngle(rightShoulder,rightElbow,rightWrist)
     let wrongPose = false;
     if(leftPinky.y <= 0.48 && ((overHeadLeftAngle >= 128 && overHeadLeftAngle <= 174) || (overHeadRightAngle >= 128 && overHeadRightAngle >= 174))){
       armsOverhead.current += 1;
       wrongPose = true;
       // console.log("Overhead")
     }
     if(leftPinky.y >= 0.55 && leftWrist.y <= 0.77 && ((foldedArmsLeftAngle >= 15 && foldedArmsLeftAngle <= 91) || (foldedArmsRightAngle >= 15 && foldedArmsRightAngle <= 91))){
       foldedArmCount.current += 1
       wrongPose = true;
       // console.log("Arms folded")
     }
     // if(leftIndex.visibility <= 0.78){
       if(leftIndex.y >= 0.70 && inPocketLeftAngle >= 145 && inPocketLeftAngle <= 180){
         inPocketCount.current += 1;
         wrongPose = true;
         // console.log("In Pocket")
       // }
     }
     // if(rightIndex.visibility <= 0.78){
       if(rightIndex.y >= 0.70 && inPocketRightAngle >= 145 && inPocketRightAngle <= 180){
         inPocketCount.current += 1;
         wrongPose = true;
         // console.log("In Pocket")
       }
     // }
     if(!wrongPose)rightPoseCount.current += 1;
   }
   if (webcamRunning === true) {
     window.requestAnimationFrame(predictWebcam);
   }
 };

 return (
    <div style={{width:"100%",height:"100%"}}>
    <div style={{ width: "100%", height: "100%" }}>
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
          zIndex: 12,
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
          objectFit: "cover",
          zIndex:'11'
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
          objectFit: "cover",
          zIndex:'11'
        }}
      ></canvas>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "20px",
        bottom:"20px",
        zIndex:'13'
      }}
    >
      <div
        style={{
          width:"100px",
          height:"30px",
          borderRadius:"20px",
          backgroundColor:"white",
          zIndex:"13",
          padding:"10px",
          color:"black",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          marginBottom:"10px"
        }}
      >
        {/* <span style={{ fontSize: "20px" }}>{`00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`}</span> */}
        <span style={{ fontSize: "20px" }}>{displayTime}</span>
      </div>
      {/* <span style={{ fontSize: "20px" }}>{`00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`}</span> */}
      <button
        style={{
          textAlign: "center",
          color: "white",
          backgroundColor:"#00736E",
          zIndex:'13',
          padding:"10px",
          borderRadius:"10%"
        }}
        disabled={!!poseLandmarker} //added by Rahul
        onClick={handleWebcamClick}
      >
        {webcamRunning ? 'Start' : 'Stop'}
      </button>
    </div>
     
    {analyzing && (<StartAnalyse analysisData={analysisData} videoURL={recordedVideo} recordingEnabled={recordingEnabled} />)}
  </div>
  
);

};
export default NewPoseTest;