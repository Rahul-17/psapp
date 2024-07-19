// import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

// const PublicSpeakingSplashScreen = () => {
//   const history = useHistory();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       history.push('/home');
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [history]);

//   return (
//     <div
//       style={{
//         backgroundImage: `url('https://publicspeakingapp.blob.core.windows.net/publicspeakingimages/home-screen-bg.png')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         height: '100vh',
//         position: 'relative',
//       }}
//     >
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100%',
//         }}
//       >
//         <img
//           src="https://publicspeakingapp.blob.core.windows.net/publicspeakingimages/Home-screen-Public-speaking-logo.png"
//           alt="Public Speaking Logo"
//         />
//       </div>

//       <img
//         src="https://publicspeakingapp.blob.core.windows.net/publicspeakingimages/Home-screen-Microphone-icon.png"
//         alt="Microphone Icon"
//         style={{
//           position: 'absolute',
//           top: `${window.innerHeight / 3}px`,
//           left: '30px',
//         }}
//       />

//       <img
//         src="https://publicspeakingapp.blob.core.windows.net/publicspeakingimages/Home-screen-speech-icon.png"
//         alt="Speech Icon"
//         style={{
//           position: 'absolute',
//           top: `${window.innerHeight / 3.6}px`,
//           left: '100px',
//         }}
//       />

//       <img
//         src="https://publicspeakingapp.blob.core.windows.net/publicspeakingimages/Home-screen-body_Language-icon.png"
//         alt="Body Language Icon"
//         style={{
//           position: 'absolute',
//           top: `${window.innerHeight / 3.6}px`,
//           right: '100px',
//         }}
//       />

//       <img
//         src="https://publicspeakingapp.blob.core.windows.net/publicspeakingimages/Home-screen-face_expectations-icon.png"
//         alt="Face Expectations Icon"
//         style={{
//           position: 'absolute',
//           top: `${window.innerHeight / 3}px`,
//           right: '30px',
//         }}
//       />
//     </div>
//   );
// };

// export default PublicSpeakingSplashScreen;
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CarouselScreen from './Howitworks';

const PublicSpeakingSplashScreen = () => {
  const history = useHistory();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHowItWorks(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showHowItWorks) {
    return <CarouselScreen />;
  }

  return (
    <div
      style={{
        backgroundImage: `url('https://publicspeakingapp.blob.core.windows.net/publicspeakingimages/home-screen-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <img
          src="https://publicspeakingapp.blob.core.windows.net/publicspeakingimages/Home-screen-Public-speaking-logo.png"
          alt="Public Speaking Logo"
        />
      </div>

      <img
        src="https://publicspeakingapp.blob.core.windows.net/publicspeakingimages/Home-screen-Microphone-icon.png"
        alt="Microphone Icon"
        style={{
          position: 'absolute',
          top: `${window.innerHeight / 3}px`,
          left: '30px',
        }}
      />

      <img
        src="https://publicspeakingapp.blob.core.windows.net/publicspeakingimages/Home-screen-speech-icon.png"
        alt="Speech Icon"
        style={{
          position: 'absolute',
          top: `${window.innerHeight / 3.6}px`,
          left: '100px',
        }}
      />

      <img
        src="https://publicspeakingapp.blob.core.windows.net/publicspeakingimages/Home-screen-body_Language-icon.png"
        alt="Body Language Icon"
        style={{
          position: 'absolute',
          top: `${window.innerHeight / 3.6}px`,
          right: '100px',
        }}
      />

      <img
        src="https://publicspeakingapp.blob.core.windows.net/publicspeakingimages/Home-screen-face_expectations-icon.png"
        alt="Face Expectations Icon"
        style={{
          position: 'absolute',
          top: `${window.innerHeight / 3}px`,
          right: '30px',
        }}
      />
    </div>
  );
};

export default PublicSpeakingSplashScreen;
