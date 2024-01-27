import { Link } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ExamDetails = () => {
	const { id: examID } = useParams();
	// console.log(examID);
	useEffect(() => {
		const fetchExamDetails = async (examID) => {
			const res = await axios.get(
				`${process.env.REACT_APP_BACKEND}/teacherDashboard/${examID}`
			);
			return res.data;
		};
		fetchExamDetails(examID).then((res) => {
			console.log(res);
		});
	}, []);
	return (
		// <ul className='exam-list'>
		// 	{exams.map((exam) => (
		// 		<li key={exam.id}>
		// 			<Link
		// 				to={`/exam/${exam.id}`}
		// 				className='exam-link'
		// 			>
		// 				{exam.name}
		// 			</Link>
		// 		</li>
		// 	))}
		// </ul>
		<div>Exam Details</div>
	);
};

export default ExamDetails;
