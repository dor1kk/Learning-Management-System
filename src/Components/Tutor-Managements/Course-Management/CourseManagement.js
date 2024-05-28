import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, Input, List, Avatar, Space, Modal, Form } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons';
import "./CourseManagement.css"
import AddCourse from './AddCourse';
import { Link } from 'react-router-dom';


const { confirm } = Modal;


const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

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

  const handleDeleteCourse = (id) => {
    confirm({
      title: 'Are you sure you want to delete this course?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteCourse(id);
      },
    });
  };

  const deleteCourse = async (id) => {
    try {
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

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const clearFilters = () => {
    setSearchTerm('');
  };

  const filteredCourses = courses.filter(course =>
    course.Title && course.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="c-container p-4" style={{ textAlign: "center" }}>
      <Space style={{ marginBottom: '20px' }}>
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          prefix={<SearchOutlined />}
          allowClear
        />
        <Button onClick={clearFilters} icon={<CloseOutlined />}>Clear Filters</Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
        >
          <Link to={'/Home/AddCourse'} style={{textDecoration:"none"}}>
          Add Course
          </Link>
        </Button>
      </Space>

      <Typography.Text>Total Courses: {courses.length}</Typography.Text>

      <List
        dataSource={filteredCourses}
        renderItem={course => (
          <List.Item
            className="bg-white mt-2"
            style={{boxShadow:"0 2px 6px rgba(0,0,0,0.1)"}}
            key={course.CourseID}
            actions={[
              <Button
                type="primary"
                icon={<EditOutlined />}
              >
                <Link to={`/Home/EditCourse/${course.CourseID}`} style={{textDecoration:"none"}}>
                Edit
                </Link>
              </Button>,
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteCourse(course.CourseID)}
              >
                Delete
              </Button>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar style={{marginLeft:"20px"}} src={course.Image} />}
              title={course.Title}
              description={course.Description}
            />
          </List.Item>
        )}
      />

    

  
    </div>
  );
};

export default CourseManagement;
