import React from "react";
import { FaChalkboardTeacher, FaCheckSquare, FaClipboardList, FaClock, FaFolder, FaTimes, FaUserGraduate } from 'react-icons/fa';


const Details = ({ course }) => {
  if (!course) {
    return null;
  }

  return (
    <div className="card-details mb-4" style={{width:"400px"}}>
      <div className="card-body">
        <p className="card-text">{course.description}</p>
        <p><FaFolder /> Category: {course.category}</p>
        <img src={course.image} alt={course.title} className="img-fluid mb-3" style={{width:"300px"}} />
        <p><FaCheckSquare /> Prerequisites: {course.prerequisites.join(", ")}</p>
        <p><FaClock /> Duration: {course.duration}</p>
        <p><FaChalkboardTeacher /> Lectures: {course.lectures}</p>
        <p><FaClipboardList />  Assignments: {course.assignments}</p>
        <p><FaUserGraduate /> Tutor: {course.instructor}</p>
      </div>
    </div>
  );
};

export default Details;
