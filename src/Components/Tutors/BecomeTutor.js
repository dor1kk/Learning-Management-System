import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, StarOutlined, ProfileOutlined, BookOutlined, FieldTimeOutlined, BankOutlined, EnvironmentOutlined, PhoneOutlined, CalendarOutlined, PictureOutlined } from '@ant-design/icons';

const { Title } = Typography;

function BecomeTutor() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await axios.post("http://localhost:8080/TutorRequest", values);
            message.success('Request submitted successfully!');
            navigate('/');
        } catch (error) {
            console.error("Error submitting request:", error);
            message.error('Failed to submit request. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className='container d-flex vh-100 justify-content-center align-items-center'>
            <div className=' bg-white rounded p-3'>
                <Form
                    name="becomeTutorForm"
                    onFinish={onFinish}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    layout="vertical"
                >
                    <div className="d-flex flex-row">
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]} className="flex-grow-1 mr-2">
                            <Input prefix={<UserOutlined />} placeholder="Name" />
                        </Form.Item>
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]} className="flex-grow-1">
                            <Input prefix={<MailOutlined />} placeholder="Email" />
                        </Form.Item>
                    </div>
                    <div className="d-flex flex-row">
                        <Form.Item label="Expertise" name="expertise" rules={[{ required: true, message: 'Please input your expertise!' }]} className="flex-grow-1 mr-2">
                            <Input prefix={<StarOutlined />} placeholder="Expertise" />
                        </Form.Item>
                        <Form.Item label="Bio" name="bio" rules={[{ required: true, message: 'Please input your bio!' }]} className="flex-grow-1">
                            <Input prefix={<ProfileOutlined />} placeholder="Bio" />
                        </Form.Item>
                    </div>
                    <div className="d-flex flex-row">
                    <Form.Item label="Contact" name="contact" rules={[{ required: true, message: 'Please input your contact!' }]} className="flex-grow-1 mr-2">
                            <Input prefix={<PhoneOutlined />} placeholder="Contact" />
                        </Form.Item>
                        <Form.Item label="Experience" name="experience" rules={[{ required: true, message: 'Please input your experience!' }]} className="flex-grow-1">
                            <Input prefix={<FieldTimeOutlined />} placeholder="Experience" />
                        </Form.Item>
                    </div>
                    <div className="d-flex flex-row">
                        <Form.Item label="Education" name="education" rules={[{ required: true, message: 'Please input your education!' }]} className="flex-grow-1 mr-2">
                            <Input prefix={<BankOutlined />} placeholder="Education" />
                        </Form.Item>
                        <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Please input your location!' }]} className="flex-grow-1">
                            <Input prefix={<EnvironmentOutlined />} placeholder="Location" />
                        </Form.Item>
                    </div>
                    <div className="d-flex flex-row">
                 
                    
                    </div>
                   
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default BecomeTutor;
