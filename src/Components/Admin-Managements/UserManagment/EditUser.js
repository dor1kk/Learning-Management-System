import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { Form, Input, Button, message, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Option } = Select;

const EditUser = () => {
    const location = useLocation();
    const userId = location.pathname.split("/").pop();
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        fetchUser();
    }, [userId]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/userss/${userId}`);
            setRole(response.data.results.Role);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:8080/editusers/${userId}`, {
                Role: role,
                UserID: userId,
            });
            message.success('User updated successfully');
        } catch (error) {
            console.error('Failed to update user:', error);
            message.error('Failed to update user. Please try again.');
        }
        setLoading(false);
    };

    const handleChange = (value) => {
        setRole(value);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '400px', border: '1px solid #d9d9d9', borderRadius: '5px', padding: '20px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit User</h2>
                <Form onFinish={handleSubmit}>
                    <Form.Item label="Role">
                        <Select
                            value={role}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        >
                            <Option value="">Select Role</Option>
                            <Option value="Tutor">Tutor</Option>
                            <Option value="Student">Student</Option>
                            <Option value="Admin">Admin</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                            Update Role
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default EditUser;
