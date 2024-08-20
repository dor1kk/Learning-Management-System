import React, { useState, useEffect } from 'react';
import { Card, Button, Descriptions, Select, Spin, message, Row, Col, Typography, Modal, Form, Input } from 'antd';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../Styles/AdminStyles/ContentManagement.css'; 

const { Option } = Select;
const { TextArea } = Input;

const ContentManagement = ({role}) => {

  if (role !== "Admin") {
    window.location.href = "/unauthorized";
  }
  
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    axios.get('http://localhost:8080/approval_req')
    .then(response => {
      setRequests(response.data);
      setFilteredRequests(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching requests:', error);
      setLoading(false);
    });
  }

  const handleFilterChange = (value) => {
    setCategoryFilter(value);
    if (value) {
      setFilteredRequests(requests.filter(request => request.RequestType === value));
    } else {
      setFilteredRequests(requests);
    }
  };

  const handleApprove = async (requestId, responseMessage) => {
    try {
      const response = await axios.post(`http://localhost:8080/accept_req`, {
        requestId,
        approval: 'approved',
        responseMessage
      });

      fetchRequests();

      message.success(response.data.message);
    } catch (error) {
      console.error('Error approving request:', error);
      message.error('Error approving request');
    }
  };

  const handleTutorApprove = async (requestId, responseMessage) => {
    try {
      const response = await axios.post(`http://localhost:8080/accepttutor`, {
        requestId,
        approval: 'approved',
        responseMessage
      });

      fetchRequests();

      message.success(response.data.message);
    } catch (error) {
      console.error('Error approving request:', error);
      message.error('Error approving request');
    }
  };
  
  

  const handleReject = (requestId) => {
    setSelectedRequestId(requestId);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setRejectionReason('');
    setSelectedRequestId(null);
  };

  const handleModalSubmit = () => {
    axios.post(`http://localhost:8080/reject_req`, {
      requestId:selectedRequestId,
      status: 'rejected',
      responseMessage: rejectionReason
    })
    .then(response => {
      message.success('Request rejected successfully');
      setModalVisible(false);
      setRequests(requests.filter(request => request.RequestID !== selectedRequestId));
      setFilteredRequests(filteredRequests.filter(request => request.RequestID !== selectedRequestId));
    })
    .catch(error => {
      console.error('Error rejecting request:', error);
      message.error('Error rejecting request');
    });
  };

  if (loading) {
    return <Spin size="large" />;
  }

  const categories = ['course_creation', 'content_approval', 'role_change', 'other'];

  return (
    <div className="container p-5">
      <div className="mb-3">
        <Select
          placeholder="Filter by request type"
          onChange={handleFilterChange}
          value={categoryFilter}
          style={{ width: '200px' }}
        >
          <Option value="">All Request Types</Option>
          {categories.map(category => (
            <Option key={category} value={category}>{category}</Option>
          ))}
        </Select>
      </div>
      <Row gutter={[16, 16]}>
        {filteredRequests.map(request => {
          const requestDetails = JSON.parse(request.RequestDetails);
          return (
            <Col span={8} key={request.RequestID}>
              {request.RequestType === 'course_creation' ? (
                <Card title={requestDetails.title} className="mb-3 custom-card">
                  <Descriptions column={1}>
                    <Descriptions.Item label="Description">{requestDetails.description}</Descriptions.Item>
                    <Descriptions.Item label="Category">{requestDetails.category}</Descriptions.Item>
                    <Descriptions.Item label="Duration">{requestDetails.duration}</Descriptions.Item>
                  </Descriptions>
                  <div className="card-buttons">
                    <Button type="primary" onClick={() => handleApprove(request.RequestID)} style={{ marginRight: '10px' }}>
                      Approve
                    </Button>
                    <Button type="danger" onClick={() => handleReject(request.RequestID)}>
                      Reject
                    </Button>
                  </div>
                </Card>
              ) : request.RequestType === 'role_change' ? (
                <Card title={requestDetails.title} className="mb-3 custom-card">
                  <Descriptions column={1}>
                    <Descriptions.Item label="User">{requestDetails.name}</Descriptions.Item>
                    <Descriptions.Item label="New Role Reqeust">From Student to Tutor</Descriptions.Item>
                    <Descriptions.Item label="Expertise">{requestDetails.expertise}</Descriptions.Item>
                    <Descriptions.Item label="Experience">{requestDetails.experience}</Descriptions.Item>
                    <Descriptions.Item label="Bio">{requestDetails.bio}</Descriptions.Item>
                    <Descriptions.Item label="Contact">{requestDetails.contact}</Descriptions.Item>
                    <Descriptions.Item label="Email">{requestDetails.email}</Descriptions.Item>
                    <Descriptions.Item label="Location">{requestDetails.location}</Descriptions.Item>


                  </Descriptions>
                  <div className="card-buttons">
                    <Button type="primary" onClick={() => handleTutorApprove(request.RequestID)} style={{ marginRight: '10px' }}>
                      Approve
                    </Button>
                    <Button type="danger" onClick={() => handleReject(request.RequestID)}>
                      Reject
                    </Button>
                  </div>
                </Card>
              ) : (
                <div></div>
              )}
            </Col>
          );
        })}
      </Row>
      <Modal
        title="Reason for Rejection"
        visible={        modalVisible}
        onOk={handleModalSubmit}
        onCancel={handleModalCancel}
      >
        <Form>
          <Form.Item
            label="Rejection Reason"
            name="rejectionReason"
            rules={[{ required: true, message: 'Please input the rejection reason' }]}
          >
            <TextArea rows={4} value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContentManagement;

