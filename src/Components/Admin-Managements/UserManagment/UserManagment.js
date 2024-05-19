import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Space, Button, message } from 'antd'; // Import Ant Design components
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; // Import Ant Design icons
import { Link } from 'react-router-dom';
<<<<<<< HEAD

=======
>>>>>>> origin/main

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
      await axios.delete(`http://localhost:8080/user/${userId}`);
      message.success('User deleted successfully.');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error('Failed to delete user.');
    }
  };
<<<<<<< HEAD
  

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
                <IconButton
  aria-label="edit"
  component={Link}
  to={`/home/EditUser/${user.UserID}`} 
  style={{ color: '#2196f3' }}
>
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
=======

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'UserID',
      key: 'UserID',
    },
    {
      title: 'Role',
      dataIndex: 'Role',
      key: 'Role',
    },
    {
      title: 'Username',
      dataIndex: 'Username',
      key: 'Username',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, user) => (
        <Space size="middle">
          <Link to={`/home/EditUser/${user.UserID}`} style={{textDecoration:"none", borderRadius:"8px"}} className='bg-primary p-1 text-white'>
            <EditOutlined/> Edit
          </Link>
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => deleteUser(user.UserID)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="c-container p-5">
      <Table
        dataSource={users}
        columns={columns}
        rowKey={(user) => user.UserID}
        pagination={{ pageSize: 10 }} 
      />
>>>>>>> origin/main
    </div>
  );
}

export default UserManagement;
