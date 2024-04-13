import React, { useState, useEffect } from "react";
import "./YourCourses.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaChalkboard, FaTasks } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";

function YourCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchCourses();
    fetchUserId();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/enrolledcourses");
      setEnrolledCourses(response.data.enrolledCourses);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  const fetchUserId = async () => {
    try {
      const response = await axios.get('http://localhost:8080/userid');
      if (response.data.valid) {
        setUserId(response.data.userid);
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    });
  };

  const handleDelete = async (courseId) => {
    try {
      console.log('Deleting course with ID:', courseId);
      const response = await axios.delete(`http://localhost:8080/enroll/${courseId}/${userId}`);
      
      if (response.status === 200) {
        fetchCourses();
      } else {
        throw new Error('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleClick = (courseId) => {
    console.log("Navigating to lectures page with courseId:", courseId);
  };

  return (
    <main className="yc-container">
      <section className="course-cardsi">
        {enrolledCourses.map((course) => (
          <div key={course.EnrollmentID} className="kard">
            <img src={course.Image} alt="Course" className="card-imgage" />
            <div className="card-bodi d-flex flex-row justify-content-between">
              <div className="spans d-flex flex-column">
                <span style={{fontWeight:"bold"}}>{course.Title}</span>
              </div>
              <div className="progresi">
                <div className="progress" style={{ width: "150px", marginTop: "10px", marginLeft:"25px" }}>
                  <div className="progress-bar bg-primary" role="progressbar" style={{ width: "60%" }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <span style={{fontSize:"11px", color:"gray", marginRight:"20px"}}>
                  You have enrolled on this course on: <br />
                  {formatDate(course.EnrollmentDate)}
                </span>
              </div>
              <div>
                <button onClick={()=>handleDelete(course.CourseID)} className="btn btn-danger text-white" style={{marginRight:"15px",paddingBottom:"15px", width:"40px", height:"40px", borderRadius:"50%"}}>
                  <AiOutlineCloseCircle/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default YourCourses;
