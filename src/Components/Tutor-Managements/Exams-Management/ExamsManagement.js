import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Modal } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);

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

  const handleDelete = async () => {
    if (examToDelete) {
      try {
        await axios.delete(`http://localhost:8080/exams/${examToDelete}`, { data: { examId: examToDelete } });
        fetchExams();
        setModalVisible(false);
      } catch (error) {
        console.error('Error deleting exam:', error);
      }
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

  const handleDeleteConfirmation = (examId) => {
    setModalVisible(true);
    setExamToDelete(examId); // Set the examId to be deleted
  };

  return (
    <div className="c-container p-5">
      <h2>Exam Management</h2>
      <div className='d-flex flex-row' style={{ gap: "15px" }}>
        <Link to={"/home/addexam"} className='btn btn-primary'>Add Exam</Link>
        <Link to={"/home/manageQuestions"} className='btn btn-primary'>Manage Questions</Link>
      </div>
      <ul className="mt-4">
        {exams.map((exam) => (
          <li key={exam.examId} className="mb-2 p-2 d-flex flex-row list-group-item bg-white w-100" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
            <span onClick={() => handleExamClick(exam.examId)} style={{ cursor: 'pointer' }}>
              {exam.examName} - {formatDate(exam.startTime)} to {formatDate(exam.endTime)}
            </span>
            <div className='d-flex flex-row' style={{ marginLeft: 'auto' }}>
              <Link to={`/home/editexam/${exam.examId}`} className="mt-2" style={{ backgroundColor: "white", color: "#53a8b6", borderRadius: "50%" }}><Edit /></Link>
              <Button onClick={() => handleDeleteConfirmation(exam.examId)} className=" ms-2 " style={{ border: "none", backgroundColor: "white", color: "red", borderRadius: "50%" }}><Delete /></Button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        title="Delete Exam"
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        onOk={handleDelete}
      >
        <p>Are you sure you want to delete this exam?</p>
      </Modal>
    </div>
  );
};

export default ExamManagement;
