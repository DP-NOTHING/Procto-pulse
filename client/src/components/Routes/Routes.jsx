import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Login from '../Login/Login';
import Landing from '../Landing/Landing';
import SignUp from '../SignUp/SignUp';
import ApplicationForm from '../ApplicationForm/ApplicationForm';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from '../../provider/authProvider';
import CreateExam from '../CreateExam/CreateExam';
import TeacherDashbboard from '../TeacherDashboard/TeacherDashboard';
import ExamDetails from '../ExamDetails/ExamDetails';
import ExamEntryForm from '../ExamSecurity/ExamSecurity';
import ExamPage from '../ExamPage/ExamPage';
import StudentDashbboard from '../StudentDashboard/StudentDashboard';
import ViewApplicationForm from '../ExamDetails/ViewApplicationForm';
import ResponseSubmission from '../ResponseSubmission/ResponseSubmission';
import ViewResponse from '../ViewResponse/ViewResponse.jsx';

const Routes = () => {
	const { token } = useAuth();
	const routesForPublic = [
		{
			path: '/login',
			element: <Login />,
		},
		{
			path: '/signup',
			element: <SignUp />,
		},
		{
			path: '/',
			element: <Landing />,
		},
		{
			path: '/*',
			element: <Landing />,
		},
	];

	// Define routes accessible only to authenticated users
	const routesForTeacher = [
		{
			path: '/',
			element: <ProtectedRoute role='teacher' />, // Wrap the component in ProtectedRoute
			children: [
				{
					path: '/examdetails',
					element: <ExamDetails />,
				},
				{
					path: '/ViewApplicationForm',
					element: <ViewApplicationForm />,
				},
				{
					path: '/ViewResponse',
					element: <ViewResponse />,
				},
				{
					path: '/create-exam',
					element: <CreateExam />,
				},
				{
					path: '/teacher-dashboard',
					element: <TeacherDashbboard />,
				},
			],
		},
	];

	// Define routes accessible only to non-authenticated users
	const routesForStudent = [
		{
			path: '/',
			element: <ProtectedRoute role='student' />, // Wrap the component in ProtectedRoute
			children: [
				{
					path: '/exampage',
					element: <ExamPage />,
				},
				{
					path: '/student-dashboard',
					element: <StudentDashbboard />,
				},
				{
					path: '/examform',
					element: <ApplicationForm />,
				},
				{
					path: '/ExamSecurity',
					element: <ExamEntryForm />,
				},
				{
					path: '/submit-response',
					element: <ResponseSubmission />,
				},
				{
					path: '/view-response',
					element: <ViewResponse />,
				},
				// {
				// 	path: '/ViewApplicationForm',
				// 	element: <ViewApplicationForm />,
				// },
				// {
				// 	path: '/ViewResponse',
				// 	element: <ViewResponse />,
				// },
			],
		},
	];
	const routesForNotAuthenticatedOnly = [];

	const router = createBrowserRouter([
		...routesForPublic,
		...(!token ? routesForNotAuthenticatedOnly : []),
		...routesForStudent,
		...routesForTeacher,
	]);

	// Provide the router configuration using RouterProvider
	return <RouterProvider router={router} />;
};

export default Routes;
