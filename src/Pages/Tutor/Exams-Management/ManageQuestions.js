import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Row, Col, Select, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const ManageQuestions = ({ role }) => {

    if (role !== "Tutor") {
        window.location.href = "/unauthorized";
      }
  const [questions, setQuestions] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getQuestionsByTutor");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleEdit = (question) => {
    setCurrentQuestion(question);
    form.setFieldsValue({
      questionText: question.questionText,
      option1: question.option1,
      option2: question.option2,
      option3: question.option3,
      option4: question.option4,
      correctOption: question.correctOption
    });
    setEditModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/question`, {
        data: { questionId: currentQuestion.questionId } 
      });
      notification.success({ message: 'Question Deleted', description: 'The question has been successfully deleted.' });
      fetchQuestions();
      setDeleteModalVisible(false);
    } catch (error) {
      console.error("Error deleting question:", error);
      notification.error({ message: 'Error', description: 'An error occurred while deleting the question.' });
    }
  };

  const handleEditSubmit = async (values) => {
    try {
      await axios.put(`http://localhost:8080/editQuestion`, {
        questionId: currentQuestion.questionId, 
        ...values 
      });
      notification.success({ message: 'Question Updated', description: 'The question has been successfully updated.' });
      fetchQuestions();
      setEditModalVisible(false);
    } catch (error) {
      console.error("Error updating question:", error);
      notification.error({ message: 'Error', description: 'An error occurred while updating the question.' });
    }
  };

  const handleDeleteConfirmation = (question) => {
    setCurrentQuestion(question);
    setDeleteModalVisible(true);
  };

  const columns = [
    {
      title: 'Question',
      dataIndex: 'questionText',
      key: 'questionText',
    },
    {
      title: 'Options',
      dataIndex: 'options',
      key: 'options',
      render: (_, question) => (
        <span>{`${question.option1}, ${question.option2}, ${question.option3}, ${question.option4}`}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, question) => (
        <span className="d-flex flex-row" style={{gap:"7px"}}>
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(question)} />
          <Button type="secondary" onClick={() => handleDeleteConfirmation(question)} danger icon={<DeleteOutlined />} />
        </span>
      ),
    },
  ];

  return (
    <div className="container p-3">
      <Table dataSource={questions} columns={columns} />
      <Modal
        title="Edit Question"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
          <Form.Item label="Question" name="questionText" rules={[{ required: true, message: 'Please enter the question text' }]}>
            <Input />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Option 1" name="option1" rules={[{ required: true, message: 'Please enter option 1' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Option 2" name="option2" rules={[{ required: true, message: 'Please enter option 2' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Option 3" name="option3" rules={[{ required: true, message: 'Please enter option 3' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Option 4" name="option4" rules={[{ required: true, message: 'Please enter option 4' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Correct Option" name="correctOption" rules={[{ required: true, message: 'Please select the correct option' }]}>
            <Select>
              <Option value="option1">Option 1</Option>
              <Option value="option2">Option 2</Option>
              <Option value="option3">Option 3</Option>
              <Option value="option4">Option 4</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Save Changes</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Delete Question"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete this question?</p>
      </Modal>
    </div>
  );
};

export default ManageQuestions;