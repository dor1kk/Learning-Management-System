import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { FaPencilAlt, FaCalendarAlt, FaInfoCircle, FaArrowLeft } from 'react-icons/fa'; // Importing FaArrowLeft
import { IoMdSchool } from 'react-icons/io';
import './Exams.css';

const Exam = () => {
  const [passedExams, setPassedExams] = useState([]);
  const [availableExams, setAvailableExams] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get('courseId');

  useEffect(() => {
    fetchPassedExams();
    fetchAvailableExams();
  }, [courseId]);

  const fetchPassedExams = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/passedexams`, {
        params: {
          courseId: courseId
        }
      });
      setPassedExams(response.data);
    } catch (error) {
      console.error('Error fetching passed exams:', error);
    }
  };

  const fetchAvailableExams = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/available-exams/${courseId}`);
      setAvailableExams(response.data);
    } catch (error) {
      console.error('Error fetching available exams:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="test-container p-4">
      <Link to="/home/exams" className="go-back-link" style={{marginBottom:"35px"}}><FaArrowLeft /> Go Back</Link>
      <div className="test-card-container mt-5">
        <h3 className='text-success'><FaPencilAlt /> Passed Exams</h3>
        {passedExams.map((exam) => (
          <div key={exam.exam_id} className="test-card mb-2 bg-light">
            <div className="test-card-body">
              <h5 className="test-card-title p-2"><IoMdSchool /> Exam Score: {exam.score}</h5>
              <p className="test-card-text text-info p-2">
                <FaCalendarAlt /> Date Completed: {formatDate(exam.date_completed)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="test-card-container">
        <h3 className='text-primary'><FaInfoCircle /> Available Exams</h3>
        {availableExams.map((exam) => (
          <div key={exam.examId} className="test-card mb-2 bg-light">
            <div className="test-card-body">
              <h5 className="test-card-title p-2"><FaPencilAlt /> {exam.examName}</h5>
              <p className="test-card-text text-info p-2">
                <FaCalendarAlt /> {formatDate(exam.startTime)} to {formatDate(exam.endTime)}
              </p>
              <div className="test-card-btn-group">
                <Link to={`/home/takeExam?examId=${exam.examId}`} className="test btn btn-primary p-1" style={{marginLeft:"10px", marginBottom:"10px"}}> <FaPencilAlt /> Take the Exam</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exam;
