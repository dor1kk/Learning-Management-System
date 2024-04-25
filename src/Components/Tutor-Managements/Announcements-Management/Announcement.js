import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Button, Input, Collapse, Select, Form, Modal } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

function AnnouncementManagement() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');
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

  const handleCourseChange = (value) => {
    const course = courses.find((c) => c.CourseID === value);
    setSelectedCourse(course);
    setShowAddForm(true);
  };

  const handleAddAnnouncement = async () => {
    try {
      await axios.post('http://localhost:8080/addannouncement', {
        CourseID: selectedCourse.CourseID,
        AnnouncementTitle: newAnnouncementTitle,
        AnnouncementContent: newAnnouncementContent,
      });

      setNewAnnouncementTitle('');
      setNewAnnouncementContent('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding new announcement:', error);
    }
  };

  return (
    <div className="c-container p-5" style={{ backgroundColor: '#f9f9f9', height: '100vh', padding: '20px' }}>
      <h4 className="text-center mt-5 mb-3" style={{ color: '#333' }}>
        Select the course to add an announcement
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
        <Modal
          visible={showAddForm}
          title="Add Announcement"
          onCancel={() => setShowAddForm(false)}
          footer={[
            <Button key="cancel" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleAddAnnouncement}>
              Submit
            </Button>,
          ]}
        >
          <Input
            placeholder="Announcement Title"
            value={newAnnouncementTitle}
            onChange={(e) => setNewAnnouncementTitle(e.target.value)}
            style={{ marginTop: '10px' }}
          />
          <Input.TextArea
            placeholder="Announcement Content"
            value={newAnnouncementContent}
            onChange={(e) => setNewAnnouncementContent(e.target.value)}
            style={{ marginTop: '10px' }}
          />
        </Modal>
      )}
    </div>
  );
}

export default AnnouncementManagement;
