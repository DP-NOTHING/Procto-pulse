import React, { useEffect, useState } from 'react';
import ResponseArea from '../ExamPage/ResponseArea';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Paper } from '@mui/material';
import AlertDialog from '../ExamPage/AlertDialog.jsx';
import NavBar from '../Landing/NavBar';
export default () => {
	const Navigate = useNavigate();
	const [score, setScore] = useState('');
	const [response, setResponse] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [dialog, setDialog] = useState(null);
	const [multiplePerson, setMultiplePerson] = useState(0);
	const [differentPerson, setDifferentPerson] = useState(0);
	const [zeroPerson, setZeroPerson] = useState(0);
	const {
		state: { studentId, examId },
	} = useLocation();
	const saveScore = async (confirm) => {
		setDialog(null);
		// alert(score);
		if (confirm) {
			setIsLoading(true);
			const res = await axios.post(
				`${process.env.REACT_APP_BACKEND}/exam-response/score`,
				{
					examId,
					studentId,
					score,
				},
				{
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
					},
				}
			);
			if (res.data.success) {
				setDialog(null);
				Navigate('/examdetails', { state: { examId } });
				setIsLoading(false);
			}
			// console.log('saving score to db!');
		} else setDialog(null);
	};
	// console.log(studentId, examId);
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_BACKEND}/exam-response/getall`, {
				params: { studentId, examId },
			}).then((res)=>{
				setDifferentPerson(res.data.differentPerson);
				setMultiplePerson(res.data.multiplePerson);
				setZeroPerson(res.data.zeroPerson);
			})
		axios
			.get(`${process.env.REACT_APP_BACKEND}/exam-response`, {
				params: { studentId, examId },
			})
			.then((res) => {
				console.log(res.data);
				setResponse(res.data.response);
				axios
					.get(`${process.env.REACT_APP_BACKEND}/exam-response/score`, {
						params: { studentId, examId },
					})
					.then((res) => {
						// console.log(res.data);
						setScore(res.data.score);
						setIsLoading(false);
					});
				// setIsLoading(false);
			});
	}, []);
	function Score() {
		return (
			<div
				style={{
					backgroundColor: 'white',
					zIndex: 1000,
					position: '-webkit-sticky' /* Safari */,
					position: 'sticky',
					top: 0,
				}}
			>
				<Box
					component='form'
					sx={{
						'& > :not(style)': { m: 1, width: '25ch' },
					}}
					noValidate
					autoComplete='off'
				>
					{/* <TextField
						id='outlined-basic'
						label='Outlined'
						variant='outlined'
					/> */}
					<TextField
						value={score}
						onChange={(e) => {
							setScore(e.target.value);
						}}
						id='score'
						label='Score'
						variant='filled'
						autoFocus
					/>
					{/* <TextField
						label='Score'
						name='score'
						value={score}
						onChange={(e) => setScore(e.target.value)}
						autoFocus
					/> */}
					<Button
						variant='contained'
						color='primary'
						onClick={() => setDialog('You sure you want to save the score ?')}
						sx={{ p: 1.2 }}
					>
						save score
					</Button>
					{/* <TextField
						id='standard-basic'
						label='Standard'
						variant='standard'
					/> */}
				</Box>
			</div>
		);
	}
	return (
		<>	
			<NavBar />
			{isLoading && <Loader />}
			{!isLoading && (
				<>
					<Score />
					<ResponseArea
						show={true}
						response={response}
					/>
					<h1>Warnings:</h1>
					<h2>differentPersons : {differentPerson}</h2>
					<h2>zeroPerson : {zeroPerson}</h2>
					<h2>multiplePerson : {multiplePerson}</h2>
					{dialog && (
						<AlertDialog
							type='Confirm Submission'
							dialogContent={dialog}
							handler={saveScore}
						/>
					)}
				</>
			)}
		</>
	);
};
