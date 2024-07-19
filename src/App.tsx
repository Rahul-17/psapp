import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import { BrowserRouter as Router,Switch } from 'react-router-dom';
/* Core CSS required for Ionic components to work properly */
import { useLocation } from 'react-router-dom';
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import CarouselScreen from './Screens/OverviewScreens/Howitworks';
import TermsAndConditions from './Screens/OverviewScreens/TermsAndConditions';
import PublicSpeakingSplashScreen from './Screens/OverviewScreens/PSSplashScreen';
import LoginPage from './auth/Login';
import SignUpPage from './auth/Signup';
import TrainingSelection from './Screens/UIScreen/Trainingselection';
import SetTimerToSpeak from './Screens/UIScreen/Set-timer-to-speak';
import UserPose from './Screens/UIScreen/Pose';
// import Dictaphone from './stt/SpeechToText';
// import PoseEstimationComponent from './stt/SpeechToText';
import 'regenerator-runtime/runtime';
import OverallAnalysis from './Screens/UIScreen/OverallAnalysis';
import SwitchAudioVideoScreen from './Screens/UIScreen/Permissions';
import WebcamFaceDetector from './stt/SpeechToText';
import CircularCounter from './Screens/UIScreen/Circular';
import PoseEstimationComponent from './stt/SpeechToText';
import NewPoseTest from './stt/NewPose';

setupIonicReact();

const App: React.FC = () => {
  // const location = useLocation();
  return(
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
       <Router>
       <Switch>
            <Route exact path="/" component={PublicSpeakingSplashScreen} />
            <Route path="/home" component={CarouselScreen} />
            <Route path="/terms-and-conditions" component={TermsAndConditions} /> 
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path={'/training'} component={TrainingSelection} />
            <Route path={'/set-timer-to-speak'} component={SetTimerToSpeak} />
            <Route path={'/camera'} component={NewPoseTest} />
            {/* <Route path={'/camera'} component={PoseEstimationComponent} /> */}
            <Route path={'/analysis'} component={OverallAnalysis} />
            {/* <Route path="/analysis">
                <OverallAnalysis analysisData={location.state} />
            </Route> */}
            <Route path={'/permissions'} component={SwitchAudioVideoScreen} />
            <Route path={'/face'} component={WebcamFaceDetector} />
            <Route path={'/circle-timer'} component={CircularCounter} />
          </Switch>
       </Router>
      </IonRouterOutlet>
    </IonReactRouter>
    {/* <CarouselScreen /> */}
  </IonApp>
)};

export default App;
