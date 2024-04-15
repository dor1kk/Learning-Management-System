import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Friends.css"
import {FaTrash, FaComment} from 'react-icons/fa'

const Friends = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [suggestedStudents, setSuggestedStudents] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showRequestsDropdown, setShowRequestsDropdown] = useState(false);
  const [friends, setFriends]=useState([]);
  const [userId,setUserId]=useState(null);

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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

  return (
    <div className="friend-container">
      <div className="row">
        <div className="friend-requests-container">
          <button className="friend-requests-button btn btn-light p-1" style={{margin:"25px"}} onClick={() => setShowRequestsDropdown(!showRequestsDropdown)}>
            <span >Friend Requests</span>
            {requests.length > 0 && (
              <span className="friend-requests-count">{requests.length}</span>
            )}
          </button>
          {showRequestsDropdown && (
            <div className="friend-requests-dropdown">
              {requests.map(request => (
  <div key={request.id}>
    <div className='d-flex flex-row bg-light'>
      <img src={request.Image} style={{ width: "40px", height: "40px", borderRadius: "50%", marginLeft: "25px", marginRight: "15px" }}></img>
      <h4 style={{ marginTop: "8px" }}>{request.Name}</h4>
      <p style={{ marginLeft: "30px", marginTop: "8px" }}>Sent on:{formatDate(request.created_at)}</p>
      <button className='btn btn-success' style={{ height: "35px", margin: "5px 10px 0 10px" }} onClick={() => acceptFriendRequest(request.id)}>ACCEPT</button>
      <button className='btn btn-danger' style={{ height: "35px", marginTop: "5px" }} onClick={() => rejectFriendRequest(request.id)}>REJECT</button>
    </div>
  </div>
))}
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <h4 className="mb-3" style={{marginLeft:"25px"}}>Suggested Students</h4>
        <div className="d-flex flex-row" style={{ gap: "25px", padding: "0 40px" }}>
          {suggestedStudents.map((student) => (
            <div key={student.id} className="friend-card mb-3 bg-light " style={{ backgroundColor: "lightgrey", width: "270px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
              <div className="friend-card-body">
                <div className='d-flex flex-row'>
                  <img src={student.Image} style={{ width: "60px", height: "60px", borderRadius: "50%", margin: "15px" }} alt="Student" />
                  <div className='d-flex flex-column'>
                    <h5 className="friend-card-title" style={{ marginTop: "20px" }}>{student.Name}</h5>
                    <h6>{student.Email}</h6>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "120px", marginBottom: "10px" }}
                  onClick={() => sendFriendRequest(student.UserId)}
                >
                  ADD FRIEND
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="friends-list">
  <h4 style={{marginLeft:"25px"}}>My Friends</h4>
  <div className="friends-container">
    {friends.map((friend) => (
      <div key={friend.ID} className="friend-card bg-light" style={{backgroundColor: "lightgrey", marginLeft:"25px", width:"240px"}}>
        <img src={friend.Image} alt={friend.Name} />
        <h4>{friend.Name}</h4>
        <div className='d-flex flex-row' style={{gap:"5px"}}>
        <button className='btn btn-danger text-white' style={{ cursor: "pointer" }} onClick={() => removeFriend(friend.ID)}><FaTrash /> Remove</button>
        <button className='btn btn-success text-white' style={{cursor:"pointer"}}><FaComment /> Chat</button>
        </div>
      </div>
    ))}
  </div>
</div>


      </div>
    </div>
  );
};

export default Friends;
