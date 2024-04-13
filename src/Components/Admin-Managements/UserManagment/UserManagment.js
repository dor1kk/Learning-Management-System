import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import './UserManagement.css';

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/users/${userId}`);
      fetchUsers(); // After deleting the user, fetch updated user list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const editUser = (userId) => {
    console.log(`Editing user with ID: ${userId}`);
  };

  return (
    <div className="user-management-container">
      <h2 className="user-list-title">User List</h2>
      <TableContainer>
        <Table className="user-table" style={{ width: '100%', height: 'auto' }}>
          <TableHead>
            <TableRow>
              <TableCell className="table-header">User ID</TableCell>
              <TableCell className="table-header">Role</TableCell>
              <TableCell className="table-header">Username</TableCell>
              <TableCell className="table-header">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.UserID} className="table-row">
                <TableCell>{user.UserID}</TableCell>
                <TableCell>{user.Role}</TableCell>
                <TableCell>{user.Username}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit" onClick={() => editUser(user.UserID)} style={{ color: '#2196f3' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => deleteUser(user.UserID)} style={{ color: '#f44336' }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserManagement;
