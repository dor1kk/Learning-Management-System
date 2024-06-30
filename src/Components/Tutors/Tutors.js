import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Typography, Avatar, Row, Col, Input, Select, Tag, Modal } from 'antd';
import "./Tutors.css";
import BecomeTutor from "./BecomeTutor";

const { Title, Text } = Typography;
const { Option } = Select;

function Tutors() {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    fetchTutors();
  }, [searchQuery, filter]);

  const fetchTutors = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tutors");
      setTutors(response.data);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };

  return (
    <div className="container p-5">
      <div className="search-filter-bar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Input.Search
          placeholder="Search tutors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: 200, marginRight: 10 }}
        />
        <Select
          placeholder="Filter by experience"
          style={{ width: 200 }}
          value={filter}
          onChange={(value) => setFilter(value)}
        >
          <Option value="beginner">Beginner</Option>
          <Option value="intermediate">Intermediate</Option>
          <Option value="advanced">Advanced</Option>
        </Select>
      </div>
<div className="d-flex flex-row justify-content-between" style={{gap:"20px"}}>
      <div className="top-tutors-section" style={{ marginBottom: '24px' }}>
        <Card title="Top Tutors" style={{ boxShadow: "0 3px 6px rgba(0,0,0,0.1)", borderRadius: "10px", height:"200px" }}>
          <Row gutter={[16, 16]}>
            {tutors.slice(0, 6).map((tutor, index) => (
              <Col key={tutor.id} span={2}>
                <Card.Meta
                  avatar={<Avatar src={tutor.image_url} />}
                  title={<Link to={`/Home/TutorProfile/${tutor.id}`}>{index + 1}. {tutor.name}</Link>}
                />
              </Col>
            ))}
          </Row>
        </Card>
      </div>
      <Card className="become-tutor-card" style={{ textAlign: 'center', boxShadow: "0 3px 6px rgba(0,0,0,0.1)", borderRadius: "10px", height:"200px" }}>
        <Title level={3}>Become a Tutor</Title>
        <Text>Start your journey sharing your knowledge...</Text>
        <Button type="primary" style={{ marginTop: '16px' }} onClick={handleModalOpen}>Become a Tutor</Button>
        <Modal
          title="Become a Tutor"
          visible={modalVisible}
          onCancel={handleModalClose}
          footer={null}
        >
          <BecomeTutor /> 
        </Modal>
      </Card>

</div>
      <div className="all-tutors-section">
        {tutors.map(tutor => (
          <Card key={tutor.id} className="tutor-card" style={{ marginBottom: '16px', boxShadow: "0 3px 6px rgba(0,0,0,0.1)", borderRadius: "10px" }}>
            <div className="tutor-card-content" style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={tutor.image_url} size={80} />
              <div style={{ marginLeft: '24px', flex: 1 }}>
                <Title level={5}>{tutor.name}</Title>
                <Text>Expertise: {tutor.expertise}</Text><br />
                <Text>Experience: {tutor.experience} years</Text><br />
                <Button type="primary" style={{ marginTop: '8px' }} onClick={() => navigate(`/Home/TutorProfile/${tutor.TutorID}`)}>View Profile</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

    
    </div>
  );
}

export default Tutors;
