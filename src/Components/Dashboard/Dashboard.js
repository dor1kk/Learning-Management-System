<<<<<<< HEAD
import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import  './Dashboard.css';
 import { IoBookOutline } from 'react-icons/io5';
import { MdSchool } from 'react-icons/md';
import { FaGraduationCap, FaUser } from 'react-icons/fa';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
=======
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Typography } from 'antd';
import { FaChalkboardTeacher, FaCode, FaGraduationCap, FaUser } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const data = [
    { name: 'Tutors', uv: 50, pv: 88 },
    { name: 'Students', uv: 3000, pv: 3452 },
    { name: 'Courses', uv: 200, pv: 238 },
    { name: 'Users', uv: 2780, pv: 3540 },
  ];

  const[allStudents,setAllStudents]=useState(null)
  const[allTutors,setAllTutors]=useState(null)
  const[allCourses,setAllCourses]=useState(null);
  const[allUsers,setAllUsers]=useState(null);
>>>>>>> origin/main


  const fetchAllStudents=async ()=>{
    const response=await axios.get("http://localhost:8080/allStudents");
    setAllStudents(response.data.totalStudentat);
  }

<<<<<<< HEAD
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalTutors, setTotalTutors] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);

    useEffect(() => {
        fetchTotalStudents();
        fetchTotalTutors();
        fetchTotalUsers();
        fetchTotalCourses();
    }, []);

    const fetchTotalStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/total-students');
            setTotalStudents(response.data.totalStudents);
        } catch (error) {
            console.error('Error fetching total number of students:', error);
        }
    };

    const fetchTotalTutors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/total-tutors');
            setTotalTutors(response.data.totalTutors);
        } catch (error) {
            console.error('Error fetching total number of tutors:', error);
        }
    };

    const fetchTotalUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/total-users');
            setTotalUsers(response.data.totalUsers);
        } catch (error) {
            console.error('Error fetching total number of users:', error);
        }
    };

    const fetchTotalCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/total-courses');
            setTotalCourses(response.data.totalCourses);
        } catch (error) {
            console.error('Error fetching total number of courses:', error);
        }
    };

    const data = [
        { name: 'Tutors', uv: totalTutors, pv: 88, amt: 2400 },
        { name: 'Students', uv: totalStudents, pv: 3452, amt: 2210 },
        { name: 'Courses', uv: totalCourses, pv: 238, amt: 2290 },
        { name: 'Users', uv: totalUsers, pv: 3540, amt: 2000 },
    ];

  return (
   <main className='main-container'>
            <div className='main-cards'>
                {data.map((item, index) => (
                    <div key={index} className='card'>
                        <div className='card-inner d-flex flex-column'>
                            <div className='d-flex flex-column justify-content-center align-items-center'>
                                <h3 className='text-white'>{item.name}</h3>
                                {index === 0 && <FaChalkboardTeacher className='card_icon' style={{ color: 'white' }} />}
                                {index === 1 && <FaGraduationCap className='card_icon' style={{ color: 'white' }} />}
                                {index === 2 && <IoBookOutline className='card_icon' style={{ color: 'white' }} />}
                                {index === 3 && <FaUser className='card_icon' style={{ color: 'white' }} />}
                            </div>
                            <div>
                                <h1 className='text-white'>{item.uv}</h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
       

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            style={{background:"rgba(228, 228, 228, 0.35)", boxShadow:"1px 1px 10px lightgrey" }}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="1 1" />
=======
  
  const fetchAllTutors=async ()=>{
    const response=await axios.get("http://localhost:8080/totalTutors");
    setAllTutors(response.data.totalTutors);
  }

  const fetchAllCourses=async ()=>{
    const response=await axios.get("http://localhost:8080/allCourses");
    setAllCourses(response.data.totalCourses);
  }

  const fetchAllUsers=async ()=>{
    const response=await axios.get("http://localhost:8080/getAllUsers");
    setAllUsers(response.data.totalUsers);
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
            <Statistic title="TUTORS" value={allTutors} prefix={<FaChalkboardTeacher />} valueStyle={{ color: '#2774AE' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className='card' style={{ backgroundColor: '#FFFFFF', color: '#2774AE', boxShadow: '0 2px 4px rgba(39, 116, 174, 0.2)' }}>
            <Statistic title="STUDENTS" value={allStudents} prefix={<FaGraduationCap />} valueStyle={{ color: '#2774AE' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className='card' style={{ backgroundColor: '#FFFFFF', color: '#2774AE', boxShadow: '0 2px 4px rgba(39, 116, 174, 0.2)' }}>
            <Statistic title="COURSES" value={allCourses} prefix={<FaCode />} valueStyle={{ color: '#2774AE' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className='card' style={{ backgroundColor: '#FFFFFF', color: '#2774AE', boxShadow: '0 2px 4px rgba(39, 116, 174, 0.2)' }}>
            <Statistic title="USERS" value={allUsers} prefix={<FaUser />} valueStyle={{ color: '#2774AE' }} />
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
>>>>>>> origin/main
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
