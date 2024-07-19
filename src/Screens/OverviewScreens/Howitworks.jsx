import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import colorfulBannerImage from '../../assets/Image.png';
import backgroundImage from '../../assets/backgroundImage.jpg'; // Replace 'backgroundImage.jpg' with the name of your background image file
import './howitworks.css'

const CarouselScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const history = useHistory();

  const dataListview = [
    {
      name: 'Speech Analysis',
      description:
        'Experience real time feedback on voice, body and expressions and find your areas of improvement to become an effective speaker ',
      imageUrl:
        'https://publicspeakingapp.blob.core.windows.net/carouselimages/How-its-works-Microphone-icon.png',
    },
    {
      name: 'Voice Analysis',
      description:
        'Evaluate and understand the vocal aspects of your speaking style like grammar, vocal variety, pace and much more ',
      imageUrl:
        'https://publicspeakingapp.blob.core.windows.net/carouselimages/voiceAnalysis.png',
    },
    {
      name: 'Body Analysis',
      description:
        'Understand the overall effectiveness of your message through your posture body language and movement',
      imageUrl:
        'https://publicspeakingapp.blob.core.windows.net/carouselimages/bodyAnalysis.png',
    },
    {
      name: 'Face Expression',
      description:
        'Evaluate how you look at the audience and your level of confidence as you speak ',
      imageUrl:
        'https://publicspeakingapp.blob.core.windows.net/carouselimages/faceAnalysis.png',
    },
  ];

  const handleChangeIndex = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className='how-it-works-container'
    >
      <div className='how-it-works-image'>
        <img src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/Supergraphic.jpg" alt="Colorful Banner" style={{ width: '100%', height: '10px' }} />
      </div>
      <div className='how-it-works-title'>
        <h2>How it works</h2>
      </div>
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={1000}
        onChange={handleChangeIndex}
      >
        {dataListview.map((item, index) => (
          <div key={index} className='how-it-works-datalist'>
            <img src={item.imageUrl} alt={item.name} style={{ width: '120px', height: '120px', borderRadius: '50%' }} />
            <div
              className='how-it-works-card'
            >
              <h3>{item.name}</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)' }}>{item.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
      <div className='how-it-works-button-container'>
        <button
          className='how-it-works-button'
          onClick={() => history.push('/terms-and-conditions')} 
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default CarouselScreen;


