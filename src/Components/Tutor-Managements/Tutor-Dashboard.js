import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import { IoBookOutline } from 'react-icons/io5';
import { MdSchool } from 'react-icons/md';
import { FaGraduationCap, FaUser } from 'react-icons/fa';
import { FaChalkboardTeacher } from 'react-icons/fa';


function TutorDashboard() {

    const data = [
        {
          name: 'Courses',
          uv: 50,
          pv: 88,
          amt: 2400,
        },
        {
          name: 'Enrolled Students',
          uv: 3000,
          pv: 3452,
          amt: 2210,
        },
        {
          name: 'Top Course',
          uv: 200,
          pv: 238,
          amt: 2290,
        },
        {
          name: 'Users',
          uv: 2780,
          pv: 3540,
          amt: 2000,
        },
        
      ];
     

  return (
    <main className='main-container'>
    
        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner d-flex flex-column'>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h3 className='text-white'>AVG GRADE</h3>
                    <FaChalkboardTeacher className='card_icon ' style={{color:"white"}}/>
                    </div>
                    <div>
                    <h1 className='text-white'>8.8</h1>

                    </div>
                </div>
            </div>
            <div className='card'>
                <div className='card-inner d-flex flex-column'>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h3 className='text-white' >STUDENTS</h3>
                    <FaGraduationCap className='card_icon ' style={{color:"white"}}/>
                    </div>
                    <div>
                    <h1 className='text-white'>3452</h1>

                    </div>
                </div>
            </div>
            <div className='card'>
                <div className='card-inner d-flex flex-column'>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h3 className='text-white' >COURSES</h3>
                    <IoBookOutline className='card_icon ' style={{color:"white"}}/>
                    </div>
                    <div>
                    <h1 className='text-white'>238</h1>

                    </div>
                </div>
            </div>
            <div className='card'>
                <div className='card-inner d-flex flex-column'>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h3 className='text-white' >EXAMS</h3>
                    <FaUser className='card_icon ' style={{color:"white"}}/>
                    </div>
                    <div>
                    <h1 className='text-white'>20</h1>

                    </div>
                </div>
            </div>
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

export default TutorDashboard;