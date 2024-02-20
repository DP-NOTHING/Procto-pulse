import React, { useState,useEffect} from 'react'
import Bar from './Bar'
import Webcam from "react-webcam";
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useRestrictCopyPaste } from './useRestrictCopyPaste.ts';

export default function ExamPage({examid,studentid}) {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [queryParameters] = useSearchParams();
  const [cam,setCam] = useState(false);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log(imageSrc);
  }, [webcamRef, setImgSrc]);
  
  function camswitch(){
    setCam(!cam);
  }

  var stuid="jee";
  console.log(stuid);
  var stuimage;
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/student/getimage/${stuid}`,).then((res)=>{
      stuimage = res.data;
      console.log("fasd1"); 
      console.log(stuimage);
    }).catch((err)=>{
      console.log(err);
    });
  }, []);

  
  

  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  useRestrictCopyPaste({window, actions:["copy","cut","paste","select"]})
  return (
    <div>
      
      <Bar />    
      {/* <Webcam 
        width={0}
        ref={webcamRef}>
      </Webcam> */}
     
      {cam?<div>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          forceScreenshotSourceSize={true}
          style={{width: "0%"}}
          // screenshotQuality={1}
        />

        {/* {axios.post(`process.env.SERVICE_URL`, {"image":{imgSrc}}).then()} */}
        
      </div> :""}
      
      <button onClick={capture}>Capture photo</button>
      {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
      <button onClick={camswitch}>switch</button>
    </div>
  )
}       

