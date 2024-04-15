import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import './Exams.css';

const Exam = () => {
  const [exams, setExams] = useState([]);
  const location = useLocation();
  console.log("Location:", location); // Log the location object
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get('courseId');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');

  useEffect(() => {
    fetchExams();
  }, [courseId]);

  const fetchExams = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/exams-course/${courseId}`);
      setExams(response.data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const handleExamClick = (examId) => {
    setSelectedExamId(examId);
    setShowQuestionForm(!showQuestionForm);
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
      <h2 className="test-card-title">My Course Exams</h2>
      <div className="test-card-container">
        {exams.map((exam) => (
          <div key={exam.examId} className="test-card mb-2 bg-light">
            <div className="test-card-body">
              <h5 className="test-card-title p-2">{exam.examName}</h5>
              <p className="test-card-text text-info p-2">
                {formatDate(exam.startTime)} to {formatDate(exam.endTime)}
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
