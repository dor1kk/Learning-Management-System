import React, { useState, useEffect } from 'react';
import { Card, Button, Descriptions, Select, Spin, message, Row, Col, Typography, Modal, Form, Input } from 'antd';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

const ContentManagement = () => {
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

  const fetchRequests=()=>{
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
      console.error('Error approving course request:', error);
      message.error('Error approving course request');
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

  const categories = ['course_creation', 'content_approval', 'rolechange', 'other'];

  return (
    <div className="c-container p-5">
      <Title level={2} className='text-primary'>Content Management</Title>
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
              <Card title={requestDetails.title} className="mb-3">
                <Descriptions column={1}>
                  <Descriptions.Item label="Description">{requestDetails.description}</Descriptions.Item>
                  <Descriptions.Item label="Category">{requestDetails.category}</Descriptions.Item>
                  <Descriptions.Item label="Duration">{requestDetails.duration}</Descriptions.Item>
                  <Descriptions.Item label="Lectures">{requestDetails.lectures}</Descriptions.Item>
                  <Descriptions.Item label="Assignments">{requestDetails.assignments}</Descriptions.Item>
                </Descriptions>
                <Button type="primary" onClick={() => handleApprove(request.RequestID)} style={{ marginRight: '10px' }}>
                  Approve
                </Button>
                <Button type="danger" onClick={() => handleReject(request.RequestID)}>
                  Reject
                </Button>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Modal
        title="Reason for Rejection"
        visible={modalVisible}
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
