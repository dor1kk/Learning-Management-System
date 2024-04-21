import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import "./Exam.css";

const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get('http://localhost:8080/exams');
      setExams(response.data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const handleDelete = async (examId) => {
    try {
      await axios.delete(`http://localhost:8080/exams/${examId}`, { data: { examId } });
      fetchExams();
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  const handleExamClick = (examId) => {
    setSelectedExamId(examId);
    setShowQuestionForm(!showQuestionForm);
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/examsquestion', { selectedExamId, questionText, answerText });
      setQuestionText('');
      setAnswerText('');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric"
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="exam-container ">
      <h2>Exam Management</h2>
      <div className='d-flex flex-row ' style={{gap:"15px"}}>
      <Link to={"/home/addexam"} className='btn btn-primary'>Add Exam</Link>
      <Link to={"/home/manageQuestions"} className='btn btn-primary'>Manage Questions</Link>

      </div>
      <ul className="mt-4">
        {exams.map((exam) => (
          <li key={exam.examId} className="mb-2 p-2 d-flex flex-row list-group-item bg-light w-100" style={{ backgroundColor: "lightgray" }}>
            <span onClick={() => handleExamClick(exam.examId)} style={{ cursor: 'pointer' }}>
              {exam.examName} - {formatDate(exam.startTime)} to {formatDate(exam.endTime)}
            </span>
            <div className='d-flex flex-row' style={{ marginLeft: 'auto' }}>
              <Link to={`/home/editexam/${exam.examId}`} className="btn btn-secondary ms-2"> <Edit /> Edit</Link>
              <button onClick={() => handleDelete(exam.examId)} className="btn btn-danger ms-2"> <Delete /> Delete</button>
            </div>
          </li>
        ))}
      </ul>

      
       
   
    </div>
  );
};

export default ExamManagement;
