import React, { useState, useEffect } from 'react';
import './ExamEntryForm.css';

const ExamEntryForm = ({ examDetails }) => {
  const initialTime = parseInt(localStorage.getItem('initialTime'));
  const [timeLeft, setTimeLeft] = useState(initialTime ? 180 - Math.floor((Date.now() - initialTime) / 1000) : 180);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft <= 0) {
          clearInterval(timer);
          localStorage.setItem('initialTime', Date.now());
          return 180; 
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const startExam = () => {
    if (isChecked && timeLeft <= 0) {
      console.log('Starting the exam...');
    } else {
      alert('Please agree to the terms and wait for the exam to start.');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="exam-entry-form-container">
      <div className="exam-entry-form">
        <h2>Lets get started</h2>
        <p>Time Left: {formatTime(timeLeft)}</p>
        <div>
          <p>Anti-cheating rules:</p>
          <ol>
            <li>Do not use any unauthorized aids or materials during the exam.</li>
            <li>Do not communicate with others during the exam.</li>
            <li>Do not access any unauthorized websites or applications.</li>
            <li>Do not attempt to copy or share exam questions or answers.</li>
            <li>Violation of exam rules will result in strict penalties.</li>
          </ol>
          <p><strong>Strict Vigilance Policy:</strong> Our system is equipped with monitoring tools to detect cheating behaviors. Any suspicious activity will be investigated, and appropriate actions will be taken.</p>
        </div>
        <label htmlFor="termsCheckbox">I agree to the terms and conditions</label>
        <input
          type="checkbox"
          id="termsCheckbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <br />
        <button onClick={startExam}>Start Exam</button>
      </div>
    </div>
  );
};

export default ExamEntryForm;
