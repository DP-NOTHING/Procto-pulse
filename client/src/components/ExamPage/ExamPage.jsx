import React, { useState, useEffect } from 'react';
import Drawer from './Drawer.jsx';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useRestrictCopyPaste } from './useRestrictCopyPaste.ts';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/material';
import Loader from '../Loader/Loader.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import AlertDialog from './AlertDialog.jsx';
import ResponseArea from './ResponseArea.jsx';
import QuestionPaper from './QuestionPaper.jsx';

export default function ExamPage() {
	const [showResponse, setShowResponse] = useState(false);
	const {
		state: { examId, studentId, exam, startTime },
	} = useLocation();
	const webcamRef = React.useRef(null);
	const [imgSrc, setImgSrc] = React.useState(null);
	const [queryParameters] = useSearchParams();
	const [cam, setCam] = useState(false);
	const [stuimage, setStuImage] = useState('');
	const [multiplePerson, setMultiplePerson] = useState(0);
	const [differentPerson, setDifferentPerson] = useState(0);
	const [zeroPerson, setZeroPerson] = useState(0);
	const [dialog, setDialog] = useState(null);
	const [abc, setAbc] = useState("");

	// const capture = React.useCallback(() => {
	// 	console.log(stuimage.length)
	// 	if (webcamRef.current) {
	// 	  const imageSrc = webcamRef.current.getScreenshot();
	// 	  setImgSrc(imageSrc);

	// 	  console.log("heioiy");
	// 	  console.log(imageSrc);
	// 	  console.log(typeof(stuimage))
	// 	  console.log(stuimage.length)
	// 	  console.log(typeof(imageSrc))
	// 	  axios.post(`http://127.0.0.1:8000/check`,
	// 		  {"photo":stuimage,
	// 		  "webcam":imageSrc
	// 		  }).
	// 	  then((res)=>{
	// 		console.log('fef');
	// 		console.log('Response data:', res.data); // Add this line
	// 		if (res.data.no_of_person > 1) {
	// 			setMultiplePerson(prevMultiplePerson => prevMultiplePerson + 1);
	// 		}
	// 		if (res.data.no_of_person == 0) {
	// 			setZeroPerson(prevZeroPerson => prevZeroPerson + 1);
	// 		}
	// 		if (res.data.verified == false) {
	// 			setDifferentPerson(prevDifferentPerson => prevDifferentPerson + 1);
	// 		}
	// 	  }).catch((err)=>{
	// 		console.log("feefesfes")
	// 		console.log(err);
	// 	  });
	// 	}
	// 	console.log("hey");
	//   }, [webcamRef, setImgSrc]);

	// function capture2() {
	// 	if (webcamRef.current) {
	// 		const imageSrc = webcamRef.current.getScreenshot();
	// 		// setImgSrc(imageSrc);
	// 		console.log('heioiy');
	// 		console.log(imageSrc);
	// 		console.log(typeof stuimage);
	// 		console.log(stuimage.length);

	// 		console.log(typeof imageSrc);
	// 		axios
	// 			.post(`http://127.0.0.1:8000/check`, {
	// 				'photo': stuimage,
	// 				'webcam': imageSrc,
	// 			})
	// 			.then((res) => {
	// 				console.log('fef');
	// 				console.log('Response data:', res.data); // Add this line
	// 				if (res.data.no_of_person > 1) {
	// 					setMultiplePerson(prevMultiplePerson => prevMultiplePerson + 1);
	// 				}
	// 				if (res.data.no_of_person == 0) {
	// 					setZeroPerson(prevZeroPerson => prevZeroPerson + 1);
	// 				}
	// 				if (res.data.verified == false) {
	// 					setDifferentPerson(prevDifferentPerson => prevDifferentPerson + 1);
	// 				}
	// 				// console.log(res);
	// 				console.log(differentPerson)
	// 				console.log(multiplePerson)
	// 				console.log(zeroPerson)
	// 			})
	// 			.catch((err) => {
	// 				console.log('feefesfes');
	// 				console.log(err);
	// 			});
	// 	}
	// 	console.log('hey');
	// }
	// function capture3(){
	// 	if (webcamRef.current) {
	// 	  const imageSrc = webcamRef.current.getScreenshot();
	// 	  setImgSrc(imageSrc);
	// 	  console.log("heioiy");
	// 	// console.log(imageSrc);
	// 	  console.log(typeof(stuimage))
	// 	  console.log(stuimage.length)
		  
	// 	  console.log(typeof(imageSrc))
	// 	  console.log(imageSrc)
	// 	  axios.post(`http://127.0.0.1:8000/check`,
	// 		  {"photo":stuimage,
	// 		  "webcam":imageSrc
	// 		  }).
	// 	  then((res)=>{
	// 		console.log("fef");
	// 		console.log('Response data:', res.data); // Add this line
	// 				if (res.data.no_of_person > 1) {
	// 					setMultiplePerson(prevMultiplePerson => prevMultiplePerson + 1);
	// 				}
	// 				if (res.data.no_of_person == 0) {
	// 					setZeroPerson(prevZeroPerson => prevZeroPerson + 1);
	// 				}
	// 				if (res.data.verified == false) {
	// 					setDifferentPerson(prevDifferentPerson => prevDifferentPerson + 1);
	// 				}
	// 	  }).catch((err)=>{
	// 		console.log("feefesfes")
	// 		console.log(err);
	// 	  });
	// 	}
	// 	console.log("hey");
	//   }
	// function camswitch() {
	// 	setCam(!cam);
	// }

	// var stuid = 'jee';
	// console.log(stuid);
	useEffect(() => {
		console.log('multiplePerson:', multiplePerson);
		console.log('zeroPerson:', zeroPerson);
		console.log('differentPerson:', differentPerson);
	}, [multiplePerson, zeroPerson, differentPerson]);
	const handleTabChanged = (e) => {
		//do something else
		// if (!document.fullscreenElement) {
		// 	console.log('tab changed');
		// 	alert('You are not allowed to leave page blah blah');
		// }
		setDialog('You are not allowed to leave page blah blah');
	};
	const handleFullScreenChange = (e) => {
		e.preventDefault();
		if (!document.fullscreenElement) {
			// alert('You are not allowed to leave fullscreen blah blah');
			console.log(
				'fullscreen changed',
				document.fullscreenElement
				// window.fullScreen
			);
			setDialog('You are not allowed to leave fullscreen blah blah');
		}
	};
	const differentPersonHandler=(e)=>{
		// alert(e);
		e.preventDefault();
		setDialog("Different person detected");
	};
	const multiplePersonHandler=(e)=>{
		// alert(e);
		e.preventDefault();
		setDialog("Multiple person detected");
	};
	const zeroPersonHandler=(e)=>{
		// alert(e);
		e.preventDefault();
		setDialog("Zero person detected");
	};
	useEffect(() => {
		window.addEventListener('blur', handleTabChanged);
		window.addEventListener('fullscreenchange', handleFullScreenChange);
		window.addEventListener('multiplePerson', multiplePersonHandler);
		window.addEventListener('zeroPerson', zeroPersonHandler);
		window.addEventListener('differentPerson', differentPersonHandler);
		return () => {
			window.removeEventListener('fullscreenchange', handleFullScreenChange);
			window.removeEventListener('blur', handleTabChanged);
			window.removeEventListener('multiplePerson', multiplePersonHandler);
			window.removeEventListener('zeroPerson', zeroPersonHandler);
			window.removeEventListener('differentPerson', differentPersonHandler);
		};
	}, []);

	//for first time pic from app form
	// useEffect(() => {
	// 	console.log(studentId);
	// 	axios.get(`${process.env.REACT_APP_BACKEND}/student/getimage/${studentId}`,).
	// 	then((res)=>{
	// 	// stuimage = res.data;
	// 	setStuImage(res.data);
	// 	console.log("fasd1"); 
	// 	// console.log(res.data);
	// 	console.log(res.data.length)
	// 	console.log(stuimage.length)
	// 	}).catch((err)=>{
	// 	console.log(err);
	// 	});
  	// },[]);


  
//   useEffect(() => {
//     console.log(stuimage)
//     if (cam) {
//         setTimeout(()=>{
//           if(stuimage.length!=0){
//             console.log("------")
//             console.log(stuimage.length)
//             console.log("////////////")
//             const intervalId = setInterval(() => {
//               capture2();
//             }, 10000);
//             return () => clearInterval(intervalId);
//           }
//       	},3000)      
//     }
//   }, [cam,stuimage]);
 

/////////////////////////////////////////////////////////////////////////////////////////////////////
const capture = React.useCallback(() => {
    console.log(stuimage.length)
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      // setImgSrc(imageSrc);
      console.log("heioiy");
    	console.log(imageSrc);
      console.log(typeof(stuimage))
      console.log(stuimage.length)
      console.log(typeof(imageSrc))
      axios.post(`http://127.0.0.1:8000/check`,
          {"photo":stuimage,
          "webcam":imageSrc
          }).
      then((res)=>{
        console.log("fef");
        console.log(res.data);
      }).catch((err)=>{
        console.log("feefesfes")
        console.log(err);
      });
    }
    console.log("hey");
  }, [webcamRef]);

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
        console.log(res.data);
		console.log('Response data:', res.data); // Add this line
					if (res.data.no_of_person > 1) {
						setMultiplePerson(prevMultiplePerson => prevMultiplePerson + 1);
						let event = new Event("multiplePerson");
						window.dispatchEvent(event);
					}

					if (res.data.no_of_person == 0) {
						setZeroPerson(prevZeroPerson => prevZeroPerson + 1);
						let event = new Event("zeroPerson");
						window.dispatchEvent(event);
					}
					else if (res.data.verified == false) {
						setDifferentPerson(prevDifferentPerson => prevDifferentPerson + 1);
						let event = new Event("differentPerson");
						window.dispatchEvent(event);
					}
      }).catch((err)=>{
        console.log("feefesfes")
        console.log(err);
      });
    }
    console.log("hey");
  }
	useEffect(() => {
		console.log(studentId);
		axios.get(`${process.env.REACT_APP_BACKEND}/student/getimage/${studentId}`,).
		then((res)=>{
		// stuimage = res.data;
		setStuImage(res.data);
		console.log("fasd1-------------------------------------------------"); 
		// console.log(res.data);
		console.log(res.data.length)
		console.log(stuimage.length)
		}).catch((err)=>{
		console.log(err);
		});
	},[]);
	useEffect(() => {
		
		if (cam && stuimage.length!=0) {
			setTimeout(()=>{
			  if(stuimage.length!=0){
				console.log("------")
				console.log(stuimage.length)
				console.log("////////////")
				const intervalId = setInterval(() => {
				  capture2();
				}, 5000);
				return () => clearInterval(intervalId);
			  }
		  },3000)      
		}
	  }, [cam,stuimage]);

	//   setTimeout(() => {
	// 	setCam(true);
	//   }, 3000);

	useRestrictCopyPaste({ window, actions: ['copy', 'cut', 'paste', 'select'] });
	return (
		<>	
		<div>
			<Webcam
				audio={false}
				ref={webcamRef}
				screenshotFormat='image/jpeg'
				onUserMedia={() => {setCam(true);}}
				onUserMediaError={() => {console.log("media error=========================")}}
				forceScreenshotSourceSize={true}
				// style={{ width: '0%' }}
				// screenshotQuality={1}
			/>
		</div>
			<Drawer
				startTime={startTime}
				exam={exam}
				showResponse={showResponse}
				setShowResponse={setShowResponse}
				differentPerson={differentPerson}
				multiplePerson={multiplePerson}
				zeroPerson={zeroPerson}
			/>
			{/* <Webcam 
        width={0}
        ref={webcamRef}>
      </Webcam> */}
			{/* {cam ?  */}
				
			  {/* :""} */}
			 {/* <button onClick={capture2}>Capture photo</button> */}

			

			{/* <button onClick={camswitch}>switch</button>  */}
			<Stack>
				<QuestionPaper
					exam={exam}
					show={!showResponse}
				/>
				{dialog && (
					<AlertDialog
						dialogContent={dialog}
						handler={setDialog}
					/>
				)}
			<ResponseArea show={showResponse} />
			<button
					onClick={() => {
						setShowResponse(!showResponse);
					}}
				>
					toggle
				</button>
			</Stack>
			<h1>hr</h1>
			{
				setTimeout(() => {
					return (
						<div>
						<h1>hr</h1>
						<img src={stuimage}></img>
						<img src={imgSrc}></img>
						</div>
					)
				}, 5000)
			}
			
			{/* @note uncomment this */}
			{dialog && (
				<AlertDialog
					type={'Warning'}
					dialogContent={dialog}
					handler={setDialog}
				/>
				)}
		</>
	);
}
