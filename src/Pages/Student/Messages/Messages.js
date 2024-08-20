import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, List, Typography, Space, Tooltip } from 'antd';
import {
  InboxOutlined,
  SendOutlined,
  FolderOpenOutlined,
  UserOutlined,
  GlobalOutlined,
  CreditCardOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import "../../../Styles/StudentStyles/Messages.css";

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { Text } = Typography;

const repliedEmailsEndpoint = "http://localhost:8080/replies";
const sentEmailsEndpoint = "http://localhost:8080/sentemails";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [menuKey, setMenuKey] = useState('1');

  useEffect(() => {
    const fetchRepliedEmails = async () => {
      try {
        const response = await axios.get(repliedEmailsEndpoint);
        setMessages(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching replied emails:", error);
        setLoading(false);
      }
    };

    fetchRepliedEmails();
  }, []);

  const handleMarkAsRead = async (messageId) => {
    try {
      await axios.put("http://localhost:8080/markasread", { messageId });
      setMessages(messages.filter(message => message.id !== messageId));
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const handleFilterChange = (filter) => {
    setFilter(filter.key);
  };

  const handleMenuClick = async (e) => {
    setMenuKey(e.key);
    setLoading(true);
    if (e.key === '1') {
      try {
        const response = await axios.get(repliedEmailsEndpoint);
        setMessages(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching replied emails:", error);
        setLoading(false);
      }
    } else if (e.key === '3') {
      try {
        const response = await axios.get(sentEmailsEndpoint);
        setMessages(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sent emails:", error);
        setLoading(false);
      }
    }
  };

  const filteredMessages = filter === "all" ? messages : messages.filter(message => filter === "read" ? message.read : !message.read);

  const renderListItemActions = (message) => (
    <Space>
      {!message.read && (
        <Tooltip title="Mark as Read">
          <EyeOutlined
            onClick={() => handleMarkAsRead(message.id)}
            style={{ cursor: "pointer", color: "#1890ff" }}
          />
        </Tooltip>
      )}
    </Space>
  );

  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[menuKey]}
          onClick={handleMenuClick}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1" icon={<InboxOutlined />}>
            Inbox
          </Menu.Item>
          <Menu.Item key="3" icon={<SendOutlined />}>
            Sent
          </Menu.Item>
          <Menu.ItemGroup key="g1" title="Labels">
            <Menu.Item key="7" icon={<FolderOpenOutlined />}>
              Work
            </Menu.Item>
            <Menu.Item key="8" icon={<UserOutlined />}>
              Personal
            </Menu.Item>
            <Menu.Item key="9" icon={<GlobalOutlined />}>
              Travel
            </Menu.Item>
            <Menu.Item key="10" icon={<CreditCardOutlined />}>
              Receipts
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px', background: '#fff' }}>
        <Header style={{ background: '#fff', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input.Search placeholder="Search mail" style={{ width: 300, marginRight: 20 }} />
            <Text>All</Text>
            <Text style={{ marginLeft: 20 }}>Unread</Text>
            <Text style={{ marginLeft: 20 }}>Starred</Text>
          </div>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 24, background: '#fff' }}>
          <List
            loading={loading}
            itemLayout="horizontal"
            dataSource={filteredMessages}
            renderItem={message => (
              <List.Item actions={renderListItemActions(message)}>
                <List.Item.Meta
                  title={<>Reply From Tutor: <Text strong>{message.reply}</Text></>}
                  description={<Text type="secondary">Message Sent: {message.message}</Text>}
                />
                <Text type="secondary">{message.date}</Text>
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Messages;
