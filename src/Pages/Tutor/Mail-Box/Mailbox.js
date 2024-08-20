import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Avatar, Space, Tag, Modal, Button, Input, Select } from "antd";
import { MailOutlined, FilterOutlined } from "@ant-design/icons";

const { Option } = Select;

const Mailbox = () => {
  const [emails, setEmails] = useState([]);
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [reply, setReply] = useState("");
  const [filterType, setFilterType] = useState("nonReplied"); 

  const fetchEmails = async () => {
    try {
      let response;
      switch (filterType) {
        case "replied":
          response = await axios.get("http://localhost:8080/replied-emails");
          break;
        case "nonReplied":
          response = await axios.get("http://localhost:8080/nonreplied-emails");
          break;
        default:
          response = await axios.get("http://localhost:8080/emails");
          break;
      }
      setEmails(response.data.results);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [filterType]); 
  const handleReply = (email) => {
    setSelectedEmail(email);
    setReplyModalVisible(true);
  };

  const handleSendReply = async () => {
    try {
      await axios.post("http://localhost:8080/addreply", {
        reply: reply,
        email: selectedEmail.id 
      });

      setReplyModalVisible(false);
      setSelectedEmail(null);
      setReply("");
      fetchEmails();
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  const handleModalCancel = () => {
    setReplyModalVisible(false);
    setSelectedEmail(null);
    setReply(""); 
  };

  return (
    <div className="container p-5">
      <div style={{ marginBottom: "16px" }}>
        <Input
          style={{ width: "200px", marginRight: "8px" }}
          placeholder="Search emails"
        />
        <Select
          style={{ width: "150px", marginRight: "8px" }}
          placeholder="Filter by"
          suffixIcon={<FilterOutlined />}
          value={filterType}
          onChange={(value) => setFilterType(value)}
        >
          <Option value="all">All Emails</Option>
          <Option value="replied">Replied Emails</Option>
          <Option value="nonReplied">Non-Replied Emails</Option>
        </Select>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={emails}
        renderItem={(email) => (
          <List.Item
            key={email.EmailsID}
            actions={[
              <Space key="actions">
                <span>{email.date}</span>
                {email.tags && email.tags.length > 0 && (
                  <span>
                    {email.tags.map((tag) => (
                      <Tag key={tag} color="blue">
                        {tag}
                      </Tag>
                    ))}
                  </span>
                )}
                <Button onClick={() => handleReply(email)}>Reply</Button>
              </Space>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar className="bg-primary" icon={<MailOutlined />} />}
              title={<a href="#" className="text-primary">{email.subject}</a>}
              description={email.message.slice(0, 100) + "..."} 
            />
          </List.Item>
        )}
      />

      {selectedEmail && (
        <Modal
          title={`Reply to: ${selectedEmail.subject}`}
          visible={replyModalVisible}
          onCancel={handleModalCancel}
          footer={[
            <Button key="cancel" onClick={handleModalCancel}>
              Cancel
            </Button>,
            <Button key="send" type="primary" onClick={handleSendReply}>
              Send
            </Button>,
          ]}
        >
          <Input.TextArea
            rows={4}
            value={reply}
            onChange={(e) => setReply(e.target.value)} 
            placeholder="Type your reply here..."
          />
        </Modal>
      )}
    </div>
  );
};

export default Mailbox;
