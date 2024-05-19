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


function Dashboard() {

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
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
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
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Dashboard;