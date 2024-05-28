import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Button, Input, Collapse, Select, FormControl, MenuItem, FormHelperText, Modal } from '@mui/material';
import { ExpandMore, ExpandLess, Add } from '@mui/icons-material';
import './Lecture.css';

function LectureManagement() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [newLectureTitle, setNewLectureTitle] = useState('');
  const [newLectureImageUrl, setNewLectureImageUrl] = useState('');
  const [newLectureDescription, setNewLectureDescription] = useState('');
  const [lectureCount, setLectureCount] = useState(0);
  const [lectures, setLectures] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tutorcourses');
      const fetchedCourses = response.data;
      setCourses(fetchedCourses);

      // Pre-select the first course initially
      if (fetchedCourses.length > 0) {
        setSelectedCourse(fetchedCourses[0]);
        fetchAndDisplayLectures(fetchedCourses[0].CourseID);
      }
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
      console.error('Error fetching and displaying lectures:', error);
    }
  };

  const handleCourseChange = (event) => {
    const value = event.target.value;
    const course = courses.find((c) => c.CourseID === value);
    setSelectedCourse(course);
    setOpen(true);
    fetchAndDisplayLectures(course.CourseID);
  };

  const handleCollapse = () => {
    setOpen(!open);
    setSelectedLecture(null);
  };

  const handleLectureClick = (index) => {
    setSelectedLecture(selectedLecture === index ? null : index);
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
        LectureIndex: lectureCount,
      });

      await fetchAndDisplayLectures(selectedCourse.CourseID);

      setNewLectureTitle('');
      setNewLectureImageUrl('');
      setNewLectureDescription('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding new lecture:', error);
    }
  };

  return (
    <div className="c-container p-5">
      <FormControl variant="outlined">
        <Select
          onChange={handleCourseChange}
          displayEmpty
          value={selectedCourse ? selectedCourse.CourseID : ''}
        >
          <MenuItem value="" disabled>Select a course</MenuItem>
          {courses.map((course) => (
            <MenuItem key={course.CourseID} value={course.CourseID}>
              {course.Title}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select Course</FormHelperText>
      </FormControl>

      {selectedCourse && (
        <div className="lecture-list">
          <Button
            variant="contained"
            color="primary"
            className="add-lecture-btn"
            onClick={handleAddLecture}
            startIcon={<Add />}
          >
            Add Lecture
          </Button>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div">
              <List component="div" disablePadding>
                {lectures.map((lecture, index) => (
                  <List key={index} className={`lecture-item ${selectedLecture === index ? 'selected' : ''}`} onClick={() => handleLectureClick(index)}>
                    {`Lecture ${index + 1}: ${lecture.LectureTitle}`}
                  </List>
                ))}
              </List>
            </List>
          </Collapse>

          <Modal
            open={showAddForm}
            onClose={() => setShowAddForm(false)}
          >
            <div>
              <Input
                placeholder="Lecture Title"
                value={newLectureTitle}
                onChange={(e) => setNewLectureTitle(e.target.value)}
              />
              <Input
                placeholder="Image URL"
                value={newLectureImageUrl}
                onChange={(e) => setNewLectureImageUrl(e.target.value)}
              />
              <Input
                placeholder="Description"
                value={newLectureDescription}
                onChange={(e) => setNewLectureDescription(e.target.value)}
                multiline
                rows={3}
              />
              <Button onClick={handleFormSubmit}>Submit</Button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default LectureManagement;
