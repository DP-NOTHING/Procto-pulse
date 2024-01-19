import React from 'react';
import Login from './components/Login/Login';
import Landing from './components/Landing/Landing';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	NavLink,
} from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import ExamTimer from './components/ExamTimer/ExamTimer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeacherDashboard from './components/TeacherDashboard/TeacherDashboard';
import TeacherExams from './components/TeacherExam/TeacherExam';

function App() {
  const exams = Array.from({ length: 10 }, (_, index) => ({
    examName: `Exam ${index + 1}`,
    startTime: `2024-01-09 12:${index < 10 ? '0' + index : index}:00`,
  }));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<ExamTimer exams={exams} />} />
        <Route path="/teacherDashboard" element={<TeacherDashboard/>}/>
        <Route path="/teacherexam" element={<TeacherExams/>}/>
        <Route
					path='/landing-page'
					element={<Landing />}
				/>
      </Routes>
    </Router>
  );
}

export default App;
