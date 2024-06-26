// EditCourse.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const EditCourse = ({ courseId }) => {
  const [editCourseData, setEditCourseData] = useState({
    Title: '',
    Description: '',
    Category: '',
    Image: '',
    Prerequisites: '',
    Duration: '',
    Lectures: 0,
    Assignments: 0,
  });

  useEffect(() => {
    fetchCourseData(courseId);
  }, [courseId]);

  const fetchCourseData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/courses/${id}`);
      setEditCourseData(response.data);
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditCourseData({ ...editCourseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/courses/${courseId}`, editCourseData);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <Container className='container ' maxWidth="md" style={{ marginTop: '20px' }}>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="// EditCourse.js (continued)
              Title"
              variant="outlined"
              fullWidth
              name="Title"
              value={editCourseData.Title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              name="Category"
              value={editCourseData.Category}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              name="Description"
              value={editCourseData.Description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Prerequisites"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              name="Prerequisites"
              value={editCourseData.Prerequisites}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Duration"
              variant="outlined"
              fullWidth
              name="Duration"
              value={editCourseData.Duration}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              name="Image"
              value={editCourseData.Image}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Update Course
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditCourse;

