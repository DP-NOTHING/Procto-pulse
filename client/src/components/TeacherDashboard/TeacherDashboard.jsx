// client/src/TeacherDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
	const [exams, setExams] = useState([]);
	const [formData, setFormData] = useState({
		noOfQuestions: 0,
		testTime: '',
		testDateTime: '',
		examName: '',
	});

	useEffect(() => {
		// console.log('jnsdnknsdkxnkdsn');
		const fetchExams = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND}/teacherDashboard`
				);
				return response;
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchExams()
			.then((response) => {
				// console.log(response.data);
				setExams(response.data);
			})
			.catch((res) => {
				console.error(res);
			});

		return () => {};
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;

		const newValue =
			name === 'noOfQuestions' ? Math.max(0, parseInt(value)) : value;

		setFormData((prevData) => ({ ...prevData, [name]: newValue }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BACKEND}/teacherDashboard`,
				formData
			);
			// console.log(response);
			// if (response.data.success) {
			// 	const examsResponse = await axios.get(
			// 		`${process.env.REACT_APP_BACKEND}/teacherDashboard`
			// 	);
			// 	console.log(examsResponse);
			// 	setExams(examsResponse.data.exams);
			// } else {
			// 	console.error(
			// 		'Exam registration failed:',
			// 		response.data.message
			// 	);
			// }
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	return (
		<div className='teacher-dashboard'>
			<h2>Teacher Dashboard</h2>
			<form
				// onSubmit={handleSubmit}
				className='exam-form'
			>
				<label>
					Exam Name:
					<input
						type='text'
						name='examName'
						value={formData.examName}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label>
					No. of Questions:
					<input
						type='number'
						name='noOfQuestions'
						value={formData.noOfQuestions}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label>
					Test Time:
					<input
						type='text'
						name='testTime'
						value={formData.testTime}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label>
					Test Date and Time:
					<input
						type='datetime-local'
						name='testDateTime'
						value={formData.testDateTime}
						onChange={handleChange}
					/>
				</label>
				<br />

				<button
					type='submit'
					className='register-button'
					onClick={handleSubmit}
				>
					Register Exam
				</button>
			</form>
			<ul className='exam-list'>
				{exams.map((exam) => (
					<li key={exam._id}>
						<Link
							to={`/exam/${exam._id}`}
							className='exam-link'
						>
							{exam.examName}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TeacherDashboard;
