import React, { useState, useEffect } from 'react';
import {
  Button, Container, List, ListItem, ListItemText,
  ListItemIcon, IconButton, TextField, Typography,
  Select, MenuItem, FormControl, InputAdornment, Grid, Paper
} from '@mui/material';
import { FaCode, FaBook, FaUser, FaClock } from 'react-icons/fa';
import { Person, School,Edit, Delete, Search, Clear, Add } from '@mui/icons-material';
import AddCourse from './AddCourse';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link,Routes,Route } from 'react-router-dom';
import EditCourse from './EditCourse';

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddCourse, setShowAddCourse] = useState(false);
    const [showEditCourse, setShowEditCourse] = useState(false);
    const [showCourses, setShowCourses] = useState(true); 
  
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/tutorcourses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchCourses();
    }, []);
  
    const handleDeleteCourse = async (id) => {
        try {
          // Log the course ID being sent to the backend
          console.log('Deleting course with ID:', id);
      
          const response = await axios.delete(`http://localhost:8080/courses/${id}`);
          
          if (response.status === 200) {
            fetchCourses();
          } else {
            throw new Error('Failed to delete course');
          }
        } catch (error) {
          console.error('Error deleting course:', error);
        }
      };
      
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const clearFilters = () => {
      setSearchTerm('');
    };
  
    const filteredCourses = courses.filter(course => {
      return course.Title && course.Title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  
    return (
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Grid container spacing={2} alignItems="center" style={{ marginBottom: '20px', marginTop:"30px" }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Search"
              variant="outlined"
              size="medium"
              fullWidth
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <Search />
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Button variant="outlined" onClick={clearFilters} startIcon={<Clear />}>Clear Filters</Button>
          </Grid>
          {showAddCourse ? (
            <Grid item xs={6} sm={3} md={2}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<FaBook />}
                onClick={() => setShowAddCourse(false)} // Toggle to Show Courses view
              >
                Show Courses
              </Button>
            </Grid>
          ) : (
            <Grid item xs={6} sm={3} md={2}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<Add />}
                onClick={() => setShowAddCourse(true)} 
              >
                Add Course
              </Button>
            </Grid>
          )}
        </Grid>
        <br></br>
  
        {showAddCourse && <AddCourse onCancel={() => setShowAddCourse(false)} />}
        {showEditCourse && <EditCourse courseId={showEditCourse} onCancel={() => setShowEditCourse(false)} />}

  
        <Typography variant="body1" style={{ marginBottom: '10px', marginTop:"30px" }}>Total Courses: {courses.length}</Typography>
        <List>
  {filteredCourses.map(course => (
    <ListItem key={course.CourseID} className="course-item" style={{backgroundColor:"#f0f8ff",marginBottom:"6px"}}>
      <ListItemIcon>
        <img src={course.Image} className='img-fluid' style={{width:"70px",marginRight:"25px", height:"70px", borderRadius:"50%"}}></img>
      </ListItemIcon>
      <ListItemText style={{color:"darkblue"}}
        primary={course.Title} 
        secondary={course.Description} 
      />
      <ListItemIcon>
        <IconButton onClick={() => setShowEditCourse(course.CourseID)} aria-label="edit" color="primary">
          <Edit />
        </IconButton>
      </ListItemIcon>
      <ListItemIcon>
        <IconButton onClick={() => handleDeleteCourse(course.CourseID)} aria-label="delete" color="secondary">
          <Delete />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  ))}
</List>
      </Container>
    );
  };
  
  export default CourseManagement;