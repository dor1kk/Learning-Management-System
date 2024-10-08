import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Grid, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const AddCourse = ({ onClose }) => {
  const [tutorId, setTutorId] = useState('');
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    prerequisites: '',
    duration: '',
    lectures: 0,
    assignments: 0,
    tutorid: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8080/userid')
      .then(res => {
        console.log(res.data);
        if (res.data.valid) {
          setTutorId(res.data.userid);
          setCourseData({ ...courseData, tutorid: res.data.userid });
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/courses', courseData);
      onClose();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className='container'>
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                name="title"
                value={courseData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                label="Category"
                variant="outlined"
                fullWidth
                name="category"
                value={courseData.category}
                onChange={handleChange}
              >
                <MenuItem value="Frontend">Frontend</MenuItem>
                <MenuItem value="Backend">Backend</MenuItem>
                <MenuItem value="Database">Database</MenuItem>
                <MenuItem value="DSA">DSA</MenuItem>
                <MenuItem value="Mathematics">Mathematics</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                name="description"
                value={courseData.description}
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
                name="prerequisites"
                value={courseData.prerequisites}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Duration"
                variant="outlined"
                fullWidth
                name="duration"
                value={courseData.duration}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                name="image"
                value={courseData.image}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Add Course
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default AddCourse;
