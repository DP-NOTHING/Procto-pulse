
import React, { useEffect, useState } from 'react';
import './ExamTimer.css';

const ExamTimer = ({ exams }) => {
  return (
    <div>
      {exams.map((exam, index) => (
        <SingleExamTimer key={index} {...exam} />
      ))}
    </div>
  );
};

const SingleExamTimer = ({ examName, startTime }) => {
  const [duration, setDuration] = useState(calculateDuration(startTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(calculateDuration(startTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const formattedStartTime = new Date(startTime).toLocaleString();

  return (
    <div className="exam-container">
      <div className="exam-info">
        <h3>{examName}</h3>
        <p>Start Time: {formattedStartTime}</p>
      </div>
      <div className="timer">
        <p>Duration: {formatTime(duration)}</p>
      </div>
    </div>
  );
};

function calculateDuration(startTime) {
  const now = new Date();
  const endTime = new Date(startTime);
  const duration = Math.max(0, endTime - now);

  return {
    days: Math.floor(duration / (1000 * 60 * 60 * 24)),
    hours: Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((duration % (1000 * 60)) / 1000),
  };
}

function formatTime(duration) {
  return `${duration.days}d ${duration.hours}h ${duration.minutes}m ${duration.seconds}s`;
}

export default ExamTimer;
