import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';



const EditUser = () => {
<<<<<<< HEAD
  const location = useLocation();
  const userId = location.pathname.split("/").pop();
  const [role, setRole] = useState('');
  
=======
  const { userId } = useParams(); 
  const [form] = Form.useForm(); 
>>>>>>> origin/main

  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get(`http://localhost:8080/userss/${userId}`);
      console.log(response.data);
      setRole(response.data.results.Role);
=======
      const response = await axios.get(`http://localhost:8080/users/${userId}`);
      const userData = response.data;
      form.setFieldsValue(userData); 
>>>>>>> origin/main
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

<<<<<<< HEAD


    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/editusers/${userId}`, {
     
       Role: role, // Submit the selected role
      UserID: userId,

      });
      alert('User updated successfully');
=======
  const handleSubmit = async (values) => {
    setLoading(true); 
    try {
      await axios.put(`http://localhost:8080/editusers/${userId}`, values);
      message.success('User updated successfully');
>>>>>>> origin/main
    } catch (error) {
      console.error('Failed to update user:', error);
      message.error('Failed to update user. Please try again.');
    }
    setLoading(false); 
  };

<<<<<<< HEAD
  useEffect(() => {
    fetchUser();
  }, ); 
  

  const handleChange = (e) => {
    setRole(e.target.value); // Update role when dropdown changes
  };

  return (
    <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="role">Role:</label>
      <select
        id="role"
        name="Role"
        value={role}
        onChange={handleChange}
      >
        <option value="">Select Role</option>
        <option value="Tutor">Tutor</option>
        <option value="Student">Student</option>
        <option value="Admin">Admin</option>
      </select>
=======
  return (
    <div className='c-container p-5' style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="Username" rules={[{ required: true, message: 'Please enter a username' }]}>
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="Password" rules={[{ required: true, message: 'Please enter a password' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item name="Role" rules={[{ required: true, message: 'Please enter a role' }]}>
          <Input prefix={<UserOutlined />} placeholder="Role" />
        </Form.Item>
        <Form.Item name="Email" rules={[{ required: true, message: 'Please enter an email', type: 'email' }]}>
          <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Save
          </Button>
        </Form.Item>
      </Form>
>>>>>>> origin/main
    </div>
    <button type="submit">Update Role</button>
  </form>
);
};

export default EditUser;
