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
    
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/teacher/teacherDashboard/');
        setExams(response.data.exams);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchExams();

    
    return () => {
      
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

  
    const newValue = name === 'noOfQuestions' ? Math.max(0, parseInt(value)) : value;

    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/teacherDashboard', formData);
  
      if (response.data.success) {
        const examsResponse = await axios.get('http://localhost:3000/teacherDashboard');
        setExams(examsResponse.data.exams);
      } else {
        console.error('Exam registration failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <div className="teacher-dashboard">
      <h2>Teacher Dashboard</h2>
      <form onSubmit={handleSubmit} className="exam-form">
      <label>
          Exam Name:
          <input type="text" name="examName" value={formData.examName} onChange={handleChange} />
        </label>
        <br />
        <label>
            
          No. of Questions:
          <input
            type="number"
            name="noOfQuestions"
            value={formData.noOfQuestions}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Test Time:
          <input type="text" name="testTime" value={formData.testTime} onChange={handleChange} />
        </label>
        <br />
        <label>
          Test Date and Time:
          <input
            type="datetime-local"
            name="testDateTime"
            value={formData.testDateTime}
            onChange={handleChange}
          />
        </label>
        <br />
      
        <button type="submit" className="register-button">
          Register Exam
        </button>
      </form>
      <ul className="exam-list">
        {exams.map((exam) => (
          <li key={exam.id}>
            <Link to={`/exam/${exam.id}`} className="exam-link">
              {exam.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherDashboard;
