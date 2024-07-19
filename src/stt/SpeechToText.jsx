// import React from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import 'regenerator-runtime/runtime.js';


// const Dictaphone = () => {
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   return (
//     <div>
//       <p>Microphone: {listening ? 'on' : 'off'}</p>
//       <button onClick={SpeechRecognition.startListening}>Start</button>
//       <button onClick={SpeechRecognition.stopListening}>Stop</button>
//       <button onClick={resetTranscript}>Reset</button>
//       <p>{transcript}</p>
//     </div>
//   );
// };
// export default Dictaphone;
// import React, { useEffect, useState, useRef } from 'react';

// import {
//   PoseLandmarker,
//   FilesetResolver,
//   DrawingUtils,
//   FaceDetector
// } from "https://cdn.skypack.dev/@mediapipe/tasks-vision@0.10.0";

// function Pose() {
//   const [poseLandmarker, setPoseLandmarker] = useState(null);
//   const [runningMode, setRunningMode] = useState("IMAGE");
//   const [webcamRunning, setWebcamRunning] = useState(false);
//   const videoHeight = "360px";
//   const videoWidth = "480px";
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

//   useEffect(() => {
//     const createPoseLandmarker = async () => {
//       const vision = await FilesetResolver.forVisionTasks(
//         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
//       );
//       const landmarker = await PoseLandmarker.createFromOptions(vision, {
//         baseOptions: {
//           modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
//           delegate: "GPU"
//         },
//         runningMode: runningMode,
//         numPoses: 2
//       });
//       setPoseLandmarker(landmarker);
//     };
//     createPoseLandmarker();
//   }, [runningMode]);

//   let enableWebcamButton;

//   if (hasGetUserMedia()) {
//     enableWebcamButton = document.getElementById("webcamButton");
//     enableWebcamButton.addEventListener("click", enableCam);
//   } else {
//     console.warn("getUserMedia() is not supported by your browser");
//   }

//   const enableCam = () => {
//     if (!poseLandmarker) {
//       console.log("Wait! poseLandmarker not loaded yet.");
//       return;
//     }

//     setWebcamRunning(!webcamRunning);
//     const enableWebcamButton = document.getElementById("webcamButton");
//     enableWebcamButton.innerText = webcamRunning ? "ENABLE PREDICTIONS" : "DISABLE PREDICTIONS";

//     if (webcamRunning) {
//       // getUsermedia parameters.
//       const constraints = { video: true };

//       // Activate the webcam stream.
//       navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
//         videoRef.current.srcObject = stream;
//         videoRef.current.addEventListener("loadeddata", predictWebcam);
//       });
//     } else {
//       clearInterval(poseDetectionInterval);
//     }
//   };

//   const predictWebcam = async () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;
//     const canvasCtx = canvas.getContext("2d");
//     canvas.style.height = videoHeight;
//     video.style.height = videoHeight;
//     canvas.style.width = videoWidth;
//     video.style.width = videoWidth;

//     if (runningMode === "IMAGE") {
//       setRunningMode("VIDEO");
//       await poseLandmarker.setOptions({ runningMode: "VIDEO" });
//     }

//     let lastVideoTime = -1;
//     let startTimeMs = performance.now();

//     if (lastVideoTime !== video.currentTime) {
//       lastVideoTime = video.currentTime;
//       poseLandmarker.detectForVideo(video, startTimeMs, (result) => {
//         canvasCtx.save();
//         canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
//         // Your drawing code here using result.landmarks
//         canvasCtx.restore();
//       });
//     }

//     console.log(poseLandmarker.result);

//     if (poseLandmarker.result.landmarks.length === 0) {
//       alert("User not in frame!");
//     }

//     if (webcamRunning) {
//       window.requestAnimationFrame(predictWebcam);
//     }
//   };

//   return (
//     <div id="liveView" class="videoView">
//     <button id="webcamButton" class="mdc-button mdc-button--raised">
//       <span class="mdc-button__ripple"></span>
//       <span class="mdc-button__label">ENABLE WEBCAM</span>
//     </button>
//     <div style="position: relative;">
//       <video id="webcam" style="width: 480px; height: 360px; position: absolute;" autoplay playsinline></video>
//       <canvas class="output_canvas" id="output_canvas" width="480" height="360" style="position: absolute; left: 0; top: 0;"></canvas>
//     </div>
//   </div>
//   );
// }

// export default Pose;
// import React, { useState, useEffect } from 'react';
// import {
//   PoseLandmarker,
//   FilesetResolver,
//   DrawingUtils,
// } from "https://cdn.skypack.dev/@mediapipe/tasks-vision@0.10.0";

// function Pose() {
//   const [poseLandmarker, setPoseLandmarker] = useState(null);
//   const [webcamRunning, setWebcamRunning] = useState(false);
//   const videoHeight = "360px";
//   const videoWidth = "480px";

//   useEffect(() => {
//     const initializePoseLandmarker = async () => {
//       const vision = await FilesetResolver.forVisionTasks(
//         'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
//       );
//       const landmark = await PoseLandmarker.createFromOptions(vision, {
//         baseOptions: {
//           modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
//           delegate: 'GPU',
//         },
//         runningMode: 'VIDEO',
//         numPoses: 2,
//       });
//       setPoseLandmarker(landmark);
//     };

//     initializePoseLandmarker();
//   }, []);

//   const enableCam = () => {
//     if (!poseLandmarker) {
//       console.log("Wait! poseLandmarker not loaded yet.");
//       return;
//     }

//     setWebcamRunning(!webcamRunning);
//     const enableWebcamButton = document.getElementById("webcamButton");
//     enableWebcamButton.innerText = webcamRunning ? "ENABLE PREDICTIONS" : "DISABLE PREDICTIONS";

//     const constraints = {
//       video: true
//     };

//     if (webcamRunning) {
//       navigator.mediaDevices.getUserMedia(constraints)
//         .then((stream) => {
//           const video = document.getElementById("webcam");
//           video.srcObject = stream;
//           video.addEventListener("loadeddata", predictWebcam);
//         })
//         .catch((err) => {
//           console.error('Error accessing webcam:', err);
//         });
//     } else {
//       const video = document.getElementById("webcam");
//       video.srcObject.getTracks().forEach(track => track.stop());
//     }
//   };

//   const predictWebcam = () => {
//     const video = document.getElementById("webcam");
//     const canvasElement = document.getElementById("output_canvas");
//     const canvasCtx = canvasElement.getContext("2d");
//     canvasElement.style.height = videoHeight;
//     video.style.height = videoHeight;
//     canvasElement.style.width = videoWidth;
//     video.style.width = videoWidth;

//     if (poseLandmarker && poseLandmarker.result) {
//       canvasCtx.save();
//       canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//       // Your drawing logic here
//       canvasCtx.restore();
      
//       if (poseLandmarker.result.landmarks.length === 0) {
//         alert("User not in frame!");
//       }
//     }

//     if (webcamRunning) {
//       window.requestAnimationFrame(predictWebcam);
//     }
//   };

//   return (
//     <div id="liveView" className="videoView">
//       <button id="webcamButton" className="mdc-button mdc-button--raised" onClick={enableCam}>
//         <span className="mdc-button__ripple"></span>
//         <span className="mdc-button__label">{webcamRunning ? 'DISABLE PREDICTIONS' : 'ENABLE PREDICTIONS'}</span>
//       </button>
//       <div style={{ position: 'relative' }}>
//         <video id="webcam" style={{ width: videoWidth, height: videoHeight, position: 'absolute' }} autoPlay playsInline></video>
//         <canvas className="output_canvas" id="output_canvas" width={videoWidth} height={videoHeight} style={{ position: 'absolute', left: 0, top: 0 }}></canvas>
//       </div>
//     </div>
//   );
// }

// export default Pose;

// import React, { useState } from 'react';
// import {
//   PoseLandmarker,
//   FilesetResolver,
//   DrawingUtils,
// } from "https://cdn.skypack.dev/@mediapipe/tasks-vision@0.10.0";


// function PoseEstimationComponent() {
//   let poseLandmarker;
//   const [webcamRunning, setWebcamRunning] = useState(false);
//   const [videoHeight] = useState("720px");
//   const [videoWidth] = useState("1280px");
//   const [webcamButton, setWebcamButton] = useState(null);
//   let enableWebcamButton;


//   const createPoseLandmarker = async () => {
//     const vision = await FilesetResolver.forVisionTasks(
//       "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
//     );
//     poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
//       baseOptions: {
//         modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
//         delegate: "GPU"
//       },
//       runningMode: "VIDEO",
//       numPoses: 2
//     });

//     console.log(poseLandmarker)

//   };

//   createPoseLandmarker();



//   const enableCam = () => {
//     const video = document.getElementById("webcam");
//     if (!poseLandmarker) {
//       console.log("Wait! poseLandmaker not loaded yet.");
//       return;
//     }

//     setWebcamRunning(!webcamRunning);

//     // getUsermedia parameters.
//     const constraints = {
//       video: true
//     };

//     // Activate the webcam stream.
//     navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
//         video.srcObject = stream;
//         video.addEventListener("loadeddata", () => {
//           predictWebcam(); // Call predictWebcam after the webcam stream is loaded
//         });
//       });
//   };

//   const predictWebcam = async () => {
//     const video = document.getElementById("webcam");
//     const canvasElement = document.getElementById("output_canvas");
//     const canvasCtx = canvasElement.getContext("2d");
//     const drawingUtils = new DrawingUtils(canvasCtx);

//     canvasElement.style.height = videoHeight;
//     video.style.height = videoHeight;
//     canvasElement.style.width = videoWidth;
//     video.style.width = videoWidth;

//     const runningMode = "VIDEO";

//     if (!poseLandmarker) {
//       console.log("Pose Landmarker not initialized.");
//       return;
//     }

//     if (runningMode === "IMAGE") {
//       console.log("Running mode is not supported.");
//       return;
//     }

//     let lastVideoTime = -1;
//     let startTimeMs = performance.now();

//     if (lastVideoTime !== video.currentTime) {
//       lastVideoTime = video.currentTime;
//       poseLandmarker.detectForVideo(video, startTimeMs, (result) => {
//         canvasCtx.save();
//         canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//         // Code for drawing landmarks and connectors
//         canvasCtx.restore();
//       });
//     }

//     console.log(poseLandmarker.result);

//     if (poseLandmarker.result.landmarks.length === 0) {
//       alert("User not in frame!");
//     }

//     if (webcamRunning === true) {
//       window.requestAnimationFrame(predictWebcam);
//     }
//   };



//   return (
//     <div>
//       <div>
//         <button onClick={enableCam}>
//           {webcamRunning ? "Disable Predictions" : "Enable Predictions"}
//         </button>
//       </div>
//       <div style={{ position: 'relative' }}>
//         <video id="webcam" style={{  position: "absolute",
//           left: 0,
//           right: 0,
//           width: "100%",
//           height: "100%",}} autoPlay playsInline></video>
//         <canvas id="output_canvas" style={{  position: "absolute",
//           left: 0,
//           right: 0,
//           width: "100%",
//           height: "100%",}}></canvas>
//       </div>
//     </div>
//   );
// }

// export default PoseEstimationComponent;
// import React, { useState, useEffect } from 'react';
// import {
//   FaceDetector,
//   FilesetResolver,
// } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";

// function WebcamFaceDetector() {
//   const [faceDetector, setFaceDetector] = useState(null);
//   const [videoStream, setVideoStream] = useState(null);
//   const [runningMode, setRunningMode] = useState("IMAGE");

//   useEffect(() => {
//     const initializefaceDetector = async () => {
//       const vision = await FilesetResolver.forVisionTasks(
//         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
//       );
//       const detector = await FaceDetector.createFromOptions(vision, {
//         baseOptions: {
//           modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
//           delegate: "GPU"
//         },
//         runningMode: runningMode
//       });
//       setFaceDetector(detector);
//     };
//     initializefaceDetector();
//   }, []);

//   const enableCam = () => {
//     if (!faceDetector) {
//       alert("Face Detector is still loading. Please try again..");
//       return;
//     }
//     const constraints = {
//       video: true
//     };
//     navigator.mediaDevices.getUserMedia(constraints)
//       .then(stream => {
//         setVideoStream(stream);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   useEffect(() => {
//     if (!faceDetector || !videoStream) return;

//     const video = document.getElementById("webcam");

//     const predictWebcam = async () => {
//       if (runningMode === "IMAGE") {
//         setRunningMode("VIDEO");
//         await faceDetector.setOptions({ runningMode: "VIDEO" });
//       }
//       let startTimeMs = performance.now();

//       if (video.currentTime !== lastVideoTime) {
//         lastVideoTime = video.currentTime;
//         const detections = faceDetector.detectForVideo(video, startTimeMs).detections;
//         displayVideoDetections(detections);
//       }
//       window.requestAnimationFrame(predictWebcam);
//     };

//     video.srcObject = videoStream;
//     video.addEventListener("loadeddata", predictWebcam);

//     return () => {
//       video.removeEventListener("loadeddata", predictWebcam);
//     };
//   }, [faceDetector, videoStream, runningMode]);

//   let lastVideoTime = -1;

//   const displayVideoDetections = (detections) => {
//     // Your display logic here
//   };

//   return (
//     <div>
//       <button id="webcamButton" onClick={enableCam}>Enable Webcam</button>
//       <video id="webcam" autoPlay></video>
//       <div id="liveView"></div>
//     </div>
//   );
// }

// export default WebcamFaceDetector;


// import React, { useEffect, useRef, useState } from 'react';
// import {
//   FaceDetector,
//   FilesetResolver,
// } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3';

// const FaceDetectionComponent = () => {
//   const [faceDetector, setFaceDetector] = useState(null);
//   const [runningMode, setRunningMode] = useState('IMAGE');
//   const videoRef = useRef(null);
//   const liveViewRef = useRef(null);
//   const children = useRef([]);

//   useEffect(() => {
//     const initializeFaceDetector = async () => {
//       const vision = await FilesetResolver.forVisionTasks(
//         'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
//       );
//       const detector = await FaceDetector.createFromOptions(vision, {
//         baseOptions: {
//           modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
//           delegate: 'GPU',
//         },
//         runningMode,
//       });
//       setFaceDetector(detector);
//     };
//     console.log(faceDetector);

//     initializeFaceDetector();
//   }, [runningMode]);

//   useEffect(() => {
//     const enableCam = async () => {
//       if (!faceDetector) {
//         alert('Face Detector is still loading. Please try again..');
//         return;
//       }

//       const constraints = {
//         video: true,
//       };

//       navigator.mediaDevices
//         .getUserMedia(constraints)
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//           videoRef.current.addEventListener('loadeddata', predictWebcam);
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     };

