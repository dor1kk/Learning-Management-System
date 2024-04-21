import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const EditUser = () => {
  const location = useLocation();
  const userId = location.pathname.split("/").pop();
  const [userData, setUserData] = useState({
    userId: userId,
    Username: '',
    Password: '',
    Email: ''
  });


  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/userss/${userId}`);
      console.log(response.data);
      setUserData(response.data.results);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

;

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/editusers/${userId}`, {
        Username:userData.Username,
        Email:userData.Email,
        Password:userData.Password,
        Role:userData.Role,
        UserID:userData.userId,

      });
      alert('User updated successfully');
    } catch (error) {
      alert('Failed to update user. Please try again.');
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]); 
  

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  console.log("User Username", userData.Username);
  return (
    <div>
      <h3>Edit User</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="Username" value={userData.Username} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="Password" value={userData.Password} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="text" name="Role" value={userData.Role} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="Email" value={userData.Email} onChange={handleChange} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditUser;
