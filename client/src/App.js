import React, { useEffect, useState } from 'react';
import Login from './components/Login/Login';
import Landing from './components/Landing/Landing';
import SignUp from './components/SignUp/SignUp';
import ApplicationForm from './components/ApplicationForm/ApplicationForm';
import ExamTimer from './components/ExamTimer/ExamTimer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateExam from './components/CreateExam/CreateExam';
import TeacherDashbboard from './components/TeacherDashboard/TeacherDashboard';
import ExamDetails from './components/ExamDetails/ExamDetails';
import ExamEntryForm from './components/ExamSecurity/ExamSecurity';
import ExamPage from './components/ExamPage/ExamPage';
import StudentDashbboard from './components/StudentDashboard/StudentDashboard';
import ViewApplicationForm from './components/ExamDetails/ViewApplicationForm';
import ResponseSubmission from './components/ResponseSubmission/ResponseSubmission';
import ViewResponse from './components/ExamDetails/ViewResponse.jsx';
import Routes from '../src/components/Routes/Routes.jsx';
import AuthProvider from "./provider/authProvider";
import Offline from '../src/components/Offline/Offline';

function App() {
	const [isOnline, setIsOnline] = useState(navigator.onLine);
	const handleOnlineStatus = () => {
		setIsOnline(navigator.onLine);
	};
	
	useEffect(() => {
		window.addEventListener('online', handleOnlineStatus);
		window.addEventListener('offline', handleOnlineStatus);
		return () => {
			window.removeEventListener('online', handleOnlineStatus);
			window.removeEventListener('offline', handleOnlineStatus);
		};
	}, []);
	return isOnline ? (
		<AuthProvider>
		<Routes />
	  	</AuthProvider>
	) : (
		<Offline />
	);
}

export default App;
