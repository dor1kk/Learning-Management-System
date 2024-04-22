import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { FaPencilAlt, FaCalendarAlt, FaInfoCircle, FaArrowLeft } from 'react-icons/fa';
import { Card } from 'antd';
import './Exams.css';

const { Meta } = Card;

const Exam = () => {
  const [passedExams, setPassedExams] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get('courseId');

  useEffect(() => {
    fetchPassedExams();
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
    <div className="c-container p-5">
      <Link to="/home/exams" className="go-back-link" style={{marginBottom:"35px"}}><FaArrowLeft /> Go Back</Link>
      {passedExams.length > 0 && (
        <div className="test-card-container mt-5">
          {passedExams.map((exam) => (
            <Card key={exam.passed_exam_id} className="test-card mb-2" style={{ backgroundColor: '#ffffff' }}>
              <Meta
                title={<h5 className="exam-title text-primary"><FaPencilAlt /> {exam.examName}</h5>}
                description={
                  <div>
                    <p className="exam-text"><FaCalendarAlt /> Date Completed: {formatDate(exam.date_completed)}</p>
                    <img src={exam.Image} alt="Passed" style={{ height: '44px', marginRight: '8px' }} />
                    <span>Exam Score: {exam.score}</span>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      )}
      {passedExams.length === 0 && (
        <div className="test-card-container mt-5">
          <h3 className='text-success'>You haven't passed any exams yet.</h3>
        </div>
      )}
    </div>
  );
};

export default Exam;
