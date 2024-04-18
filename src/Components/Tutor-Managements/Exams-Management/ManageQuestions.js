import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Collapse, ListItemIcon, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ExpandLess, ExpandMore, Add, School, Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function ManageQuestions() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newAnswerText, setNewAnswerText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]); // Array to store option values
  const [correctOption, setCorrectOption] = useState(""); // State to store the correct option
  const [showAddForm, setShowAddForm] = useState(false);

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

  const fetchQuestionsByExam = async (examId) => {
    try {
      const response = await axios.get(`http://localhost:8080/examsquestions?examId=${examId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
  };

  const fetchAndDisplayQuestions = async (examId) => {
    try {
      const questions = await fetchQuestionsByExam(examId);
      setQuestions(questions);
    } catch (error) {
      console.error("Error fetching and displaying questions:", error);
    }
  };

  const handleExamClick = (exam) => {
    setSelectedExam(exam);
    setOpen(true);
    fetchAndDisplayQuestions(exam.examId);
  };

  const handleCollapse = () => {
    setOpen(!open);
  };

  const handleAddQuestion = () => {
    setShowAddForm(true);
  };

  const handleDelete = async (questionId) => {
    try {
      await axios.delete(`http://localhost:8080/question/${questionId}`, { data: { questionId } });
      fetchExams();
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleCorrectOptionChange = (event) => {
    setCorrectOption(event.target.value);
  };

  const handleFormSubmit = async () => {
    try {
      console.log('Submitting form with data:', {
        examId: selectedExam.examId,
        questionText: newQuestionText,
        answerText: newAnswerText,
        options,
        correctOption
      });

      await axios.post('http://localhost:8080/examsquestion', {
        examId: selectedExam.examId,
        questionText: newQuestionText,
        answerText: newAnswerText,
        options,
        correctOption
      });

      fetchQuestionsByExam(selectedExam.examId);
      console.log('New question added:', newQuestionText);
    } catch (error) {
      console.error('Error adding new question:', error);
    }

    setNewQuestionText("");
    setNewAnswerText("");
    setOptions(["", "", "", ""]); // Reset options
    setCorrectOption("");
    setShowAddForm(false); // Close the form after submission
  };

  return (
    <Container style={{ backgroundColor: '#f9f9f9', height: "100vh", padding: '20px' }}>
      <h4 className="text-center mt-5 mb-3" style={{ color: '#333' }}>Select the Exam You Want to Manage Questions!</h4>
      <List className="d-flex flex-row">
        {exams.map(exam => (
          <ListItem
            key={exam.examId}
            className="listitem d-flex align-items-center mb-3"
            style={{ marginRight: "15px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", backgroundColor: '#fff', color: '#333' }}
            onClick={() => handleExamClick(exam)}
            selected={selectedExam === exam}
            button
          >
            <ListItemIcon>
              <School />
            </ListItemIcon>
            <ListItemText className="text-uppercase font-weight-bold" primary={exam.examName} />
          </ListItem>
        ))}
      </List>

      {selectedExam && (
        <List>
          <ListItem button onClick={handleCollapse} style={{ backgroundColor: '#fff', color: '#333' }}>
            <ListItemText primary={`Questions for ${selectedExam.examName}`} />
            {open ? <ExpandLess style={{ color: '#4caf50' }} /> : <ExpandMore style={{ color: '#f44336' }} />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {questions.map((question, index) => (
                <ListItem
                  key={index}
                  button
                  style={{ paddingLeft: '40px', backgroundColor: '#f9f9f9', color: '#333' }}
                >
                  <ListItemText primary={`${index + 1}. ${question.questionText}`} />
                  <ListItemText primary={`Answer: ${question.answerText}`} />
                  <Link to={"/editquestion"} className='btn btn-secondary' style={{ marginRight: "8px" }} ><Edit /> Edit</Link>
                  <button className='btn btn-danger' onClick={() => handleDelete(question.questionId)} ><Delete /> Delete</button>
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddQuestion}
            style={{ marginTop: '10px', backgroundColor: 'darkblue', color: '#fff' }}
          >
            <Add style={{ marginRight: '5px' }} /> Add Question
          </Button>
          {showAddForm && (
            <div>
              <TextField
                label="Question Text"
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                variant="outlined"
                fullWidth
                style={{ marginTop: '10px' }}
              />
              <TextField
                label="Answer Text"
                value={newAnswerText}
                onChange={(e) => setNewAnswerText(e.target.value)}
                variant="outlined"
                fullWidth
                style={{ marginTop: '10px' }}
              />
              {[0, 1, 2, 3].map((index) => (
                <TextField
                  key={index}
                  label={`Option ${index + 1}`}
                  value={options[index]}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: '10px' }}
                />
              ))}
              <FormControl variant="outlined" fullWidth style={{ marginTop: '10px' }}>
                <InputLabel>Correct Option</InputLabel>
                <Select
  value={correctOption}
  onChange={handleCorrectOptionChange}
  label="Correct Option"
>
  {[0, 1, 2, 3].map((index) => (
    <MenuItem key={index} value={index + 1}>{`Option ${index + 1}`}</MenuItem>
  ))}
</Select>

              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFormSubmit}
                style={{ marginTop: '10px', backgroundColor: '#ffc107', color: '#333' }}
              >
                Submit
              </Button>
            </div>
          )}
        </List>
      )}
    </Container>
  );
}

export default ManageQuestions;
