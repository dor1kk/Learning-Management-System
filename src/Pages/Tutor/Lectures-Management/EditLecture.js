import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, notification } from 'antd';
import axios from 'axios';

const EditLecture = ({ editLecture, visible, onCancel, fetchAndDisplayLectures, selectedCourse }) => {
  const [lecture, setLecture] = useState(editLecture);

  useEffect(() => {
    setLecture(editLecture);
  }, [editLecture]);

  const handleFormChange = (field, value) => {
    setLecture({ ...lecture, [field]: value });
  };

  const handleFormSubmit = async () => {
    try {
      await axios.put('http://localhost:8080/editlecture', lecture);

      notification.success({
        message: 'Lecture Updated',
        description: 'The lecture has been successfully updated.',
      });

      fetchAndDisplayLectures(selectedCourse.CourseID);
      onCancel();
    } catch (error) {
      console.error('Error editing lecture:', error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while editing the lecture.',
      });
    }
  };

  return (
    <Modal
      title="Edit Lecture"
      visible={visible}
      onOk={handleFormSubmit}
      onCancel={onCancel}
    >
      <Form>
        <Form.Item label="Title">
          <Input
            value={lecture ? lecture.LectureTitle : ''}
            onChange={(e) => handleFormChange('LectureTitle', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Image">
          <Input
            value={lecture ? lecture.Image : ''}
            onChange={(e) => handleFormChange('Image', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Lecture Content">
          <Input.TextArea
            value={lecture ? lecture.LectureContent : ''}
            onChange={(e) => handleFormChange('LectureContent', e.target.value)}
            rows={4}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditLecture;
