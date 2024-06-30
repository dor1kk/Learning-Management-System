import React, { useState, useEffect } from 'react';
import {
  Container, List, ListItem, ListItemText,
  ListItemIcon, IconButton, TextField, Typography,
  Select, MenuItem, FormControl, Grid, InputAdornment
} from '@mui/material';
import { Person, School, Delete, Search, Clear } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Button } from 'antd';

const StudentList = ({ role }) => {
  if (role !== "Tutor") {
    window.location.href = "/unauthorized";
  }

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');

  const fetchStudents = async () => {
    try {
      const studentResponse = await axios.get('http://localhost:8080/student');
      setStudents(studentResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGradeFilterChange = (e) => {
    setGradeFilter(e.target.value);
  };

  const clearFilters = () => {
    setGradeFilter('');
    setCourseFilter('');
  };

  const handleDelete = (ID, CourseID) => async () => {
    try {
      console.log(`Deleting student with ID: ${ID} from course: ${CourseID}`);
      await axios.delete('http://localhost:8080/deletestudent', {
        data: {
          Student: ID,
          Course: CourseID
        }
      });
      console.log('Student deleted successfully');
      // Re-fetch students after delete
      fetchStudents();
    } catch (err) {
      console.log('Error deleting student:', err);
    }
  };
  
  return (
    <Container>
      <Grid container spacing={2} alignItems="center" style={{ marginBottom: '20px', marginTop: "30px" }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search"
            variant="outlined"
            size="medium"
            fullWidth
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6} sm={2} md={2}>
          <FormControl fullWidth>
            <Select
              value={gradeFilter}
              onChange={handleGradeFilterChange}
              displayEmpty
            >
              <MenuItem value="">All Grades</MenuItem>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <Button variant="outlined" onClick={clearFilters} startIcon={<Clear />}>Clear Filters</Button>
        </Grid>
      </Grid>
      <Typography variant="body1" style={{ marginBottom: '10px' }}>Total Students: {students.length}</Typography>
      <List>
        {students.map(student => (
          <ListItem key={student.ID} className="student-item">
            <ListItemIcon>
              <img src={student.Image} style={{ borderRadius: "50%", marginRight: "20px", height: "60px", width: "60px" }} alt="Student"></img>
            </ListItemIcon>
            <ListItemText
              primary={student.Name}
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2" color="textPrimary">
                    Grade: {student.Grade}
                  </Typography>
                  <br />
                  Course: {student.Title}
                </React.Fragment>
              }
            />
            <ListItemIcon>
              <School />
            </ListItemIcon>
            <IconButton aria-label="delete" color="secondary" onClick={handleDelete(student.UserId, student.CourseID)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default StudentList;
