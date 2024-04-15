import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom"; 
import "./Courses.css";
import CourseDetail from "./Coursedetail";
import { FaArrowDown } from "react-icons/fa";
import { FaReact, FaHtml5, FaCss3 } from 'react-icons/fa';
import { FaNodeJs, FaDatabase } from 'react-icons/fa'; 
import { BiNetworkChart } from 'react-icons/bi';
import { FaCalculator } from 'react-icons/fa';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8080/coursestutorinfo');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };



  if (courses.length === 0) {
    return <div>Loading...</div>;
  }

  const filteredCourses = courses.filter((course) => {
    if (category && course.Category && course.Category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }
    return true;
  });

  const sortedCourses = filteredCourses.slice().sort((a, b) => {
    if (sortBy === "title") {
      return a.Title.localeCompare(b.Title);
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    } else {
      return 0;
    }
  });

  return (
    <main className="container-kursi">
      <section className="controls d-flex justify-content-between align-items-center">
        <div className="categories">
          <ul>
            <li className="bg-white text-primary" onClick={() => setCategory("")}>All</li>
            <li className="bg-white text-primary"  onClick={() => setCategory("Frontend")}><FaHtml5 /> Frontend</li>
            <li className="bg-white text-primary"  onClick={() => setCategory("Backend")}><FaNodeJs/> Backend</li>
            <li className="bg-white text-primary"   onClick={() => setCategory("Database")}><FaDatabase /> Database</li>
            <li className="bg-white text-primary"   onClick={() => setCategory("DSA")}><BiNetworkChart /> Data Structures</li>
            <li className="bg-white text-primary"   onClick={() => setCategory("Math")}><FaCalculator /> Mathematics</li>
          </ul>
        </div>
        <div className="sort-by">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-control"
          >
            <option value="default">Sort by: </option>
            <option value="title">Sort by Title</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
      </section>
      <section className="course-cards  d-flex flex-row flex-wrap">
        {sortedCourses.map((course) => (
          <div key={course.CourseID} className="carda bg-white mb-3 col-md-" style={{ minWidth: "240px", height: "330px", boxShadow: "2px 2px 10px lightgrey", position: "relative" }}>
            <div className="d-flex flex-row">
              <img src={course.Image} className="card-img" style={{ width: "250px",height:"140px", position: "relative", zIndex: "0" }} alt="Course" />
              <img src={course.image_url} className="img-fluid" style={{ position: "absolute", zIndex: "10", top: "45%", left: "20%", transform: "translate(-50%, -50%)", borderRadius:"50%", border: "7px solid white", width: "70px", height: "70px" }} alt="Profile" />
            </div>
            <div className="p-2 " style={{marginTop:"38px"}}>
              <div className="card-body">
                <span style={{color:"orange"}}>&#9733;&#9733;&#9733;&#9733;&#9733;<span className="" style={{color:"gray", marginLeft:"8px",fontSize:"12px"}}>5/5 (102)</span> </span>
                <h5 className="card-title" style={{ color: "gray", fontWeight: "bolder" }}>{course.Title}</h5>
                <div className="d-flex flex-row"></div>
                <p className="card-text"><small className="text-muted">Tutor : {course.name}</small></p>
                <Link to={`/Home/CourseDetail/${course.CourseID}`} className="btn btn-primary text-white">See more...</Link>
              </div>
            </div>
          </div>
        ))}
      </section>
     
    </main>
  );
}

export default Courses;
