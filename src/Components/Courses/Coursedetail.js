import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Paper, Tabs, Tab, Button, Typography } from "@mui/material";
import { FaPlayCircle, FaStar, FaInfo, FaBell } from "react-icons/fa";
import Details from "./Details";
import ReviewContainer from "../YourCourses/Review";
import courses from "./Coursedata";
import axios from 'axios'
import {notification} from 'antd'
import Progressi from "../YourCourses/Progress";
import { Height } from "@mui/icons-material";
import Reviews from "./Reviews";
import Announcements from "./Announcements";






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
  
  const location=useLocation();
  const id=location.pathname.split('/').pop();
  const course = courses.find((course) => course.id === id);
  const [activeTab, setActiveTab] = useState("courseInfo");
  const [ratingsNumber,setRatingsNumber]=useState(null);
  const [ratingsAverage,setRatingsAverage]=useState(null);


  const fetchRatings = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getratingsnumber/${id}`);
      setRatingsNumber(response.data.results[0]["COUNT(*)"]);
    } catch (error) {
      console.error("Error fetching ratings number:", error);
    }
  };
  
  const fetchRatingsAverage = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getratingsaverage/${id}`);
      setRatingsAverage(response.data.results[0]["AVG(Rating)"]);
    } catch (error) {
      console.error("Error fetching ratings average:", error);
    }
  };
  

  useEffect(()=>{
    fetchRatings();
    fetchRatingsAverage();
  })

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };



  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-12">
          <Paper elevation={0} className="p-4" style={{width:""}}>
            <div className="course-details" style={{ width: "100%" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
  <span className="rating">
    {Array.from({ length: 5 }, (_, index) => (
      <span key={index} style={{ color: index < Math.floor(ratingsAverage) ? 'gold' : 'grey' }}>&#9733;</span>
    ))}
    <span className="rating-info">({ratingsAverage}, {ratingsNumber} reviews)</span>
  </span>
  <h3>{course?.title}</h3>
</div>
                <h3>{course?.title}</h3>
              </div>
              <Tabs value={activeTab} onChange={(e, newValue) => handleTabClick(newValue)}>
                <Tab label={<><FaInfo /> Course Info</>} value="courseInfo" />
                <Tab label={<><FaStar /> Reviews</>} value="reviews" />
                <Tab label={<><FaBell /> Announcements</>} value="announcements" />
              </Tabs>
              <div className="tab-content mt-3">
                {activeTab === "reviews" && <Reviews />}
                {activeTab === "courseInfo" && <Details courseId={id} />}
                {activeTab === "announcements" && <Announcements courseId={id} />}
                <div className="course-info-box mt-3">
          
          <Button variant="contained" color="primary" onClick={handleEnrollNow}>Enroll Now...</Button>
        </div>
              </div>
            </div>
          </Paper>
        </div>
      </div>
   
    </div>
  );
}

export default CourseDetail;
