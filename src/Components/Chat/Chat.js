import React, { useEffect, useState } from 'react';
import { Layout, List, Input, Button, Avatar, Menu, Typography } from 'antd';
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout; 


const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friends,setFriends]=useState([]);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/myfriends`);
      setFriends(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(()=>{
    fetchFriends();
  })


  const handleMessageSend = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'User',
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
  };
  


  return (
    <Layout style={{ minHeight: '80vh', backgroundColor:"#B9D9EB" }}>
      <Sider width={200} style={{backgroundColor:"white"}}>
 
        <Menu
          mode="inline"
          defaultSelectedKeys={['0']}
          style={{ height: '100%', borderRight: 0 , marginTop:"20px"}}
          onSelect={({ key }) => handleFriendSelect(friends[key])}
        >
          {friends.map((friend, index) => (
            <Menu.Item key={friend.ID}>{friend.Name}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ color: 'white', textAlign: 'center', fontSize: '24px'}} className='bg-primary'>
        Chat with {selectedFriend ? selectedFriend.Name : 'Friend'}       
         </Header>
        <Content style={{ padding: '50px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <List
              style={{ width: '60%', marginBottom: '20px' }}
              itemLayout="horizontal"
              dataSource={messages.filter(message => message.sender === selectedFriend)}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>U</Avatar>}
                    title={<b>{item.sender}</b>}
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