//     const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

//     if (hasGetUserMedia()) {
//       enableCam();
//     } else {
//       console.warn('getUserMedia() is not supported by your browser');
//     }
//   }, [faceDetector]);

//   const predictWebcam = async () => {
//     if (runningMode === 'IMAGE') {
//       setRunningMode('VIDEO');
//       await faceDetector.setOptions({ runningMode: 'VIDEO' });
//     }
//     const startTimeMs = performance.now();

//     if (videoRef.current.currentTime !== videoRef.current.lastVideoTime) {
//       videoRef.current.lastVideoTime = videoRef.current.currentTime;
//       const detections = faceDetector.detectForVideo(
//         videoRef.current,
//         startTimeMs
//       ).detections;
//       displayVideoDetections(detections);
//     }

//     window.requestAnimationFrame(predictWebcam);
//   };

//   const displayVideoDetections = (detections) => {
//     for (let child of children.current) {
//       liveViewRef.current.removeChild(child);
//     }
//     children.current.splice(0);

//     for (let detection of detections) {
//       const p = document.createElement('p');
//       p.innerText =
//         'Confidence: ' +
//         Math.round(parseFloat(detection.categories[0].score) * 100) +
//         '% .';
//       p.style =
//         'left: ' +
//         (videoRef.current.offsetWidth -
//           detection.boundingBox.width -
//           detection.boundingBox.originX) +
//         'px;' +
//         'top: ' +
//         (detection.boundingBox.originY - 30) +
//         'px; ' +
//         'width: ' +
//         (detection.boundingBox.width - 10) +
//         'px;';

