import React, { useState } from 'react';
import { Container, List, ListItem, ListItemText, ListItemIcon, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Grid, InputAdornment } from '@mui/material';
import { Person, School, Add, Edit, Delete, Search, Clear } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import courses from '../Courses/Coursedata';
import "./Students.css";


const initialStudents = [
  { id: 1, image:"https://cdn-icons-png.freepik.com/512/147/147131.png", name: 'John Doe', grade: 'A', courseId: "1" },
  { id: 2, image:"https://w7.pngwing.com/pngs/643/98/png-transparent-computer-icons-avatar-mover-business-flat-design-corporate-elderly-care-microphone-heroes-company-thumbnail.png", name: 'Jane Smith', grade: 'B', courseId: "2" },
  { id: 3, image:"https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png", name: 'Alex Johnson', grade: 'A+', courseId: "3" },
  { id: 4, image:"https://cdn-icons-png.freepik.com/512/147/147129.png", name: 'Sarah Brown', grade: 'B-', courseId: "4" },
  { id: 5, image:"https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg", name: 'Michael Davis', grade: 'C', courseId: "5" },
  { id: 6, image:"https://mir-s3-cdn-cf.behance.net/project_modules/disp/ce54bf11889067.562541ef7cde4.png", name: 'Emily Wilson', grade: 'A-', courseId: "6" }
];

const StudentList = () => {
  const [students, setStudents] = useState(initialStudents);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [newStudent, setNewStudent] = useState({ name: '', grade: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');

  const handleAddStudent = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSaveStudent = () => {
    handleCloseAddDialog();
  };

  const handleUpdateStudent = () => {
    handleCloseEditDialog();
  };

  const handleDeleteStudent = (id) => {
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setSelectedStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGradeFilterChange = (e) => {
    setGradeFilter(e.target.value);
  };

  const handleCourseFilterChange = (e) => {
    setCourseFilter(e.target.value);
  };

  const clearFilters = () => {
    setGradeFilter('');
    setCourseFilter('');
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (gradeFilter === '' || student.grade === gradeFilter) &&
    (courseFilter === '' || student.courseId === courseFilter)
  );

  return (
    <Container>
      <Grid container spacing={2} alignItems="center" style={{ marginBottom: '20px', marginTop:"30px" }}>
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
          <FormControl fullWidth>
            <Select
              value={courseFilter}
              onChange={handleCourseFilterChange}
              displayEmpty
            >
              <MenuItem value="">All Courses</MenuItem>
              {courses.map(course => (
                <MenuItem key={course.id} value={course.id}>{course.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <Button variant="outlined" onClick={clearFilters} startIcon={<Clear />}>Clear Filters</Button>
        </Grid>
      </Grid>
      <Typography variant="body1" style={{ marginBottom: '10px' }}>Total Students: {filteredStudents.length}</Typography>
      <List>
        {filteredStudents.map(student => {
          const course = courses.find(course => course.id === student.courseId);
          return (
            <ListItem key={student.id} className="student-item">
              <ListItemIcon>
                <img src={student.image} style={{borderRadius:"50%", marginRight:"20px", height:"60px", width:"60px"}}></img>
              </ListItemIcon>
              <ListItemText 
                primary={student.name} 
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" color="textPrimary">
                      Grade: {student.grade}
                    </Typography>
                    <br />
                    Course: {course ? course.title : 'N/A'}
                  </React.Fragment>
                } 
              />
              <ListItemIcon>
                <School />
              </ListItemIcon>
              <IconButton onClick={() => handleEditStudent(student)} aria-label="edit" color="primary">
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDeleteStudent(student.id)} aria-label="delete" color="secondary">
                <Delete />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <IconButton onClick={handleAddStudent} aria-label="add" className="add-button" color="primary">
        <Add />
      </IconButton>

      {/* Add Student Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={newStudent.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Grade"
            name="grade"
            fullWidth
            value={newStudent.grade}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="secondary">Cancel</Button>
          <Button onClick={handleSaveStudent} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={selectedStudent.name}
            onChange={handleChangeEdit}
          />
          <TextField
            margin="dense"
            label="Grade"
            name="grade"
            fullWidth
            value={selectedStudent.grade}
            onChange={handleChangeEdit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">Cancel</Button>
          <Button onClick={handleUpdateStudent} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentList;
