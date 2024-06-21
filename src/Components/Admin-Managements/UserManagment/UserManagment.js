import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Space, Button, message } from 'antd'; // Import Ant Design components
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; // Import Ant Design icons
import { Link } from 'react-router-dom';

function UserManagement({role}) {

  if (role !== "Admin") {
    window.location.href = "/unauthorized";
  }
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
        console.log("Attempting to delete user with ID:", userId);  // Add logging
        await axios.delete(`http://localhost:8080/users/${userId}`);
        message.success('User deleted successfully.');
        fetchUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
        message.error('Failed to delete user.');
    }
};


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
    </div>
  );
}

export default UserManagement;