//       const highlighter = document.createElement('div');
//       highlighter.setAttribute('class', 'highlighter');
//       highlighter.style =
//         'left: ' +
//         (videoRef.current.offsetWidth -
//           detection.boundingBox.width -
//           detection.boundingBox.originX) +
//         'px;' +
//         'top: ' +
//         detection.boundingBox.originY +
//         'px;' +
//         'width: ' +
//         (detection.boundingBox.width - 10) +
//         'px;' +
//         'height: ' +
//         detection.boundingBox.height +
//         'px;';

//       liveViewRef.current.appendChild(highlighter);
//       liveViewRef.current.appendChild(p);

//       children.current.push(highlighter);
//       children.current.push(p);
//       for (let keypoint of detection.keypoints) {
//         const keypointEl = document.createElement('spam');
//         keypointEl.className = 'key-point';
//         keypointEl.style.top = `${keypoint.y * videoRef.current.offsetHeight - 3}px`;
//         keypointEl.style.left = `${
//           videoRef.current.offsetWidth - keypoint.x * videoRef.current.offsetWidth - 3
//         }px`;
//         liveViewRef.current.appendChild(keypointEl);
//         children.current.push(keypointEl);
//       }
//     }
//   };

//   return (
//     <div>
//       <video ref={videoRef} id="webcam" autoPlay />
//       <div ref={liveViewRef} id="liveView" />
//     </div>
//   );
// };

