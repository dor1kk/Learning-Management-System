import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Button, Select, Row, Col } from 'antd';

const { Option } = Select;

const AddQuestion = ({ exam }) => {
  const [formData, setFormData] = useState({
    questionText: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctOption: "",
  });

  useEffect(() => {
    if (exam) {
      console.log("Managing questions for exam:", exam.examName);
    }
  }, [exam]);

  const handleSubmit = async () => {
    try {
      console.log("Form Data:", formData);
      await axios.post("http://localhost:8080/addQuestion", {
        Question: formData.questionText,
        Option1: formData.option1,
        Option2: formData.option2,
        Option3: formData.option3,
        Option4: formData.option4,
        correctOption: formData.correctOption,
        exam: exam.examId
      });
      setFormData({
        questionText: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctOption: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (value) => {
    setFormData({ ...formData, correctOption: value });
  };

  return (
    <div className="container p-5">
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Question" required>
          <Input
            name="questionText"
            value={formData.questionText}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Option 1" required>
              <Input
                name="option1"
                value={formData.option1}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Option 2" required>
              <Input
                name="option2"
                value={formData.option2}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Option 3" required>
              <Input
                name="option3"
                value={formData.option3}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Option 4" required>
              <Input
                name="option4"
                value={formData.option4}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Correct Option" required>
          <Select
            value={formData.correctOption}
            onChange={handleOptionChange}
          >
            <Option value="option1">{formData.option1}</Option>
            <Option value="option2">{formData.option2}</Option>
            <Option value="option3">{formData.option3}</Option>
            <Option value="option4">{formData.option4}</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddQuestion;
