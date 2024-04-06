import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import axios from 'axios';

function Edit() {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/student/${id}`);
        setStudent(response.data);
        setName(response.data.Name);
        setGrade(response.data.Grade);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };
    fetchStudent();
  }, [id]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handleUpdateStudent = async () => {
    try {
      await axios.put(`http://localhost:8080/student/${id}`, {
        Name: name,
        Grade: grade,
      });
      // Redirect the user to another page after successful update
      window.location.href = '/Students'; // Change the URL as needed
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };
  

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Edit Student</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Grade"
            variant="outlined"
            value={grade}
            onChange={handleGradeChange}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdateStudent}
        style={{ marginTop: '20px' }}
      >
        Save
      </Button>
    </Container>
  );
}

export default Edit;
