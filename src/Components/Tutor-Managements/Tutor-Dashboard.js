
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Typography } from 'antd';
import { FaChalkboardTeacher, FaCode, FaGraduationCap, FaUser } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import axios from 'axios';

const Dashboard = () => {
  const data = [
    { name: 'Courses', uv: 50, pv: 88 },
    { name: 'Enrollments', uv: 3000, pv: 3452 },
    { name: 'Exams', uv: 200, pv: 238 },
    { name: 'Lectures', uv: 2780, pv: 3540 },
  ];

  const[allStudents,setAllStudents]=useState(null)
  const[allTutors,setAllTutors]=useState(null)
  const[allCourses,setAllCourses]=useState(null);
  const[allUsers,setAllUsers]=useState(null);


  const fetchAllStudents=async ()=>{
    const response=await axios.get("http://localhost:8080/allStudents");
    setAllStudents(response.data.totalStudents);
  }

  
  const fetchAllTutors=async ()=>{
    const response=await axios.get("http://localhost:8080/totalExams");
    setAllTutors(response.data.totalExams);
  }

  const fetchAllCourses=async ()=>{
    const response=await axios.get("http://localhost:8080/totalcourses");
    setAllUsers(response.data.totalCourses);
  }

  const fetchAllUsers=async ()=>{
    const response=await axios.get("http://localhost:8080/totalcourses");
    setAllUsers(response.data.totalCourses);
  }




  useEffect(()=>{
    fetchAllStudents();
    fetchAllTutors();
    fetchAllCourses();
    fetchAllUsers();
  },[]);

  return (
    <main className='c-container p-5'>
      <Row gutter={[16, 16]} className='main-cards'>
        <Col xs={24} sm={12} md={6}>
          <Card className='card' style={{ backgroundColor: '#FFFFFF', color: '#2774AE', boxShadow: '0 2px 4px rgba(39, 116, 174, 0.2)' }}>
            <Statistic title="EXAMS" value={allTutors} prefix={<FaChalkboardTeacher />} valueStyle={{ color: '#2774AE' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className='card' style={{ backgroundColor: '#FFFFFF', color: '#2774AE', boxShadow: '0 2px 4px rgba(39, 116, 174, 0.2)' }}>
            <Statistic title="ENROLLMENTS" value={allStudents} prefix={<FaGraduationCap />} valueStyle={{ color: '#2774AE' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className='card' style={{ backgroundColor: '#FFFFFF', color: '#2774AE', boxShadow: '0 2px 4px rgba(39, 116, 174, 0.2)' }}>
            <Statistic title="COURSES" value={allUsers} prefix={<FaUser />} valueStyle={{ color: '#2774AE' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className='card' style={{ backgroundColor: '#FFFFFF', color: '#2774AE', boxShadow: '0 2px 4px rgba(39, 116, 174, 0.2)' }}>
            <Statistic title="LECTURES" value={allCourses} prefix={<FaCode />} valueStyle={{ color: '#2774AE' }} />
          </Card>
        </Col>
       
      </Row>

      <Row gutter={[16, 16]} className='charts mt-3'>
        <Col xs={24} lg={12}>
          <Card style={{ backgroundColor: '#FFFFFF' }}>
            <Typography.Title level={4}>Bar Chart</Typography.Title>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#2774AE" />
                <Bar dataKey="uv" fill="#1890FF" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card style={{ backgroundColor: '#FFFFFF' }}>
            <Typography.Title level={4}>Line Chart</Typography.Title>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#2774AE" strokeWidth={2} />
                <Line type="monotone" dataKey="uv" stroke="#1890FF" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </main>
  );
};
 
export default Dashboard;




