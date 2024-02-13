import React from 'react';
import Login from './components/Login/Login';
import Landing from './components/Landing/Landing';
import SignUp from './components/SignUp/SignUp';
import ApplicationForm from './components/ApplicationForm/ApplicationForm';

import ExamTimer from './components/ExamTimer/ExamTimer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeacherDashboard from './components/TeacherDashboard/TeacherDashboard';
import TeacherExams from './components/TeacherExam/TeacherExam';
import ExamDetails from './components/ExamDetails/ExamDetails';
import ExamEntryForm from './components/ExamSecurity/ExamSecurity';

function App() {
	const exams = Array.from({ length: 10 }, (_, index) => ({
		examName: `Exam ${index + 1}`,
		startTime: `2024-01-09 12:${index < 10 ? '0' + index : index}:00`,
	}));

	return (
		<Router>
			<Routes>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/signup'
					element={<SignUp />}
				/>
				<Route
					path='/exam/:id'
					element={<ExamDetails />}
				/>
				<Route
					path='/exam'
					element={<ExamTimer exams={exams} />}
				/>
				<Route
					path='/teacherDashboard'
					element={<TeacherDashboard />}
				/>
				<Route
					path='/teacherexam'
					element={<TeacherExams />}
				/>
				<Route
					path='/examform'
					element={<ApplicationForm />}
				/>
				<Route
					path='/*'
					element={<Landing />}
				/>
				<Route path="/ExamSecurity" element={<ExamEntryForm/>}/>
			</Routes>
		</Router>
	);
}

export default App;
