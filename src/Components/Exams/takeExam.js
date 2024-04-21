import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation , Link} from 'react-router-dom';

function TakeExam() {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [answersFeedback, setAnswersFeedback] = useState({}); 
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState(""); // Define messageColor state
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
    const totalQuestions = questions.length;
    const correctAnswers = Object.values(answersFeedback).filter(
      (feedback) => feedback === "Correct!"
    ).length;
    const percentageCorrect = (correctAnswers / totalQuestions) * 100;
  
    let examResult = "";
    if (percentageCorrect > 50) {
      examResult = "Congratulations! You have passed the exam.";
      if (correctAnswers > totalQuestions / 2) {
        try {
          await axios.post("http://localhost:8080/passExam", {
            examId: examId,
            score: percentageCorrect,
          });
          console.log("Exam passed data sent to the server.");
        } catch (error) {
          console.error("Error posting exam passed data:", error);
        }
      }
    } else {
      examResult = "You have failed the exam.";
    }
  
    setMessage(
      `You got ${correctAnswers} out of ${totalQuestions} questions correct.\n${examResult}`
    );
  };
  

  return (
    <div className="exam-container">
      <h4 className="text-center mt-5 mb-3">Take Exam</h4>
      {questions.map((question) => (
        <div key={question.questionId} className="take-card p-4 mb-3" style={{ backgroundColor: '#f8f9fa' }}>
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
              {answersFeedback[question.questionId] && (
                <p className={answersFeedback[question.questionId] === 'Correct!' ? 'text-success' : 'text-danger'}>
                  {answersFeedback[question.questionId]}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success mt-3"
          onClick={handleTakeExam}
        >
          Submit Exam
        </button>
      </div>
      <div className={`mt-3 ${messageColor}`} style={{ textAlign: "center", fontWeight:"bold" }}>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default TakeExam;
