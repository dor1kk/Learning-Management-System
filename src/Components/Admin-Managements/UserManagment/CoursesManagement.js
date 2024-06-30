import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Space, Button, message, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import EditCourse from './EditCourse';

function CoursesManagement({ role }) {
;

  useEffect(() => {
    if (role !== 'Admin') {
      window.location.href="/unauthorized"
    }
  }, [role]);

  const [courses, setCourses] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCourseId, setEditCourseId] = useState('');
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      console.log('Attempting to delete course with ID:', courseId);
      await axios.delete(`http://localhost:8080/courses/${courseId}`);
      message.success('Course deleted successfully.');
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      message.error('Failed to delete course.');
    }
  };

  const handleUpdateSuccess = () => {
    message.success('Course updated successfully.');
    setShowEditModal(false);
    fetchCourses();
  };

  const toggleDescription = (courseId) => {
    setExpandedDescriptions(prevState => ({
      ...prevState,
      [courseId]: !prevState[courseId],
    }));
  };

  const columns = [
    {
      title: 'Course ID',
      dataIndex: 'CourseID',
      key: 'CourseID',
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
      render: (text, course) => (
        <div>
          {expandedDescriptions[course.CourseID] ? text : `${text.substring(0, 100)}...`}
          <Button type="link" onClick={() => toggleDescription(course.CourseID)}>
            {expandedDescriptions[course.CourseID] ? 'See Less' : 'See More'}
          </Button>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'Category',
      key: 'Category',
    },
    {
      title: 'Duration',
      dataIndex: 'Duration',
      key: 'Duration',
    },
    {
      title: 'Lectures',
      dataIndex: 'Lectures',
      key: 'Lectures',
    },
  
    {
      title: 'Actions',
      key: 'actions',
      render: (text, course) => (
        <Space size="middle">
          <Button onClick={() => { setShowEditModal(true); setEditCourseId(course.CourseID); }}>
            Edit
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => deleteCourse(course.CourseID)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="courses-management-container p-5">
      <Table
        dataSource={courses}
        columns={columns}
        rowKey={(course) => course.CourseID}
        pagination={{ pageSize: 10 }}
      />

      <Modal open={showEditModal} title="Edit Course" onCancel={() => setShowEditModal(false)} footer={null}>
        <EditCourse courseId={editCourseId} onUpdateSuccess={handleUpdateSuccess} />
      </Modal>
    </div>
  );
}

export default CoursesManagement;
