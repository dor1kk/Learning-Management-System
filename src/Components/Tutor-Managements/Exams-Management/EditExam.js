import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Form, Input, Button, DatePicker, notification } from 'antd';

const EditExam = ({ fetchExams }) => {
  const location = useLocation();
  const examId = location.pathname.split('/').pop(); // Extract examId from URL
  const [form] = Form.useForm();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tutorcourses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching tutor courses:', error);
    }
  };

  const handleEdit = async (values) => {
    try {
      await axios.put(`http://localhost:8080/exams/${examId}`, values);
      notification.success({
        message: 'Exam Updated',
        description: 'The exam has been successfully updated.',
      });
    } catch (error) {
      console.error('Error editing exam:', error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while editing the exam. Please try again later.',
      });
    }
  };

  return (
    <div className="c-container p-5">
      <h2 className='text-primary'>Edit Exam</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleEdit}
        initialValues={{ examId: examId }}
      >
        <Form.Item
          label="Exam Name"
          name="examName"
          rules={[{ required: true, message: 'Please enter exam name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Start Time"
          name="startTime"
          rules={[{ required: true, message: 'Please select start time' }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          label="End Time"
          name="endTime"
          rules={[{ required: true, message: 'Please select end time' }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditExam;
