import React, { useEffect, useState } from 'react';
import { Layout, List, Input, Button, Avatar, Menu } from 'antd';
import axios from 'axios';
import io from 'socket.io-client';

const { Header, Content, Sider } = Layout;

const socket = io('http://localhost:8080'); // Change this to your server URL

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/myfriends`);
      setFriends(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  useEffect(() => {
    fetchFriends();

    // Listen for incoming messages
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMessageSend = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'User',
        receiver: selectedFriend.ID, // Add receiver ID to the message
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      socket.emit('message', newMessage); // Emit the message to the server
      setInputValue('');
    }
  };

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    // Clear messages when a new friend is selected
    setMessages([]);
  };

  return (
    <Layout style={{ minHeight: '80vh', backgroundColor: "#B9D9EB" }}>
      <Sider width={200} style={{ backgroundColor: "white" }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['0']}
          style={{ height: '100%', borderRight: 0, marginTop: "20px" }}
          onSelect={({ key }) => handleFriendSelect(friends[key])}
        >
          {friends.map((friend, index) => (
            <Menu.Item key={friend.ID}>{friend.Name}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ color: 'white', textAlign: 'center', fontSize: '24px' }} className='bg-primary'>
          Chat with {selectedFriend ? selectedFriend.Name : 'Friend'}
        </Header>
        <Content style={{ padding: '50px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <List
              style={{ width: '60%', marginBottom: '20px' }}
              itemLayout="horizontal"
              dataSource={messages.filter(message => message.receiver === selectedFriend?.ID || message.sender === selectedFriend?.ID)}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>U</Avatar>}
                    title={<b>{item.sender === 'User' ? 'You' : selectedFriend?.Name}</b>}
                    description={item.text}
                  />
                  <div>{item.timestamp}</div>
                </List.Item>
              )}
            />
            <Input
              style={{ width: '60%', marginBottom: '20px' }}
              placeholder="Type a message..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onPressEnter={handleMessageSend}
            />
            <Button type="primary" onClick={handleMessageSend}>Send</Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatPage;
