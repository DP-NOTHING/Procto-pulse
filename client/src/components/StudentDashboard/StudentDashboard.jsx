import * as React from 'react';
import ParticipatedExams from './ParticipatedExams';
import PastExams from './PastExams';
import NavBar from '../Landing/NavBar';
import UpcomingExams from './UpcomingExams';
export default function StudentDashboards() {
	return (
		<>
			<NavBar />
			<UpcomingExams />
			<ParticipatedExams />
			<PastExams />
		</>
	);
}
