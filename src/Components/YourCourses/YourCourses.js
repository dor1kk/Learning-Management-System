import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input } from "@mui/material";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { notification, Tag, Modal } from "antd";
import ReviewModal from "./Review";
import ProgressModal from "./Progress";

function YourCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
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
      setSelectedCourse(response.data.enrolledCourses[0]); // Select the first course by default
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

  const handleDelete = (courseId) => {
    setModalVisible(true);
    setCourseIdToDelete(courseId);
  };

  const confirmDelete = async () => {
    try {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    });
  };

  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <h2 className="text-center text-3xl font-bold md:text-5xl lg:text-left">
          Your Courses
        </h2>
        <p className="mb-8 mt-4 text-center text-sm text-gray-500 sm:text-base md:mb-12 lg:mb-16 lg:text-left">
          Explore your enrolled courses and track your progress.
        </p>
        <div className="mx-auto grid gap-8 lg:grid-cols-2">
          {/* Selected Course Details */}
          {selectedCourse && (
  <div className="flex flex-col gap-4 rounded-md lg:pr-8">
    <img
      src={selectedCourse.Image}
      alt={selectedCourse.Title}
      className="inline-block h-72 w-full object-cover"
    />
    <div className="flex flex-col items-start mb-8 ">
      <div className="mb-16 rounded-md bg-gray-100 px-2 py-1.5">
        <p className="text-sm font-semibold text-blue-600">
          {selectedCourse.Category || "Course Category"}
        </p>
      </div>
      <p className="mb-4 mt-[-40px] text-xl font-bold md:text-2xl">
        {selectedCourse.Title}
      </p>
    
      <div className="mt-4">
        <Tag
          color="orange"
          onClick={() => handleReview(selectedCourse.CourseID)}
          className="cursor-pointer flex items-center space-x-1"
        >
          <FaStar />
          <span>Give this Course A Rating!</span>
        </Tag>
        <Tag
          color="green"
          onClick={() => handleProgress(selectedCourse.CourseID)}
          className="cursor-pointer ml-4"
        >
          View Progress
        </Tag>
        
        <Button
          className="mt-4 bg-red-500 text-white"
          style={{backgroundColor:"red"}}
          onClick={() => handleDelete(selectedCourse.CourseID)}
        >
          Unenroll
        </Button>
      </div>
    </div>
  </div>
)}

          
          <div className="md:flex lg:flex-col">
            {enrolledCourses.map((course) => (
              <a
                href="#"
                key={course.EnrollmentID}
                className="flex flex-col text-decoration-none lg:mb-3 lg:flex-row lg:border-b lg:border-gray-300"
                onClick={() => setSelectedCourse(course)}
              >
                <img
                  src={course.Image}
                  alt={course.Title}
                  className="inline-block h-60 w-full object-cover md:h-32 lg:h-32 lg:w-48"
                />
                <div className="flex mt-[-15px] flex-col items-start pt-4 lg:px-8">
                  <div className="mb-2 rounded-md bg-gray-100 px-2 ">
                    <p className="text-sm font-semibold  text-blue-600">
                      {course.Category || "Category Name"}
                    </p>
                  </div>
                  <p className="mb-2 text-sm font-bold sm:text-base">
                    {course.Title}
                  </p>
                  <div className="flex flex-col text-sm text-gray-500 sm:text-base lg:flex-row lg:items-center">
                    <p>Enrolled on: {formatDate(course.EnrollmentDate)}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
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
    </section>
  );
}

export default YourCourses;
