import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Select, notification } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import EditAnnouncement from './EditAnnouncement'; // Import the EditAnnouncement component
import AddAnnouncement from './AddAnnouncement'; // Import the AddAnnouncement component

const { Option } = Select;

const AnnouncementManagement = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tutorcourses');
      const fetchedCourses = response.data;
      setCourses(fetchedCourses);

      if (fetchedCourses.length > 0) {
        setSelectedCourse(fetchedCourses[0]);
        fetchAndDisplayAnnouncements(fetchedCourses[0].CourseID);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchAndDisplayAnnouncements = async (courseID) => {
    try {
      const response = await axios.get(`http://localhost:8080/announcements/${courseID}`);
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const handleCourseChange = (value) => {
    const course = courses.find((c) => c.CourseID === value);
    setSelectedCourse(course);
    fetchAndDisplayAnnouncements(course.CourseID);
  };

  const handleEditClick = (announcement) => {
    setEditAnnouncement(announcement);
    setShowEditModal(true);
  };

  const handleDeleteAnnouncement = async (announcementID) => {
    try {
      await axios.delete(`http://localhost:8080/deleteannouncement/${announcementID}`);
      notification.success({
        message: 'Announcement Deleted',
        description: 'The announcement has been successfully deleted.',
      });
      fetchAndDisplayAnnouncements(selectedCourse.CourseID);
    } catch (error) {
      console.error('Error deleting announcement:', error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while deleting the announcement.',
      });
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'announcement_title', key: 'title' },
    { title: 'Content', dataIndex: 'announcement_text', key: 'content' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, announcement) => (
        <span>
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditClick(announcement)}>Edit</Button>
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDeleteAnnouncement(announcement.announcement_id)} style={{ marginLeft: '10px' }}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="container p-5">
      <Select
        onChange={handleCourseChange}
        value={selectedCourse ? selectedCourse.CourseID : undefined}
        style={{ width: 200, marginBottom: 20 }}
      >
        {courses.map((course) => (
          <Option key={course.CourseID} value={course.CourseID}>
            {course.Title}
          </Option>
        ))}
      </Select>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setShowAddModal(true)}
        style={{ marginBottom: 20 }}
      >
        Add Announcement
      </Button>
      <Table dataSource={announcements} columns={columns} rowKey="AnnouncementID" />

      <AddAnnouncement
        visible={showAddModal}
        onCancel={() => setShowAddModal(false)}
        fetchAndDisplayAnnouncements={fetchAndDisplayAnnouncements}
        selectedCourse={selectedCourse}
      />

      <EditAnnouncement
        editAnnouncement={editAnnouncement}
        visible={showEditModal}
        onCancel={() => setShowEditModal(false)}
        fetchAndDisplayAnnouncements={fetchAndDisplayAnnouncements}
        selectedCourse={selectedCourse}
      />
    </div>
  );
};

export default AnnouncementManagement;
