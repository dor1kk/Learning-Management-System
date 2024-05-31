import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Select, notification } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AddLecture from './AddLecture';
import EditLecture from './EditLecture';
import './Lecture.css';
import { Link } from '@mui/material';

const { Option } = Select;

const LectureManagement = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editLecture, setEditLecture] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [expandedContent, setExpandedContent] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tutorcourses');
      setCourses(response.data);
      if (response.data.length > 0) {
        setSelectedCourse(response.data[0]);
        fetchAndDisplayLectures(response.data[0].CourseID);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchAndDisplayLectures = async (courseID) => {
    try {
      const response = await axios.get(`http://localhost:8080/lectures/${courseID}`);
      setLectures(response.data);
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };

  const handleCourseChange = (value) => {
    const course = courses.find((c) => c.CourseID === value);
    setSelectedCourse(course);
    fetchAndDisplayLectures(course.CourseID);
  };

  const handleAddLecture = () => {
    setShowAddModal(true);
  };

  const handleCancelAddLecture = () => {
    setShowAddModal(false);
  };

  const handleEditClick = (lecture) => {
    setEditLecture(lecture);
    setEditModalVisible(true);
  };

  const handleEditModalOk = async () => {
    try {
      await axios.put('http://localhost:8080/editlecture', editLecture);
      notification.success({
        message: 'Lecture Updated',
        description: 'The lecture has been successfully updated.',
      });
      fetchAndDisplayLectures(selectedCourse.CourseID);
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error editing lecture:', error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while editing the lecture.',
      });
    }
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handleDeleteLecture = async (lectureID) => {
    try {
      await axios.delete(`http://localhost:8080/deletelecture/${lectureID}`);
      notification.success({
        message: 'Lecture Deleted',
        description: 'The lecture has been successfully deleted.',
      });
      fetchAndDisplayLectures(selectedCourse.CourseID);
    } catch (error) {
      console.error('Error deleting lecture:', error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while deleting the lecture.',
      });
    }
  };

  const renderContent = (content) => {
    if (expandedContent && expandedContent === content) {
      return (
        <>
          <div>{content}</div>
          <Link onClick={() => setExpandedContent(null)}>See Less</Link>
        </>
      );
    }
    if (content.length > 50) {
      return (
        <>
          <div>{`${content.substring(0, 50)}...`}</div>
          <Link onClick={() => setExpandedContent(content)}>See More</Link>
        </>
      );
    }
    return <div>{content}</div>;
  };

  const columns = [
    { title: 'Title', dataIndex: 'LectureTitle', key: 'title' },
    { title: 'Image', dataIndex: 'Image', key: 'imageUrl' },
    { title: 'Lecture Content', dataIndex: 'LectureContent', key: 'description', render: renderContent },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, lecture) => (
        <span className='d-flex flex-row'>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditClick(lecture)}
          >
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            style={{ marginLeft: '7px' }}
            onClick={() => handleDeleteLecture(lecture.LectureID)}
          >
          </Button>
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
        onClick={handleAddLecture}
        style={{ marginBottom: 20 }}
      >
        Add Lecture
      </Button>
      <Table dataSource={lectures} columns={columns} rowKey="LectureID" />

      <AddLecture
        visible={showAddModal}
        onCancel={handleCancelAddLecture}
        fetchAndDisplayLectures={fetchAndDisplayLectures}
        selectedCourse={selectedCourse}
        lectures={lectures} 
      />

      <EditLecture
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        onOk={handleEditModalOk}
        editLecture={editLecture}
        setEditLecture={setEditLecture}
      />
    </div>
  );
};

export default LectureManagement;
