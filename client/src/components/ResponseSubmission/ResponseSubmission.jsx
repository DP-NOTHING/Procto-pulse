import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Loader from '../Loader/Loader';
export default function ResponseSubmission() {
	// const [isLoading, setIsLoading] = useState(true);
	const Navigate = useNavigate();
	// const {
	// 	state: { examId, studentId },
	// } = useLocation();
	// console.log('hue111');
	// response will be in local storage so store it to database
	// useEffect(() => {
	// 	if (isLoading) {
	// 		// console.log('heu');
	// 		// axios
	// 		// 	.post(`${process.env.REACT_APP_BACKEND}/exam-response`, {
	// 		// 		response: localStorage.getItem('content'),
	// 		// 		examId,
	// 		// 		studentId,
	// 		// 	})
	// 		// 	.then((res) => {
	// 		// 		// console.log(res.data);
	// 		// 		localStorage.removeItem('content');
	// 		// 		setIsLoading(false);
	// 		// 	})
	// 		// 	.catch((err) => {
	// 		// 		alert(err);
	// 		// 		setIsLoading(false);
	// 		// 	});
	// 	}
	// }, []);
	return (
		<>
			<div>
				<h1>response submitted successfully</h1>
				<Button onClick={() => Navigate('/student-dashboard')}>
					go to dashboard
				</Button>
			</div>
		</>
	);
}
