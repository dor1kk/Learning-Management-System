import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Select, Input, Button, DatePicker, notification } from 'antd';

const { Option } = Select;

const AddExamForm = ({ fetchExams, closeModal }) => {
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

  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:8080/exams', values);
      fetchExams();
      notification.success({
        message: 'Exam Added',
        description: 'The exam has been successfully added.',
      });
      closeModal(); // Close the modal after adding the exam
    } catch (error) {
      console.error('Error creating exam:', error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while creating the exam. Please try again later.',
      });
    }
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Select Course"
          name="courseId"
          rules={[{ required: true, message: 'Please select a course' }]}
        >
          <Select placeholder="Select Course">
            {courses.map(course => (
              <Option key={course.CourseID} value={course.CourseID}>{course.Title}</Option>
            ))}
          </Select>
        </Form.Item>
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
            Add Exam
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddExamForm;
