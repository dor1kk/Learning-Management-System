import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Collapse, ListItemIcon, Button, TextField } from '@mui/material';
import { ExpandLess, ExpandMore, Add, School } from '@mui/icons-material';
import "./Lecture.css"

function LectureManagement() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [newLectureTitle, setNewLectureTitle] = useState("");
  const [newLectureImageUrl, setNewLectureImageUrl] = useState("");
  const [newLectureDescription, setNewLectureDescription] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [lectureCount, setLectureCount] = useState(0);
  const [lectures, setLectures] = useState([]); 

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tutorcourses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchLecturesByCourse = async (courseID) => {
    try {
      const response = await axios.get(`http://localhost:8080/lectures/${courseID}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lectures:', error);
      return [];
    }
  };

  const fetchAndDisplayLectures = async (courseID) => {
    try {
      const lectures = await fetchLecturesByCourse(courseID);
      setLectures(lectures);
      setLectureCount(lectures.length);
    } catch (error) {
      console.error("Error fetching and displaying lectures:", error);
    }
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setOpen(true);
    fetchAndDisplayLectures(course.CourseID);
  };

  const handleCollapse = () => {
    setOpen(!open);
    setSelectedLecture(null); 
  };
  const handleLectureClick = (index) => {
    if (selectedLecture === index) {
      setSelectedLecture(null); 
    } else {
      setSelectedLecture(index); 
    }
    setShowAddForm(false); 
  };
  

  const handleAddLecture = () => {
    setShowAddForm(true); 
 
  };

  const handleFormSubmit = async () => {
    try {
      await axios.post('http://localhost:8080/addlecture', {
        CourseID: selectedCourse.CourseID,
        LectureTitle: newLectureTitle,
        LectureImageUrl: newLectureImageUrl,
        LectureDescription: newLectureDescription,
        LectureIndex: lectureCount
      });
      
      await fetchAndDisplayLectures(selectedCourse.CourseID);
  
      setNewLectureTitle("");
      setNewLectureImageUrl("");
      setNewLectureDescription("");
  
      console.log('New lecture added:', newLectureTitle);
    } catch (error) {
      console.error('Error adding new lecture:', error);
    }
  };
  

  return (
    <Container style={{ backgroundColor: '#f9f9f9', height:"100vh", padding: '20px' }}>
      <h4 className="text-center mt-5 mb-3" style={{ color: '#333' }}>Select the Course You Want to Add Lecture!</h4>
      <List className="d-flex flex-row">
        {courses.map(course => (
          <ListItem
            key={course.CourseID}
            className="listitem d-flex align-items-center mb-3"
            style={{ marginRight: "15px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", backgroundColor: '#fff', color: '#333' }}
            onClick={() => handleCourseClick(course)}
            selected={selectedCourse === course}
            button
          >
         
            <img src={course.Image} style={{width:"60px", height:"60px", borderRadius:"50%", marginRight:"20px"}}></img>
            <ListItemText className="text-uppercase font-weight-bold" primary={course.Title} />
          </ListItem>
        ))}
      </List>

      {selectedCourse && (
        <List>
          <ListItem button onClick={handleCollapse} style={{ backgroundColor: '#fff', color: '#333' }}>
            <ListItemText primary={`Number of Lectures: ${lectureCount}`} />
            {open ? <ExpandLess style={{ color: '#4caf50' }} /> : <ExpandMore style={{ color: '#f44336' }} />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {lectures.map((lecture, index) => (
                <div key={index}>
                  <ListItem
                    button
                    style={{ paddingLeft: '40px', backgroundColor: '#f9f9f9', color: '#333' }}
                    selected={selectedLecture === index}
                    onClick={() => handleLectureClick(index)}
                  >
                    <ListItemIcon>
                      <ExpandMore style={{ color: '#2196f3' }} />
                    </ListItemIcon>
                    <ListItemText primary={`Lecture ${index + 1}: ${lecture.LectureTitle}`} />
                  </ListItem>
                  {selectedLecture === index && (
                    <Collapse in={selectedLecture === index} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItem>
                          <ListItemText primary={`Description: ${lecture.LectureContent}`} />
                        </ListItem>
                        <ListItem>
                          <img src={lecture.Image}></img>
                        </ListItem>
                      </List>
                    </Collapse>
                  )}
                </div>
              ))}
            </List>
          </Collapse>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddLecture}
            style={{ marginTop: '10px', backgroundColor: 'darkblue', color: '#fff' }}
          >
            <Add style={{ marginRight: '5px' }} /> Add Lecture
          </Button>
          {showAddForm && (
            <div>
              <TextField
                label="Lecture Title"
                value={newLectureTitle}
                onChange={(e) => setNewLectureTitle(e.target.value)}
                variant="outlined"
                fullWidth
                style={{ marginTop: '10px' }}
              />
              <TextField
                label="Image URL"
                value={newLectureImageUrl}
                onChange={(e) => setNewLectureImageUrl(e.target.value)}
                variant="outlined"
                fullWidth
                style={{ marginTop: '10px' }}
              />
              <TextField
                label="Description"
                value={newLectureDescription}
                onChange={(e) => setNewLectureDescription(e.target.value)}
                variant="outlined"
                fullWidth
                style={{ marginTop: '10px' }}
              />
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

export default LectureManagement;
