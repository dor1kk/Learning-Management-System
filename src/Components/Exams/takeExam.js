import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { notification, Modal } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, SmileOutlined, FrownOutlined } from '@ant-design/icons'; // Import icons

function TakeExam({role}) {

  if (role !== "Student") {
    window.location.href = "/unauthorized";
  }
  

  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [answersFeedback, setAnswersFeedback] = useState({});
  const [examResult, setExamResult] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [percentageCorrect, setPercentageCorrect] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const examId = searchParams.get('examId');

  useEffect(() => {
    fetchQuestions(examId);
  }, [examId]);

  const fetchQuestions = async (examId) => {
    try {
      const response = await axios.get(`http://localhost:8080/examsquestions/${examId}`);
      setQuestions(response.data);
      const initialSelectedOptions = response.data.reduce((acc, question) => {
        acc[question.questionId] = null;
        return acc;
      }, {});
      setSelectedOptions(initialSelectedOptions);
      setTotalQuestions(response.data.length); // Set total number of questions
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: option });
  };

  const handleFormSubmit = (e, questionId, correctOptionName) => {
    e.preventDefault();
    const selectedOptionText = selectedOptions[questionId];
    const correctOptionText = questions.find(q => q.questionId === questionId)[correctOptionName];
    const isCorrect = selectedOptionText === correctOptionText;
    setAnswersFeedback(prevFeedback => ({
      ...prevFeedback,
      [questionId]: isCorrect ? 'Correct!' : 'Incorrect!'
    }));
  };

  const handleTakeExam = async () => {
    console.log("Submitting exam...");
    const correct = Object.values(answersFeedback).filter(
      (feedback) => feedback === "Correct!"
    ).length;
    const percentage = (correct / totalQuestions) * 100;
    setCorrectAnswers(correct);
    setPercentageCorrect(percentage);
    let resultMessage = "";
    if (percentage > 50) {
      resultMessage = "Congratulations! You have passed the exam.";
      if (correct > totalQuestions / 2) {
        try {
          await axios.post("http://localhost:8080/passExam", {
            examId: examId,
            score: percentage,
          });
          console.log("Exam passed data sent to the server.");
        } catch (error) {
          console.error("Error posting exam passed data:", error);
          notification.error({
            message: 'Error',
            description: 'An error occurred while submitting the exam.',
          });
        }
      }
    } else {
      resultMessage = "You have failed the exam.";
    }
    setExamResult(resultMessage);
    setModalVisible(true);
  };

  const ResultModal = () => {
    return (
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        centered
      >
        <div style={{ textAlign: 'center' }}>
          {examResult.includes('passed') ? (
            <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: '48px', color: '#ff4d4f' }} />
          )}
          <h2>{examResult}</h2>
          <p>{`You got ${correctAnswers} out of ${totalQuestions} questions correct.`}</p>
          <p>{`Percentage Correct: ${percentageCorrect}%`}</p>
          {examResult.includes('passed') ? (
            <SmileOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
          ) : (
            <FrownOutlined style={{ fontSize: '36px', color: '#ff4d4f' }} />
          )}
        </div>
      </Modal>
    );
  };

  return (
    <div className="container p-5">
      {questions.map((question) => (
        <div key={question.questionId} className="take-card p-4 mb-3 bg-white" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }} >
          <div className="card-body">
            <h5 className="card-title">{question.questionText}</h5>
            <div className="d-flex flex-column">
              {['option1', 'option2', 'option3', 'option4'].map((optionKey) => (
                <div key={optionKey} className="form-check me-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question_${question.questionId}`}
                    value={question[optionKey]}
                    onChange={(e) => handleOptionSelect(question.questionId, e.target.value)}
                  />
                  <label className="form-check-label" htmlFor={`question_${question.questionId}`}>
                    {question[optionKey]}
                  </label>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-primary mt-2"
                onClick={(e) => handleFormSubmit(e, question.questionId, question.correctOption)}
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-center">
        <button
          className="btn mt-3"
          style={{ backgroundColor: "#00538C", color: "white" }}
          onClick={handleTakeExam}
        >
          Submit Exam
        </button>
      </div>
      <ResultModal />
    </div>
  );
}

export default TakeExam;
