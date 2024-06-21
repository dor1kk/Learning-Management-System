import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Space, Button, message } from 'antd'; // Import Ant Design components
import { DeleteOutlined } from '@ant-design/icons'; // Import Ant Design icons
import { Link } from 'react-router-dom';

function CoursesManagement({role}) {

  if (role !== "Admin") {
    window.location.href = "/unauthorized";
  }

  const [courses, setCourses] = useState([]);

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
      console.log("Attempting to delete course with ID:", courseId);  // Add logging
      await axios.delete(`http://localhost:8080/courses/${courseId}`);
      message.success('Course deleted successfully.');
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      message.error('Failed to delete course.');
    }
  };

  const columns = [
    {
      title: 'Course ID',
      dataIndex: 'CourseID',
      key: 'CourseID',
    },
    {
      title: 'Tutor ID',
      dataIndex: 'TutorID',
      key: 'TutorID',
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
      title: 'Assignments',
      dataIndex: 'Assignments',
      key: 'Assignments',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, course) => (
        <Space size="middle">
          <Link to={`/home/EditCourse/${course.CourseID}`} style={{ textDecoration: "none", borderRadius: "8px" }} className='bg-primary p-1 text-white'>
            Edit
          </Link>
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => deleteCourse(course.CourseID)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="courses-management-container p-5">
      <h2 className="courses-list-title">Course List</h2>
      <Table
        dataSource={courses}
        columns={columns}
        rowKey={(course) => course.CourseID}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default CoursesManagement;
