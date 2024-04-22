import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Tabs, Tab, Button, Typography } from "@mui/material";
import { FaPlayCircle, FaStar, FaInfo, FaBell } from "react-icons/fa";
import Details from "./Details";
import ReviewContainer from "./Review";
import Progress from "./Progress";
import courses from "./Coursedata";
import axios from 'axios'
import {notification} from 'antd'






function CourseDetail() {
  const handleEnrollNow = async () => {
    try {
      await axios.post("http://localhost:8080/enroll", { courseId: id });
      notification.success({
        message: 'Enrolled Successfully!',
        description: 'You have successfully enrolled in this course.',
      });
    } catch (error) {
      console.error("Error enrolling:", error);
      notification.error({
        message: 'Enrollment Error',
        description: 'You have already enrolled in this course.',
      });
    }
  };
  
  const { id } = useParams();
  const course = courses.find((course) => course.id === id);
  const [selectedVideo, setSelectedVideo] = useState(course ? course.videos[0] : null);
  const [activeTab, setActiveTab] = useState("courseInfo");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const totalLessons = 7;
  const targetProgress = Math.ceil(totalLessons * 0.25);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <Paper elevation={1} className="p-4" style={{width:"550px"}}>
            <div className="course-details" style={{ width: "100%" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="rating">&#9733;&#9733;&#9733;&#9733;&#9733;<span className="rating-info">(5/5, 102 reviews)</span></span>
                <h3>{course?.title}</h3>
              </div>
              <p className="category">Category: {course?.category}</p>
              <Tabs value={activeTab} onChange={(e, newValue) => handleTabClick(newValue)}>
                <Tab label={<><FaInfo /> Course Info</>} value="courseInfo" />
                <Tab label={<><FaStar /> Reviews</>} value="reviews" />
                <Tab label={<><FaBell /> Announcements</>} value="announcements" />
              </Tabs>
              <div className="tab-content mt-3">
                {activeTab === "reviews" && <ReviewContainer />}
                {activeTab === "courseInfo" && <Details course={course} />}
                {activeTab === "announcements" && <div>Announcements Component</div>}
              </div>
            </div>
          </Paper>
        </div>
        <div className="col-md-4">
          <Paper elevation={1} className="p-3" style={{marginLeft:"-60px"}}>
            <Progress currentProgress={targetProgress} totalLessons={totalLessons} />
            <div className="course-info-box mt-3">

              <Typography  variant="h6">What You Will Learn</Typography>
              <ul className="learn-list mt-4">
                <li className="list-group-item">Understand the fundamentals of HTML Structures!</li>
                <li className="list-group-item">Be able to do Styling with CSS</li>
                <li className="list-group-item">Write scripts and add functionality after learning JavaScript Basics</li>
              </ul>
              <Button variant="contained" color="primary" onClick={handleEnrollNow}>Enroll Now...</Button>
            </div>
          </Paper>
        </div>
      </div>
   
    </div>
  );
}

export default CourseDetail;
