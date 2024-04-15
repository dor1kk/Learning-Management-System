import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

function TakeExam() {
  const [questions, setQuestions] = useState([]);
  const [answerTexts, setAnswerTexts] = useState({}); // Maintain answer texts for each question
  const location = useLocation();

  useEffect(() => {
    const examId = new URLSearchParams(location.search).get('examId');
    fetchQuestions(examId);
  }, [location]);

  const fetchQuestions = async (examId) => {
    try {
      const response = await axios.get(`http://localhost:8080/examsquestions/${examId}`);
      setQuestions(response.data);
      // Initialize answer texts state for each question
      const initialAnswerTexts = response.data.reduce((acc, question) => {
        acc[question.questionId] = ''; // Set empty answer text for each question
        return acc;
      }, {});
      setAnswerTexts(initialAnswerTexts);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };
  
  const handleFormSubmit = async (questionId) => {
    try {
      const answerText = answerTexts[questionId];
      const response = await axios.get(`http://localhost:8080/examsquestions/${questionId}`);
      const correctAnswer = response.data.answerText; // Get the correct answer from the database
      const isCorrect = answerText.trim().toLowerCase() === correctAnswer.trim().toLowerCase(); // Compare student's answer with the correct answer
      console.log('Answer:', answerText);
      console.log('Correct Answer:', correctAnswer);
      console.log('Is Correct:', isCorrect);
  
      // Update answer status (correct/incorrect) in the state if needed
      // For example, you can maintain another state variable to store the answer status for each question
  
      // You can also calculate the number of correct answers here and display the result message accordingly
      // For now, let's assume we have calculated the correctAnswersCount variable
      const correctAnswersCount = isCorrect ? 1 : 0;
      // Calculate total number of questions
      const totalQuestionsCount = questions.length;
      // Check if the student has passed the exam (more than half correct answers)
      const passedExam = correctAnswersCount > totalQuestionsCount / 2;
  
      if (passedExam) {
        console.log('Congratulations! You have passed the exam.');
      } else {
        console.log('Sorry, you have failed the exam.');
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
    setAnswerTexts({ ...answerTexts, [questionId]: '' }); // Clear answer text for the specific question
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
            <TextField
              label="Your Answer"
              value={answerTexts[question.questionId]} // Use specific answer text for each question
              onChange={(e) => setAnswerTexts({ ...answerTexts, [question.questionId]: e.target.value })} // Update specific answer text
              variant="outlined"
              fullWidth
              style={{ marginTop: '10px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleFormSubmit(question.questionId)} // Pass questionId to handleFormSubmit
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