// export default FaceDetectionComponent;
// import React, { useState } from 'react';
// import {
//   PoseLandmarker,
//   FilesetResolver,
//   DrawingUtils,
// } from "https://cdn.skypack.dev/@mediapipe/tasks-vision@0.10.0";


// function PoseEstimationComponent() {
//   let poseLandmarker;
//   const [webcamRunning, setWebcamRunning] = useState(false);
//   const [videoHeight] = useState("720px");
//   const [videoWidth] = useState("1280px");
//   const [webcamButton, setWebcamButton] = useState(null);
//   let enableWebcamButton;
//   console.log(window.Pose)

//   const createPoseLandmarker = async () => {
//     const vision = await FilesetResolver.forVisionTasks(
//       "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
//     );
//     poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
//       baseOptions: {
//         modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
//         delegate: "GPU"
//       },
//       runningMode: "VIDEO",
//       numPoses: 2
//     });

//     console.log(poseLandmarker)

//   };

//   createPoseLandmarker();



//   const enableCam = () => {
//     const video = document.getElementById("webcam");
//     if (!poseLandmarker) {
//       console.log("Wait! poseLandmaker not loaded yet.");
//       return;
//     }

//     setWebcamRunning(!webcamRunning);

//     // getUsermedia parameters.
//     const constraints = {
//       video: true
//     };

