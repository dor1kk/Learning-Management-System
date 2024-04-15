import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import "./Exams.css";

function Exams() {
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
    console.log("Navigating to exams page for course with ID:", courseId);
  };

  return (
    <main className="exam-container">
      <section className="exam-course-cards">
        {enrolledCourses.map((course) => (
          <div key={course.EnrollmentID} className="exam-card">
            <div className="exam-card-image">
              <img src={course.Image} alt={course.Title} />
            </div>
            <div className="exam-card-details">
              <h2 className="exam-course-title">{course.Title}</h2>
              <div className="exam-links">
                <Link
                  to={`/home/exam?courseId=${course.CourseID}`}
                  className="exam-btn"
                  onClick={() => handleClick(course.CourseID)}
                >
                  <FaPencilAlt /> Exams
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Exams;
