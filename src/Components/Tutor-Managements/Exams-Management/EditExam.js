import React, { useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, DatePicker, notification } from 'antd';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const EditExam = ({ exam, fetchExams, closeModal }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (exam) {
      form.setFieldsValue({
        examId: exam.examId,
        examName: exam.examName,
        startTime: dayjs(exam.startTime),
        endTime: dayjs(exam.endTime),
      });
    }
  }, [exam, form]);

  const handleEdit = async (values) => {
    try {
      await axios.put(`http://localhost:8080/exams/${exam.examId}`, values);
      notification.success({
        message: 'Exam Updated',
        description: 'The exam has been successfully updated.',
      });
      fetchExams();
      closeModal();
    } catch (error) {
      console.error('Error editing exam:', error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while editing the exam. Please try again later.',
      });
    }
  };

  return (
    <div className="container p-5">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleEdit}
        initialValues={{ examId: exam.examId }}
      >
        <Form.Item
          name="examId"
          style={{ display: 'none' }}
        >
          <Input type="hidden" />
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
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditExam;
