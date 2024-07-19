import React,{ useState } from 'react';
import { useHistory } from 'react-router';
import CircularCounter from '../Screens/UIScreen/Circular';
import { Link } from 'react-router-dom';

const StartAnalyse = ( {analysisData} ) => {
    const history = useHistory();
    console.log(analysisData)
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const startAnalysis = () => {
        console.log("Analysing");
        history.push('/circle-timer',{analysisData: analysisData});
        // setIsAnalyzing(true);
        // <Link to={{pathname:"/circle-timer"}} state={analysisData}/>
    }

    return(
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',textAlign: 'center',width:"80px",height:"30px",backgroundColor:"#00736E",display:"flex",justifyContent:"center",borderRadius:"15px",cursor:"pointer ",zIndex:"15"}} onClick={startAnalysis}>
            <button style={{color:"white",backgroundColor:"#00736E"}}>
                Analyse..
            </button>
        </div>
    )
}

export default StartAnalyse;