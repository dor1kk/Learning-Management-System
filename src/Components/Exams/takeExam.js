import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

function TakeExam() {
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const location = useLocation();

  useEffect(() => {
    const examId = new URLSearchParams(location.search).get('examId');
    fetchQuestions(examId);
  }, [location]);

  const fetchQuestions = async (examId) => {
    // Dummy data for demonstration
    const dummyData = [
      {
        questionId: 1,
        questionText: 'What is the capital of France?',
        correctAnswer: 'Paris',
        options: ['Paris', 'Berlin', 'London', 'Rome']
      },
      {
        questionId: 2,
        questionText: 'What is the largest planet in the solar system?',
        correctAnswer: 'Jupiter',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn']
      },
      // Add more dummy questions here if needed
    ];

    setQuestions(dummyData);

    // Initialize selectedOption state for each question
    const initialSelectedOptions = dummyData.reduce((acc, question) => {
      acc[question.questionId] = null; // Set null as initial selected option for each question
      return acc;
    }, {});
    setSelectedOption(initialSelectedOptions);
  };

  const handleOptionSelect = (questionId, option) => {
    setSelectedOption({ ...selectedOption, [questionId]: option });
  };

  const handleFormSubmit = async (questionId) => {
    try {
      const selectedOptionText = selectedOption[questionId];
  
      // Submit the selected option as the answer
      console.log('Submitted Answer:', selectedOptionText);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleTakeExam = async () => {
    try {
      // Implement your logic to submit the exam to the server
      console.log('Submitting exam...');
    } catch (error) {
      console.error('Error submitting exam:', error);
    }
  };

  return (
    <Container style={{ backgroundColor: '#f9f9f9', height: '100vh', padding: '20px' }}>
      <h4 className="text-center mt-5 mb-3" style={{ color: '#333' }}>Take Exam</h4>
      {questions.map((question) => (
        <Card key={question.questionId} className="mb-3" style={{ backgroundColor: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Typography variant="h6" component="h2">{question.questionText}</Typography>
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedOption[question.questionId] === option ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleOptionSelect(question.questionId, option)}
                style={{ marginTop: '10px', marginRight: '10px' }}
              >
                {option}
              </Button>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleFormSubmit(question.questionId)}
              style={{ marginTop: '10px', backgroundColor: '#ffc107', color: '#333' }}
            >
              Submit Answer
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleTakeExam}
        style={{ marginTop: '20px', backgroundColor: 'green', color: '#fff' }}
      >
        Submit Exam
      </Button>
    </Container>
  );
}

export default TakeExam;
