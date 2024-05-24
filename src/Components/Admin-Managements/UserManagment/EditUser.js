import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';



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
      console.log(response.data);
      setRole(response.data.results.Role);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };



    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/editusers/${userId}`, {
     
       Role: role, // Submit the selected role
      UserID: userId,

      });
      alert('User updated successfully');
    } catch (error) {
      console.error('Failed to update user:', error);
      message.error('Failed to update user. Please try again.');
    }
    setLoading(false); 
  };

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
    </div>
    <button type="submit">Update Role</button>
  </form>
);
};

export default EditUser;
