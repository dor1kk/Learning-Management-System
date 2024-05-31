import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Avatar, Typography, Space, Spin, Tooltip, Empty, Menu, Dropdown, Button } from "antd";
import { EyeOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";

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
            <div style={{ border: "1px solid #e8e8e8", borderRadius: "5px", overflow: "hidden" }}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {filteredMessages.map(message => (
                  <li key={message.id} style={{ borderBottom: "1px solid #e8e8e8" }}>
                    <div style={{ display: "flex", alignItems: "center", padding: "12px" }}>
                      <Avatar icon={<UserOutlined />} />
                      <div style={{ flex: "1", marginLeft: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <Text strong>{message.reply}</Text>
                          <Space>
                            {renderListItemActions(message)}
                          </Space>
                        </div>
                        <div>
                          <Text strong>From:</Text> {message.email} <br />
                          <Text strong>Subject:</Text> {message.subject} <br />
                          <Text strong>Received:</Text> {message.receivedAt} <br />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Empty description="No messages match the selected filter" />
          )
        )}
      </div>
    </div>
  );
};

export default Messages;
