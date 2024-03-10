import React, { useState, useEffect } from 'react';
import './ExamEntryForm.css';
import { Button } from '@mui/material';
import Countdown from 'react-countdown';
import { useLocation, useNavigate } from 'react-router-dom';

const ExamEntryForm = ({ examDetails }) => {
	const Navigate = useNavigate();
	// console.log(examDetails);
	const {
		state: { examId, studentId, exam },
	} = useLocation();
	// console.log(exam);
	// console.log(examId, studentId);
	// const initialTime = parseInt(localStorage.getItem('initialTime'));
	// const [timeLeft, setTimeLeft] = useState(
	// 	initialTime ? 180 - Math.floor((Date.now() - initialTime) / 1000) : 180
	// );
	const [isChecked, setIsChecked] = useState(true); //@note initially false
	const [isTimeout, setIsTimeout] = useState(false);
	// useEffect(() => {
	// 	const timer = setInterval(() => {
	// 		setTimeLeft((prevTimeLeft) => {
	// 			if (prevTimeLeft <= 0) {
	// 				clearInterval(timer);
	// 				localStorage.setItem('initialTime', Date.now());
	// 				return 180;
	// 			}
	// 			return prevTimeLeft - 1;
	// 		});
	// 	}, 1000);

	// 	return () => clearInterval(timer);
	// }, []);

	const startExam = () => {
		if (isChecked && isTimeout) {
			// console.log('Starting the exam...');
			// document.documentElement.requestFullscreen(); //@note uncomment this
			Navigate(`/exampage`, {
				state: {
					examId,
					studentId,
					exam,
					startTime: Date.now(),
				},
			});
		} else if (!isChecked) {
			alert('Please agree to the terms');
		}
	};

	// const formatTime = (seconds) => {
	// 	const minutes = Math.floor(seconds / 60);
	// 	const remainingSeconds = seconds % 60;
	// 	return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
	// 	// Navigate(`/exampage/${examId}/${studentId}`);
	// };

	return (
		<div className='exam-entry-form-container'>
			<div className='exam-entry-form'>
				<h2>Lets get started</h2>
				{isTimeout || (
					<p>
						Time Left:
						<Countdown
							date={
								Date.now() + 1000
								// (Date.parse(exam.testDateTime) - new Date()) //@note need to do time changes
							}
							onComplete={() => setIsTimeout(true)}
						/>
					</p>
				)}
				<div>
					<p>Anti-cheating rules:</p>
					<ol>
						<li>
							Do not use any unauthorized aids or materials during the exam.
						</li>
						<li>Do not communicate with others during the exam.</li>
						<li>Do not access any unauthorized websites or applications.</li>
						<li>Do not attempt to copy or share exam questions or answers.</li>
						<li>Violation of exam rules will result in strict penalties.</li>
					</ol>
					<p>
						<strong>Strict Vigilance Policy:</strong> Our system is equipped
						with monitoring tools to detect cheating behaviors. Any suspicious
						activity will be investigated, and appropriate actions will be
						taken.
					</p>
				</div>
				<label htmlFor='termsCheckbox'>
					I agree to the terms and conditions
				</label>
				<input
					type='checkbox'
					id='termsCheckbox'
					checked={isChecked}
					onChange={() => setIsChecked(!isChecked)}
				/>
				<br />
				<Button
					onClick={startExam}
					disabled={!isTimeout || !isChecked}
				>
					Start Exam
				</Button>
			</div>
		</div>
	);
};

export default ExamEntryForm;
