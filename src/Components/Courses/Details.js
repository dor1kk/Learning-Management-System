import React, { useState, useEffect } from "react";
import { FaChalkboardTeacher, FaCheckSquare, FaClipboardList, FaClock, FaCode, FaFolder, FaTimes, FaUserGraduate } from 'react-icons/fa';
import axios from "axios";
import { Tag } from "antd";

const Details = ({ courseId }) => {
  
  const [courses,setCourses]=useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/courses/${courseId}`);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <div className="d-flex flex-column">
        <span className="mt-3" style={{fontSize:"20px", color:"gray"}}><FaCode /> {courses.Title}</span>
        
        <span className="mt-3" style={{color:"gray"}}><Tag color="blue"><FaCode /> Category:</Tag> {courses.Category}</span>

        <span color="orange" className="mt-3 " style={{width:"1000px", color:"gray"}}><Tag color="orange"><FaCode />Description:</Tag> {courses.Description}</span>
        <span  className="mt-3 " style={{width:"500px", color:"gray"}}><Tag color="blue"><FaCode />Image:</Tag><img src={courses.Image} style={{height:"280px"}}></img></span>
        <span  className="mt-3 " style={{width:"500px", color:"gray"}}><Tag color="orange"><FaCode />Lectures:</Tag> {courses.Lectures}</span>





    </div>
  );
};

export default Details;
