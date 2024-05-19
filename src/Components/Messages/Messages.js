import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Avatar, Typography, Space, Spin, Tooltip } from "antd";
import { MessageOutlined, EyeOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const handleMarkAsRead = (messageId) => {
    axios.put("http://localhost:8080/markasread",{
        messageId:messageId
    });
  };

  return (
    <div style={{ padding: "24px" }}>
      <Typography.Title level={2} className="text-primary">Messages</Typography.Title>
      {loading ? (
        <Spin size="large" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(message) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={<MessageOutlined />}
                    style={{ backgroundColor: message.read ? "#ccc" : "#1890ff" }}
                  />
                }
                title={message.reply}
                description={
                  <div>
                    <Text strong>From:</Text> {message.email} <br />
                    <Text strong>Your Message:</Text> {message.message} <br />
                  </div>
                }
              />
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
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Messages;
