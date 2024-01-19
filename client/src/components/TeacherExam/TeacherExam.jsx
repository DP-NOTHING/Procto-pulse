// client/src/TeacherExams.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherExams = ({ teacherId }) => {
  const [teacherExams, setTeacherExams] = useState([]);

  useEffect(() => {
    // Fetch the list of exams for a particular teacher from the backend API
    const fetchTeacherExams = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/teacher/${teacherId}/exams`);
        setTeacherExams(response.data.teacherExams);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTeacherExams();

    // Cleanup function to prevent memory leaks
    return () => {
      // Your cleanup logic, if needed
    };
  }, [teacherId]);

  return (
    <div>
      <h2>Teacher Exams</h2>
      <ul>
        {teacherExams.map((exam) => (
          <li key={exam.id}>
            Exam Name: {exam.name} | Registrations: {exam.registrationCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherExams;