//     // Activate the webcam stream.
//     navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
//         video.srcObject = stream;
//         video.addEventListener("loadeddata", () => {
//           predictWebcam(); // Call predictWebcam after the webcam stream is loaded
//         });
//       });
//   };

//   const predictWebcam = async () => {
//     const video = document.getElementById("webcam");
//     const canvasElement = document.getElementById("output_canvas");
//     const canvasCtx = canvasElement.getContext("2d");
//     const drawingUtils = new DrawingUtils(canvasCtx);

//     canvasElement.style.height = videoHeight;
//     video.style.height = videoHeight;
//     canvasElement.style.width = videoWidth;
//     video.style.width = videoWidth;

//     const runningMode = "VIDEO";

//     if (!poseLandmarker) {
//       console.log("Pose Landmarker not initialized.");
//       return;
//     }

//     if (runningMode === "IMAGE") {
//       console.log("Running mode is not supported.");
//       return;
//     }

//     let lastVideoTime = -1;
//     let startTimeMs = performance.now();

//     if (lastVideoTime !== video.currentTime) {
//       lastVideoTime = video.currentTime;
//       poseLandmarker.detectForVideo(video, startTimeMs, (result) => {
//         canvasCtx.save();
//         canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//         // Code for drawing landmarks and connectors
//         for (const landmark of result.landmarks) {
//           drawingUtils.drawLandmarks(landmark, {
//             radius: (data) => DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1)
//           });
//           drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
//         }
//         canvasCtx.restore();
//       });
//     }

//     console.log(poseLandmarker.result);

//     if (poseLandmarker.result.landmarks.length === 0) {
//       alert("User not in frame!");
//     }

