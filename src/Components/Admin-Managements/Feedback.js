import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Typography, Input, Button, Space, message } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

function FeedbackTable() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingReply, setEditingReply] = useState({});

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = () => {
    axios.get("http://localhost:8080/getAllFeedback")
      .then(response => {
        setFeedbacks(response.data);
        const initialReplies = {};
        response.data.forEach(item => {
          initialReplies[item.FeedbackID] = item.reply || "";
        });
        setEditingReply(initialReplies);
    
      })
      .catch(error => {
        console.error("Error fetching feedback data:", error);
        message.error("Failed to fetch feedback data");
      });
  };

  const handleReplyChange = (FeedbackID, value) => {
    setEditingReply({ ...editingReply, [FeedbackID]: value });
  };

  const handleSubmit = async (FeedbackID) => {
    try {
      await axios.put(`http://localhost:8080/feedback`, {
        FeedbackID,
        reply: editingReply[FeedbackID]
      });
      message.success("Reply updated successfully");
      fetchFeedbacks();  // Refresh feedbacks to show updated data
    } catch (error) {
      console.error("Error updating reply:", error);
      message.error("Failed to update reply");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "FeedbackID",
      key: "FeedbackID"
    },
    {
      title: "User ID",
      dataIndex: "UserID",
      key: "UserID"
    },
    {
      title: "Feedback",
      dataIndex: "feedbackText",
      key: "feedbackText"
    },
    {
      title: "Date",
      dataIndex: "submission_date",
      key: "submission_date"
    },
    {
      title: "Reply",
      dataIndex: "Replay",
      key: "Replay",
      render: (text, record) => (
        <Space size="middle">
          <TextArea
            rows={2}
            value={editingReply[record.FeedbackID] || ""}
            onChange={(e) => handleReplyChange(record.FeedbackID, e.target.value)}
            placeholder="Enter your reply here"
          />
          <Button type="primary" onClick={() => handleSubmit(record.FeedbackID)}>Submit Reply</Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Feedbacks</Title>
      <Table
        dataSource={feedbacks}
        columns={columns}
        pagination={{ pageSize: 10 }}
        bordered
        size="middle"
        scroll={{ x: "max-content" }}
        rowKey="FeedbackID"
      />
    </div>
  );
}

export default FeedbackTable;
