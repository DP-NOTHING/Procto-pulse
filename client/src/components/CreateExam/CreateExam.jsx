// client/src/CreateExam.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CreateExam.css';

const CreateExam = () => {
	const [exams, setExams] = useState([]);
	const [formData, setFormData] = useState({
		noOfQuestions: 0,
		testTime: '',
		testDateTime: '',
		examName: '',
	});
	const [file, setFile] = useState(null);
	useEffect(() => {
		// console.log('jnsdnknsdkxnkdsn');
		const fetchExams = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND}/exam`
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

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const formDataObj = new FormData();
			formDataObj.append('file', file);
			formDataObj.append('noOfQuestions', formData.noOfQuestions);
			formDataObj.append('testTime', formData.testTime);
			formDataObj.append('testDateTime', formData.testDateTime);
			formDataObj.append('examName', formData.examName);

			const response = await axios.post(
				'http://localhost:3000/exam',
				formDataObj,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			if (response.data.success) {
				const examsResponse = await axios.get(
					'http://localhost:3000/exam'
				);
				setExams(examsResponse.data.exams);
			} else {
				console.error(
					'Exam registration failed:',
					response.data.message
				);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	return (
		<div className='teacher-dashboard'>
			<h2>Teacher Dashboard</h2>
			<form
				onSubmit={handleSubmit}
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
				<label>
					Question Paper (PDF):
					<input
						type='file'
						accept='.pdf'
						onChange={handleFileChange}
					/>
				</label>
				<br />
				<button
					type='submit'
					className='register-button'
				>
					Register Exam
				</button>
			</form>
			<ul className='exam-list'>
				{exams.map((exam) => (
					<li key={exam.id}>
						<Link
							to={`/exam/${exam.id}`}
							className='exam-link'
						>
							{exam.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CreateExam;