//     if (webcamRunning === true) {
//       window.requestAnimationFrame(predictWebcam);
//     }
//   };



//   return (
//     <div>
//       <div>
//         <button onClick={enableCam}>
//           {webcamRunning ? "Enable Predictions" : "Disable Predictions"}
//         </button>
//       </div>
//       <div style={{ position: 'relative' }}>
//         <video id="webcam" style={{  position: "absolute",
//           left: 0,
//           right: 0,
//           width: "100%",
//           height: "100%",}} autoPlay playsInline></video>
//         <canvas id="output_canvas" style={{  position: "absolute",
//           left: 0,
//           right: 0,
//           width: "100%",
//           height: "100%",}}></canvas>
//       </div>
//     </div>
//   );
// }

// export default PoseEstimationComponent;
import React, { useState,useRef } from 'react';
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
} from "https://cdn.skypack.dev/@mediapipe/tasks-vision@0.10.0";
import { useHistory } from "react-router";
import { run } from "./grammar";
import StartAnalyse from "../utility/StartAnalyse";
// import { runToTranscribe } from "./assembly"


function PoseEstimationComponent() {
  let poseLandmarker;
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [videoHeight] = useState(window.innerHeight);
  const [videoWidth] = useState(window.innerWidth);
  const [webcamButton, setWebcamButton] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const history = useHistory();
// const landmarkRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
// const [transcript, setTranscript] = useState('');
  const [transcripts, setTranscripts] = useState([]);
  const [analyzing, setAnalyzing] = useState(true);
  const [timeLeft,setTimeLeft] = useState(15);
  // const [analysisData,setAnalysisData] = useState({
  //                                               repetitive:[],
  //                                               fillers:[],
  //                                               wpm:0,
  //                                               repeatCount:[],
  //                                                 })
   const [analysisData,setAnalysisData] = useState({
                                                repetitive:[],
                                                fillers:[],
                                                wpm:0,
                                                repeatCount:[],
                                                foldedArms: 0,
                                                clasp: 0,
                                                overHead:0,
                                                inPockets:0,
                                                  })
    let enableWebcamButton;

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
    let audioRecorder;
    let audioChunks = [];

    // const [recordedUrl, setRecordedUrl] = useState('');
    // const mediaStream = useRef(null);
    // const mediaRecorder = useRef(null);
    // const chunks = useRef([]);
    // const startRecording = async () => {
    //   console.log("pressed")
    //   enableCam()
    //   try {
    //     const stream = await navigator.mediaDevices.getUserMedia(
    //       { audio: true }
    //     );
    //     mediaStream.current = stream;
    //     mediaRecorder.current = new MediaRecorder(stream);
    //     mediaRecorder.current.ondataavailable = (e) => {
    //       if (e.data.size > 0) {
    //         chunks.current.push(e.data);
    //       }
    //     };
    //     mediaRecorder.current.onstop = () => {
    //       const recordedBlob = new Blob(
    //         chunks.current, { type: 'audio/webm' }
    //       );
    //       const url = URL.createObjectURL(recordedBlob);
    //       setRecordedUrl(url);
    //       console.log(url)
    //       chunks.current = [];
    //     };
    //     mediaRecorder.current.start();
    //   } catch (error) {
    //     console.error('Error accessing microphone:', error);
    //   }
    //   setIsListening(true)
    // };

    // const stopRecording = () => {
    //   if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
    //     mediaRecorder.current.stop();
    //   }
    //   if (mediaStream.current) {
    //     mediaStream.current.getTracks().forEach((track) => {
    //       track.stop();
    //     });
    //   }
    //   setIsListening(false)
    //   console.log(recordedUrl)
    //   // runToTranscribe(recordedUrl)
    // };                                           

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

  const createPoseLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/1/pose_landmarker_heavy.task`,
        delegate: "GPU"
      },
      runningMode: "VIDEO",
      numPoses: 2
    });

    console.log(poseLandmarker)

  };

  createPoseLandmarker();

  const enableCam = () => {
    const video = document.getElementById("webcam");
    if (!poseLandmarker) {
      console.log("Wait! poseLandmaker not loaded yet.");
      return;
    }

    setWebcamRunning(!webcamRunning);

    // getUsermedia parameters.
    const constraints = {
      video: true
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        video.srcObject = stream;
        video.addEventListener("loadeddata", () => {
          predictWebcam(); // Call predictWebcam after the webcam stream is loaded
        });
      });
  };

  const predictWebcam = async () => {
    const video = document.getElementById("webcam");
    const canvasElement = document.getElementById("output_canvas");
    const canvasCtx = canvasElement.getContext("2d");
    const drawingUtils = new DrawingUtils(canvasCtx);

    canvasElement.style.height = videoHeight;
    video.style.height = videoHeight;
    canvasElement.style.width = videoWidth;
    video.style.width = videoWidth;

    const runningMode = "VIDEO";

    if (!poseLandmarker) {
      console.log("Pose Landmarker not initialized.");
      return;
    }

    if (runningMode === "IMAGE") {
      console.log("Running mode is not supported.");
      return;
    }

    let lastVideoTime = -1;
    let startTimeMs = performance.now();

    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;
      poseLandmarker.detectForVideo(video, startTimeMs, (result) => {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        for (const landmark of result.landmarks) {
          drawingUtils.drawLandmarks(landmark, {
            radius: 1,
            color: 'red', lineWidth: 0.5,
          });
          drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS,{ color: '#3240CF', lineWidth: 0.5 });
  
        }
        // Code for drawing landmarks and connectors
        canvasCtx.restore();
      });
    }
    const container = poseLandmarker.result.landmarks;
    // console.log(poseLandmarker)
    // console.log(container[0][11]);

    if (poseLandmarker.result.landmarks.length === 0) {
      alert("User not in frame!");
    }

    leftShoulder = container[0][11];
    rightShoulder = container[0][12];
    leftElbow = container[0][13];
    rightElbow = container[0][14];
    leftWrist = container[0][15];
    rightWrist = container[0][16];
    leftFoot = container[0][17];
    rightFoot = container[0][18];

    const [midX,midY] = calculateMidPoint(leftShoulder.x,leftShoulder.y,rightShoulder.x,rightShoulder.y);
    const distance = euclidean(midX,midY);

    // if(distance <= centerThreshold){
    //   console.log("Centered")
    // }
    // else{
    //   console.log("Not Centered")
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

    foldedArmsPercentage = Math.round((foldedArms / totalObservations) * 100);
    overHeadPercentage = Math.round((overHead / totalObservations) * 100);
    inPocketsPercentage = Math.round((inPockets / totalObservations) * 100);
    clapsPercentage = Math.round((claps / totalObservations) * 100);
    rightPosturePercentage = Math.round((rightPosture / totalObservations) * 100);
    

    wrongPosePercentage = 100 - rightPosturePercentage

    console.log("Wrong Percentage:",wrongPosePercentage)
    console.log("Folded Arms Percentage:",foldedArmsPercentage)
    console.log("Overhead Percentage:",overHeadPercentage)
    console.log("In Pockets Percentage:",inPocketsPercentage)
    console.log("Claps Percentage:",clapsPercentage)
    console.log("Right Posture Percentage:",rightPosturePercentage)

    setAnalysisData({
      foldedArms: foldedArmsPercentage,
      clasp: clapsPercentage,
      overHead: overHeadPercentage,
      inPockets: inPocketsPercentage
    })

    if (webcamRunning === true) {
      window.requestAnimationFrame(predictWebcam);
    }
  };

  return (
    <div style={{height:"100%",overflowY:"auto"}}>
      <div>
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

      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        <button onClick={enableCam}  
              style={{ 
                position: "absolute", 
                zIndex: 14, 
                left: "50%",
                transform: 'translateX(-50%)',
                fontSize: '24px', 
                padding: '10px 20px', 
                borderRadius: '50%',
                bottom:"20px" }}>
          {webcamRunning ? '🎤' : '🔴'}
        </button>

      <video
        id="webcam"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
          autoPlay
          playsInline
      >
      </video>
  <canvas
    id="output_canvas"
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 12,
      // objectFit:"cover",
      width:"100%",
      height:"100%"
    }}
  ></canvas>
</div>
      </div>
      {analyzing && (<StartAnalyse analysisData={analysisData}/>)}
    </div>
  );
}

export default PoseEstimationComponent;