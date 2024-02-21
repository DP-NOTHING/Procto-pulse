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
  const [cam,setCam] = useState(true);
  const [stuimage, setStuImage] = useState("");
  const [multipleperson,setMultiplePerson]=useState(0);
  const [differentperson,setDifferentPerson]=useState(0);

  const capture = React.useCallback(() => {
    console.log(stuimage.length)
    if (webcamRef.current && stuimage.length>0) {
      const imageSrc = webcamRef.current.getScreenshot();
      // setImgSrc(imageSrc);
      console.log("heioiy");
    // console.log(imageSrc);
      console.log(typeof(stuimage))
      console.log(stuimage.length)
      console.log(typeof(imageSrc))
      axios.post(`http://127.0.0.1:8000/check`,
          {"photo":stuimage,
          "webcam":imageSrc
          }).
      then((res)=>{
        console.log("fef");
        if(res.data.no_of_person>1){
          setMultiplePerson(multipleperson+1);
        }
        if(res.data.verified==false){
          setDifferentPerson(differentperson+1);
        }
        console.log(res);
      }).catch((err)=>{
        console.log("feefesfes")
        console.log(err);
      });
    }
    console.log("hey");
  }, [webcamRef, setImgSrc]);

  function capture2(){
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      // setImgSrc(imageSrc);
      console.log("heioiy");
    // console.log(imageSrc);
      console.log(typeof(stuimage))
      console.log(stuimage.length)
      
      console.log(typeof(imageSrc))
      axios.post(`http://127.0.0.1:8000/check`,
          {"photo":stuimage,
          "webcam":imageSrc
          }).
      then((res)=>{
        console.log("fef");
        console.log(res);
      }).catch((err)=>{
        console.log("feefesfes")
        console.log(err);
      });
    }
    console.log("hey");
  }
  function camswitch(){
    setCam(!cam);
  }

  var stuid="jee";
  console.log(stuid);


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/student/getimage/${stuid}`,).
    then((res)=>{
      // stuimage = res.data;
      setStuImage(res.data);
      console.log("fasd1"); 
      // console.log(res.data);
      console.log(res.data.length)
      console.log(stuimage.length)
    }).catch((err)=>{
      console.log(err);
    });
  },[]);


  
  useEffect(() => {
    
    if (cam) {
        setTimeout(()=>{
          if(stuimage.length!=0){
            console.log("------")
            console.log(stuimage.length)
            console.log("////////////")
            const intervalId = setInterval(() => {
              capture2();
            }, 8000);
            return () => clearInterval(intervalId);
          }
      },3000)      
    }
  }, [cam, capture,stuimage]);

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
  // setTimeout(() => {
  //   setCam(true);
  // }, 3000);

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

