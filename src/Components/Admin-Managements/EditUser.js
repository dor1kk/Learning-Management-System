import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const EditUser = ({ userId }) => {
  const [userData, setUserData] = useState({
    Username: '',
    Password: '',
    Email: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/users/${userId}`)
      .then(res => {
        setUserData(res.data);
      })
      .catch(err => console.log(err));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/users/${userId}`, userData);
      alert('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  return (
    <div>
      <h3>Edit User</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="Username" value={user.Username} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="Password" value={user.Password} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="Email" value={user.Email} onChange={handleChange} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditUser;
