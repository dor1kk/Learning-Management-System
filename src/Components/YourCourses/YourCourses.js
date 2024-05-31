import React, { useState, useEffect } from "react";
import "./YourCourses.css";
import axios from "axios";
import { Button, Input } from "@mui/material";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { notification, Tag, Modal } from "antd";
import ReviewModal from "./Review"; // Import the ReviewModal component
import ProgressModal from "./Progress"; // Import the ProgressModal component

function YourCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userId, setUserId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState(null);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [progressModalVisible, setProgressModalVisible] = useState(false);
  const [courseIdToReview, setCourseIdToReview] = useState(null);
  const [courseIdToProgress, setCourseIdToProgress] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleDelete = (courseId) => {
    setModalVisible(true);
    setCourseIdToDelete(courseId);
  };

  const confirmDelete = async () => {
    try {
      console.log('Deleting course with ID:', courseIdToDelete);
      const response = await axios.delete(`http://localhost:8080/enroll/${courseIdToDelete}/${userId}`);

      if (response.status === 200) {
        fetchCourses();
        
        notification.success({
          message: 'Unenrolled',
          description: 'You have unenrolled successfully',
        });
      } else {
        throw new Error('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while unenrolling the course. Please try again later.',
      });
    } finally {
      setModalVisible(false);
    }
  };

  const handleReview = (courseId) => {
    setReviewModalVisible(true);
    setCourseIdToReview(courseId);
  };

  const handleProgress = (courseId) => {
    setProgressModalVisible(true);
    setCourseIdToProgress(courseId);
  };

  const filteredCourses = enrolledCourses.filter(course =>
    course.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container p-5">
      <div className="course-filters d-flex flex-row">
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Button variant="contained" color="primary" className="completed-courses-button mt-1">
          <Link to={'/Home/CompletedCourses'} style={{ textDecoration: "none", color:"white" }}>Completed Courses</Link>
        </Button>
      </div>
      <section className="course-cardsi">
        {filteredCourses.map((course) => (
          <div key={course.EnrollmentID} className="kard">
            <img src={course.Image} alt="Course" className="card-imgage" />
            <div className="card-bodi d-flex flex-row justify-content-between">
              <div className="spans d-flex flex-column">
                <span style={{ fontWeight: "bold" }}>{course.Title}</span>
                <Tag color="orange" onClick={() => handleReview(course.CourseID)} style={{cursor:"pointer"}}><FaStar />Give this Course A Rating!</Tag>
              </div>
              <div className="progresi d-flex flex-column">
                <Tag color="green" onClick={() => handleProgress(course.CourseID)} style={{cursor:"pointer"}}>View Progress</Tag>
                <span style={{ fontSize: "11px", color: "gray", marginRight: "20px" }}>
                  You have enrolled on this course on: <br />
                  {formatDate(course.EnrollmentDate)}
                </span>
              </div>
              <div>
                <Button onClick={() => handleDelete(course.CourseID)} variant="contained" style={{ backgroundColor:"#dc3545",marginRight: "20px" }}>
                  <AiOutlineCloseCircle style={{ color: "white" }} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <Modal
        title="Confirmation"
        visible={modalVisible}
        onOk={confirmDelete}
        onCancel={() => setModalVisible(false)}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to unenroll from this course?</p>
      </Modal>

      <ReviewModal
        visible={reviewModalVisible}
        onClose={() => setReviewModalVisible(false)}
        courseId={courseIdToReview}
      />

      <ProgressModal
        visible={progressModalVisible}
        onClose={() => setProgressModalVisible(false)}
        courseId={courseIdToProgress}
      />
    </main>
  );
}

export default YourCourses;
