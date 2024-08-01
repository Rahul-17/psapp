import React,{ useState, useEffect,useRef } from 'react';
import { useHistory } from 'react-router';
import CircularCounter from '../Screens/UIScreen/Circular';
import { Link } from 'react-router-dom';

const StartAnalyse = ( {analysisData, videoURL,recordingEnabled} ) => { //modified by Rahul
    const history = useHistory();
    console.log(analysisData)
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const aRef = useRef(null); //added by Rahul
    const timerRef = useRef(null);
    const startAnalysis = () => {
        console.log("Analysing");
        history.push('/circle-timer',{analysisData: analysisData});
        // setIsAnalyzing(true);
        // <Link to={{pathname:"/circle-timer"}} state={analysisData}/>
    }
    //modified by Rahul
    useEffect(()=> {
        if(!timerRef.current){
           timerRef.current= setTimeout(() => {
            if(recordingEnabled){
                        aRef.current.click();
                    }
                    startAnalysis()
            },1000)
        }
    },[])

    return(
        <>
         {/* <div style={{ position: 'absolute', top: '50%', left: '40%', transform: 'translate(-50%, -50%)',textAlign: 'center',width:"80px",height:"30px",backgroundColor:"#00736E",display:"flex",justifyContent:"center",borderRadius:"15px",cursor:"pointer ",zIndex:"15"}} onClick={startAnalysis}>
            <button style={{color:"white",backgroundColor:"#00736E"}}>
                Analyse
            </button>
        </div> */}
        {/* <div style={{ position: 'absolute', top: '50%', left: '60%', transform: 'translate(-50%, -50%)',textAlign: 'center',width:"60px",height:"30px",backgroundColor:"#00736E",display:"flex",justifyContent:"center",borderRadius:"15px",cursor:"pointer ",zIndex:"15"}}>
            <a ref={aRef} download href={videoURL} style={{color:"white",backgroundColor:"#00736E", textDecoration:'none', fontSize: "14px", display: "flex", justifyContent: "center", alignItems: "center", width: "60%", height: "90%"}}>
                Save
            </a>
        </div> */}
        <a ref={aRef} download href={videoURL} style={{ display:"none",color:"white",backgroundColor:"#00736E", textDecoration:'none', fontSize: "14px", display: "flex", justifyContent: "center", alignItems: "center", width: "60%", height: "90%"}}>
                Save
            </a>
        </>
    )
}

export default StartAnalyse;