import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaChalkboard } from "react-icons/fa";
import "./CourseLecture.css";

function CourseLecture() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/enrolledcourses");
      setEnrolledCourses(response.data.enrolledCourses);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleClick = (courseId) => {
    console.log("Navigating to lectures page with courseId:", courseId);
  };

  return (
    <main className="container">
      <section className="cslec-course-cards">
        {enrolledCourses.map((course) => (
          <div
            key={course.EnrollmentID}
            className="cslec-card"
            style={{
              backgroundImage: `url(${course.Image})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="cslec-card-overlay">
              <div className="cslec-card-body">
                <span className="cslec-course-title" style={{fontWeight:"bold", color: "white"}}>{course.Title}</span>
                <div className="cslec-links">
                  <Link to={`/home/ligjeratat/${course.CourseID}`} className="btn text-white" onClick={() => handleClick(course.CourseID)}>
                    <FaChalkboard /> Lectures...
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default CourseLecture;
