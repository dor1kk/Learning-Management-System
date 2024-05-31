import React, { useState } from 'react';
import { Modal, Form, Input, notification } from 'antd';
import axios from 'axios';

const AddLecture = ({ visible, onCancel, fetchAndDisplayLectures, selectedCourse, lectures }) => {
  const [newLecture, setNewLecture] = useState({ title: '', image: '', lectureContent: '' });

  const handleFormChange = (field, value) => {
    setNewLecture({ ...newLecture, [field]: value });
  };

  const handleFormSubmit = async () => {
    try {
      await axios.post('http://localhost:8080/addlecture', {
        CourseID: selectedCourse.CourseID,
        LectureTitle: newLecture.title,
        LectureImageUrl: newLecture.image,
        LectureDescription: newLecture.lectureContent,
        LectureIndex: lectures.length,
      });

      notification.success({
        message: 'Lecture Added',
        description: 'The lecture has been successfully added.',
      });

      fetchAndDisplayLectures(selectedCourse.CourseID);
      setNewLecture({ title: '', image: '', lectureContent: '' });
      onCancel();
    } catch (error) {
      console.error('Error adding lecture:', error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while adding the lecture.',
      });
    }
  };

  return (
    <Modal
      title="Add New Lecture"
      visible={visible}
      onOk={handleFormSubmit}
      onCancel={onCancel}
    >
      <Form>
        <Form.Item label="Title">
          <Input
            value={newLecture.title}
            onChange={(e) => handleFormChange('title', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Image">
          <Input
            value={newLecture.image}
            onChange={(e) => handleFormChange('image', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Lecture Content">
          <Input.TextArea
            value={newLecture.lectureContent}
            onChange={(e) => handleFormChange('lectureContent', e.target.value)}
            rows={4}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddLecture;
