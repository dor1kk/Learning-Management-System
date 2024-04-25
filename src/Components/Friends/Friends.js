import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Table, Avatar, Space, Card} from 'antd';
import { UserOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import './Friends.css';
import { FaTrash, FaComment } from 'react-icons/fa';

const { Search } = Input;

const Friends = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [suggestedStudents, setSuggestedStudents] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showRequestsDropdown, setShowRequestsDropdown] = useState(false);
  const [friends, setFriends] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    console.log("Fetching students...");
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/friends');
        const suggestedUsers = response.data;
        console.log("Suggested users before filtering:", suggestedUsers);
        const filteredSuggestions = suggestedUsers.filter(user => {
          const isNotFriend = !friends.some(friend => friend.ID === user.UserId);
          const isNotInRequests = !requests.some(request => request.receiver_id === user.UserId || request.sender_id === user.UserId);
          return isNotFriend && isNotInRequests;
        });
        console.log("Filtered suggestions:", filteredSuggestions);
        setSuggestedStudents(filteredSuggestions);
      } catch (error) {
        console.error('Error fetching suggested students:', error);
      }
    };

    fetchStudents();

    const fetchFriends = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/myfriends`);
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/friend-requests`);
        setRequests(response.data);
        acceptFriendRequest();
        rejectFriendRequest();
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
    fetchFriends();

  }, [searchTerm, friends, requests]);

  useEffect(() => {
    axios.get('http://localhost:8080/userid')
      .then(res => {
        console.log(res.data);
        if (res.data.valid) {
          setUserId(res.data.userid);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const acceptFriendRequest = (requestId) => {
    const existingRequest = requests.find(request => request.id === requestId);
    if (!existingRequest) {
      console.error('Invalid friend request ID.');
      return;
    }

    if (existingRequest.status === 'accepted') {
      alert('You have already accepted this friend request.');
      return;
    }

    const senderId = existingRequest.sender_id;
    const isAlreadyFriend = friends.some(friend => friend.ID === senderId);
    if (isAlreadyFriend) {
      alert('This user is already in your friends list.');
      return;
    }

    axios.post("http://localhost:8080/accept-friend-request", { requestId })
      .then(response => {
        console.log('Friend request accepted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error accepting friend request:', error);
      });
  };


  const rejectFriendRequest = (requestId) => {
    axios.post("http://localhost:8080/reject-friend-request", { requestId })
      .then(response => {
        console.log('Friend request rejected successfully:', response.data);
      })
      .catch(error => {
        console.error('Error rejecting friend request:', error);
      });
  };


  const sendFriendRequest = (receiverId) => {
    const existingFriend = friends.find(friend => friend.ID === receiverId);
    if (existingFriend) {
      alert('You are already friends with this user.');
      return;
    }

    if (receiverId === userId) {
      alert('You cannot send a friend request to yourself.');
      return;
    }

    const existingRequest = requests.find(request =>
      (request.receiver_id === receiverId && request.sender_id === userId) ||
      (request.receiver_id === userId && request.sender_id === receiverId) &&
      request.status !== 'rejected'
    );


    if (existingRequest) {
      alert('You have already sent a friend request to this user.');
      return;
    }

    axios.post("http://localhost:8080/send-friend-request", { receiverId })
      .then(response => {
        alert('Friend request sent successfully:', response.data);
      })
      .catch(error => {
        alert('Error sending friend request:', error);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    });
  };

  const removeFriend = (friendId) => {
    axios.post("http://localhost:8080/remove-friend", { friendId })
      .then(response => {
        console.log('Friend removed successfully:', response.data);
        setFriends(prevFriends => prevFriends.filter(friend => friend.ID !== friendId));
      })
      .catch(error => {
        console.error('Error removing friend:', error);
      });
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'Image',
      key: 'Image',
      render: (text, record) => <Avatar src={record.Image} />,
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="danger" icon={<FaTrash />} onClick={() => removeFriend(record.ID)}>Remove</Button>
          <Button type="primary" icon={<FaComment />}>Chat</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="c-container p-5">
      <div className="row">
        <div className="friend-requests-container">
          <Button className="friend-requests-button mb-5" onClick={() => setShowRequestsDropdown(!showRequestsDropdown)}>
            <span >Friend Requests</span>
            {requests.length > 0 && (
              <span className="friend-requests-count">{requests.length}</span>
            )}
          </Button>
          {showRequestsDropdown && (
            <div className="friend-requests-dropdown">
              {requests.map(request => (
                <div key={request.id} className="friend-request-item">
                  <Avatar size="small" icon={<UserOutlined />} />
                  <div>
                    <p>{request.Name}</p>
                    <p>Sent on: {formatDate(request.created_at)}</p>
                  </div>
                  <Space>
                    <Button type="primary" icon={<CheckOutlined />} onClick={() => acceptFriendRequest(request.id)} />
                    <Button type="danger" icon={<CloseOutlined />} onClick={() => rejectFriendRequest(request.id)} />
                  </Space>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <h4 className="mb-3 text-primary " style={{ fontSize: "20px" }}>Suggested Students</h4>
        <div className="d-flex flex-wrap">
          {suggestedStudents.map(student => (
            <Card key={student.id} className="friend-card" style={{ width: 300, marginBottom: 16 }}>
              <Card.Meta
                avatar={<Avatar src={student.Image} />}
                title={student.Name}
                description={student.Email}
              />
              <Button type="primary" block onClick={() => sendFriendRequest(student.UserId)}>Add Friend</Button>
            </Card>
          ))}
        </div>
      </div>

      <div className="row">
        <h4 className="mb-3 text-primary" style={{ fontSize: "20px" }}>My Friends</h4>
        <Table columns={columns} dataSource={friends} rowKey="ID" />
      </div>
    </div>
  );
};

export default Friends;
