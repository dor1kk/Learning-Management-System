import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Typography, Avatar, List, Input, Select } from 'antd';
import { UserOutlined, InfoCircleOutlined, GraduationCapOutlined, UserTieOutlined, BriefcaseOutlined } from '@mui/material';
import "./Tutors.css";
import { Cases, LaptopOutlined, Person, VerifiedUser, VerifiedUserOutlined } from "@mui/icons-material";

function Tutors() {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchTutors();
  }, [searchQuery, filter]);

  const fetchTutors = async () => {
    try {
      let url = "http://localhost:8080/tutors";
      if (searchQuery) {
        url += `?search=${searchQuery}`;
      }
      if (filter) {
        url += `&filter=${filter}`;
      }
      const response = await axios.get(url);
      setTutors(response.data);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };

  return (
    <div className="c-container p-5">
      <div className="mt-4">
        <div style={{ marginBottom: 16 }}>
          <Input.Search
            placeholder="Search tutors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 200, marginRight: 10 , boxShadow:"0 2px 6px rgba(0,0,0,0.1)"}}
          />
          <Select
            placeholder="Filter by experience"
            style={{ width: 200, boxShadow:"0 2px 6px rgba(0,0,0,0.1)" }}
            value={filter}
            onChange={(value) => setFilter(value)}
          >
            <Select.Option value="beginner">Beginner</Select.Option>
            <Select.Option value="intermediate">Intermediate</Select.Option>
            <Select.Option value="advanced">Advanced</Select.Option>
          </Select>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Card className="p-4 d-flex flex-row" style={{ boxShadow: "0 3px 6px rgba(0,0,0,0.1)",height:"300px", borderRadius: "10px", marginTop: "16px", flex: 1, marginRight: "16px" }}>
                <div>
                  <Typography.Title level={3} type="primary">Become a tutor</Typography.Title>
                  <Typography.Text type="secondary">Start your journey sharing your knowledge...</Typography.Text>
                  <Button type="primary" onClick={() => navigate("/Home/BecomeTutor")}>Get started</Button>
                </div>
                <div className="d-flex flex-column">
                <Typography.Text type="secondary" style={{ marginTop: "8px" }}>Invite your friends</Typography.Text>
                  <Button type="default" style={{ marginTop: "8px" }}>Get the link!</Button>
                </div>
             
              </Card>

              <Card className="p-3 d-flex flex-row" style={{ boxShadow: "0 3px 6px rgba(0,0,0,0.1)",height:"300px", gap:"30px", borderRadius: "10px", marginTop: "16px", flex: 1, marginRight: "16px" }}>
              
                <div style={{ flex: 1 }}>
                  <Typography.Title level={3} type="primary">Top Tutors</Typography.Title>
                  <Typography.Text type="secondary">Here are our top tutors:</Typography.Text>
                  <List>
                    {tutors.slice(0, 4).map((tutor, index) => (
                      <List.Item key={tutor.id} style={{ marginBottom: '8px' }}>
                        <Avatar src={tutor.image_url} />
                        <Typography.Text>{index + 1}. {tutor.name}</Typography.Text>
                      </List.Item>
                    ))}
                  </List>
                </div>
              </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',}}>
            {tutors.map(tutor => (
              <div key={tutor.id} style={{ width: '100%' }}>
                <Card className="mt-3 d-flex flex-row justify-content-between align-items-center" style={{height:"120px",  boxShadow: "0 3px 6px rgba(0,0,0,0.1)", borderRadius: "10px", width: '100%' }}>
                  <div className="d-flex flex-row justify-content-center align-items-center">
                    <div>
                  <Avatar src={tutor.image_url} style={{ width: 80, height: 80, margin:3 }} />
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", marginLeft:"30px" }}>
                    <div>
                    <Typography.Title level={5}>{tutor.name}</Typography.Title>
                    </div>
                    <div className="d-flex flex-row">
                    <div style={{ display: 'flex', gap:"8px", justifyContent: 'space-between' }}>
                      <Typography.Text><LaptopOutlined className="text-primary" /> Courses: {tutor.courses}</Typography.Text>
                   
                    <Typography.Text> <VerifiedUserOutlined className="text-primary" /> Expertise: {tutor.expertise}</Typography.Text>
                    <Typography.Text> <Cases className="text-primary" /> Experience: {tutor.experience}</Typography.Text>
                    <Typography.Text> <Person className="text-primary" /> Bio: {tutor.bio}</Typography.Text>
                    </div>
                    </div>
                    <Button type="primary" className="w-25" style={{ marginTop: "8px" }} onClick={() => navigate(`/Home/TutorProfile/${tutor.id}`)}>View profile!</Button>
                  </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutors;
