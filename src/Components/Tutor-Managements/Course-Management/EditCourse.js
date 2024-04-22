import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {notification} from 'antd'

const EditCourse = () => {
  const location = useLocation();
  const courseId = location.pathname.split('/')[3];

  const [courseData, setCourseData] = useState({
    CourseId:courseId,
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
    axios.get(`http://localhost:8080/courses/${courseId}`)
      .then(res => {
        console.log(res.data); 
        setCourseData(res.data); 
      })
      .catch(err => console.log(err));
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/courses/${courseId}`, courseData);
      notification.success({
        message: 'Updated Succesfully',
        description: 'You have updated the course succesfully',
      });
      window.location.href="/Home/T-CoursesManagement"
      }catch (error) {
      console.error('Error updating course:', error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while updating the course. Please try again later.',
      });
    }
  };

  return (
    <Container className='c-container p-5' maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom className='text-primary'> 
        Edit Course
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              name="Title"
              value={courseData.Title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              name="Category"
              value={courseData.Category}
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
              value={courseData.Description}
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
              value={courseData.Prerequisites}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Duration"
              variant="outlined"
              fullWidth
              name="Duration"
              value={courseData.Duration}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              name="Image"
              value={courseData.Image}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Number of Lectures"
              variant="outlined"
              fullWidth
              type="number"
              name="Lectures"
              value={courseData.Lectures}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Number of Assignments"
              variant="outlined"
              fullWidth
              type="number"
              name="Assignments"
              value={courseData.Assignments}
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
