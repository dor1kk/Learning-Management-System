import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Button, Input, Collapse, Select, Form, Modal } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, PlusOutlined } from '@ant-design/icons';
import './Lecture.css';

const { Option } = Select;

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
      console.error('Error fetching and displaying lectures:', error);
    }
  };

  const handleCourseChange = (value) => {
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
        LectureIndex: lectureCount,
      });

      await fetchAndDisplayLectures(selectedCourse.CourseID);

      setNewLectureTitle('');
      setNewLectureImageUrl('');
      setNewLectureDescription('');

      console.log('New lecture added:', newLectureTitle);
      setShowAddForm(false); 
    } catch (error) {
      console.error('Error adding new lecture:', error);
    }
  };

  return (
    <div className="c-container p-5" style={{ backgroundColor: '#f9f9f9', height: '100vh', padding: '20px' }}>
      <h4 className="text-center mt-5 mb-3" style={{ color: '#333' }}>
        Select the course you want to add lecture
      </h4>
      <Form layout="vertical">
        <Form.Item label="Select Course">
          <Select onChange={handleCourseChange} placeholder="Select a course">
            {courses.map((course) => (
              <Option key={course.CourseID} value={course.CourseID}>
                {course.Title}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      {selectedCourse && (
        <List>
          <List.Item button onClick={handleCollapse} style={{ backgroundColor: '#fff', color: '#333' }}>
            <span style={{marginLeft:"25px"}}>{`Number of Lectures: ${lectureCount}`}</span>
            {open ? <CaretUpOutlined style={{ color: '#4caf50' }} /> : <CaretDownOutlined style={{ color: '#f44336' }} />}
          </List.Item>
          {open && (
            <List component={Collapse} unmountOnExit>
              {lectures.map((lecture, index) => (
                <div key={index}>
                  <List.Item
                    button
                    style={{ paddingLeft: '40px', backgroundColor: '#f9f9f9', color: '#333' }}
                    selected={selectedLecture === index}
                    onClick={() => handleLectureClick(index)}
                  >
                    <CaretDownOutlined style={{ color: '#2196f3' }} />
                    <span style={{marginRight:"500px"}}>{`Lecture ${index + 1}: ${lecture.LectureTitle}`}</span>
                  </List.Item>
                  {selectedLecture === index && (
                    <div>
                      <List.Item>
                        <span>{`Description: ${lecture.LectureContent}`}</span>
                      </List.Item>
                      <List.Item>
                        <img src={lecture.Image} alt="Lecture" />
                      </List.Item>
                    </div>
                  )}
                </div>
              ))}
            </List>
          )}
          <Button
            type="primary"
            onClick={handleAddLecture}
            style={{ marginTop: '10px', backgroundColor: 'darkblue', color: '#fff' }}
            icon={<PlusOutlined />}
          >
            Add Lecture
          </Button>
          <Modal
            visible={showAddForm}
            title="Add Lecture"
            onCancel={() => setShowAddForm(false)}
            footer={[
              <Button key="cancel" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleFormSubmit}>
                Submit
              </Button>,
            ]}
          >
            <Input
              placeholder="Lecture Title"
              value={newLectureTitle}
              onChange={(e) => setNewLectureTitle(e.target.value)}
              style={{ marginTop: '10px' }}
            />
            <Input
              placeholder="Image URL"
              value={newLectureImageUrl}
              onChange={(e) => setNewLectureImageUrl(e.target.value)}
              style={{ marginTop: '10px' }}
            />
            <Input.TextArea
              placeholder="Description"
              value={newLectureDescription}
              onChange={(e) => setNewLectureDescription(e.target.value)}
              style={{ marginTop: '10px' }}
            />
          </Modal>
        </List>
      )}
    </div>
  );
}

export default LectureManagement;
