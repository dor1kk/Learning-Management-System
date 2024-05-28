import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Avatar, Typography, Space, Spin, Tooltip, Empty, Menu, Dropdown, Button } from "antd";
import { MessageOutlined, EyeOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const repliedEmailsEndpoint = "http://localhost:8080/replies";

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
      // Assuming messageId will be removed from the list, so updating state accordingly
      setMessages(messages.filter(message => message.id !== messageId));
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const handleFilterChange = (filter) => {
    setFilter(filter.key);
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

  const menu = (
    <Menu onClick={handleFilterChange}>
      <Menu.Item key="all">All</Menu.Item>
      <Menu.Item key="read">Read</Menu.Item>
      <Menu.Item key="unread">Unread</Menu.Item>
    </Menu>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div className="c-container" style={{ flex: "0 0 20%", padding: "24px" }}>
        <Text strong>Filter by:</Text>
        <Dropdown overlay={menu}>
          <Button>
            {filter === "all" ? "All" : filter === "read" ? "Read" : "Unread"} <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div style={{ flex: "1", padding: "24px", backgroundColor: "#ffffff" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
            <Spin size="large" />
          </div>
        ) : (
          filteredMessages.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={filteredMessages}
              renderItem={(message) => (
                <List.Item
                  actions={[renderListItemActions(message)]}
                  style={{ backgroundColor: message.read ? "#ffffff" : "#fffff" }}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={message.reply}
                    description={
                      <div>
                        <Text strong>From:</Text> {message.email} <br />
                        <Text strong>Subject:</Text> {message.subject} <br />
                        <Text strong>Received:</Text> {message.receivedAt} <br />
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty description="No messages match the selected filter" />
          )
        )}
      </div>
    </div>
  );
};

export default Messages;
