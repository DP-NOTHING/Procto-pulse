import React from 'react';
import Login from './components/Login/Login';
import Landing from './components/Landing/Landing';
import SignUp from './components/SignUp/SignUp';
import ApplicationForm from './components/ApplicationForm/ApplicationForm';
import ExamTimer from './components/ExamTimer/ExamTimer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateExam from './components/CreateExam/CreateExam';
import TeacherDashbboard from './components/TeacherDashboard/TeacherDashboard';
import ExamDetails from './components/ExamDetails/ExamDetails';
import ExamEntryForm from './components/ExamSecurity/ExamSecurity';
import ExamPage from './components/ExamPage/ExamPage';
import StudentDashbboard from './components/StudentDashboard/StudentDashboard';
import ViewApplicationForm from './components/ExamDetails/ViewApplicationForm';
import ResponseSubmission from './components/ResponseSubmission/ResponseSubmission';
import ViewResponse from './components/ExamDetails/ViewResponse.jsx';
function App() {
	const exams = Array.from({ length: 10 }, (_, index) => ({
		examName: `Exam ${index + 1}`,
		startTime: `2024-01-09 12:${index < 10 ? '0' + index : index}:00`,
	}));

	return (
		<Router>
			<Routes>
				<Route
					path='/exampage'
					element={<ExamPage />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/signup'
					element={<SignUp />}
				/>
				<Route
					path='/examdetails'
					element={<ExamDetails />}
				/>
				<Route
					path='/ViewApplicationForm'
					element={<ViewApplicationForm />}
				/>
				<Route
					path='/ViewResponse'
					element={<ViewResponse />}
				/>
				<Route
					path='/exam'
					element={<ExamTimer exams={exams} />}
				/>
				<Route
					path='/create-exam'
					element={<CreateExam />}
				/>
				<Route
					path='/teacher-dashboard'
					element={<TeacherDashbboard />}
				/>
				<Route
					path='/student-dashboard'
					element={<StudentDashbboard />}
				/>
				<Route
					path='/examform'
					element={<ApplicationForm />}
				/>
				<Route
					path='/ExamSecurity'
					element={<ExamEntryForm />}
				/>
				<Route
					path='/submit-response'
					element={<ResponseSubmission />}
				/>
				<Route
					path='/*'
					element={<Landing />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
