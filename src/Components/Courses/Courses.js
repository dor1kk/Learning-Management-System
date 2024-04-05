import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom"; 
import "./Courses.css";
import CourseDetail from "./Coursedetail";
import courses from "./Coursedata";
import { FaArrowDown } from "react-icons/fa";
import { SiReact } from 'react-icons/si';
import { SiHtml5, SiCss3, SiJavascript } from 'react-icons/si';
import { FaNodeJs, FaDatabase } from 'react-icons/fa'; 
import { BiNetworkChart } from 'react-icons/bi';
import { FaCalculator } from 'react-icons/fa';

function Courses() {
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filteredCourses = courses.filter((course) => {
    if (category && course.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }
    return true;
  });


  
  const sortedCourses = filteredCourses.slice().sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    } else {
     
      return 0;
    }
  });

  return (
    <main className="container">
      <section className="controls d-flex justify-content-between align-items-center">
        <div className="categories">
          <ul>
            <li onClick={() => setCategory("")}>All</li>
            <li onClick={() => setCategory("Frontend")}><SiHtml5 /> Frontend</li>
            <li onClick={() => setCategory("Backend")}><FaNodeJs/> Backend</li>
            <li onClick={() => setCategory("Database")}><FaDatabase /> Database</li>
            <li onClick={() => setCategory("DSA")}><BiNetworkChart /> Data Structures</li>
            <li onClick={() => setCategory("Math")}><FaCalculator /> Mathematics</li>
            <div className="sort-by" style={{marginLeft:"70px"}}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-control"
            style={{padding:"10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}
          >
            <option value="default" >Sort by: </option>
            <option value="title">Sort by Title</option>
            <option value="rating">Sort by Rating</option>
          </select>

        </div>
          </ul>
        </div>
      
      </section>
      <section className="course-cards d-flex flex-row flex-wrap">
        {sortedCourses.map((kursi) => (
          <div key={kursi.id} className="carda mb-3 col-md-" style={{ minWidth: "240px", height: "330px", boxShadow: "2px 2px 10px lightgrey", position: "relative" }}>
            <div className="d-flex flex-row">
              <img src={kursi.image} className="card-img" style={{ width: "250px", opacity: "0.8", position: "relative", zIndex: "0" }} alt="Course" />
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="img-fluid" style={{ position: "absolute", zIndex: "10", top: "45%", left: "20%", transform: "translate(-50%, -50%)", borderRadius:"50%", border: "7px solid white", width: "70px", height: "70px" }} alt="Profile" />
            </div>
            <div className="p-2 " style={{marginTop:"38px"}}>
              <div className="card-body">
                <span style={{color:"orange"}}>&#9733;&#9733;&#9733;&#9733;&#9733;<span className="" style={{color:"gray", marginLeft:"8px",fontSize:"12px"}}>5/5 (102)</span> </span>
                <h5 className="card-title" style={{ color: "gray", fontWeight: "bolder" }}>{kursi.title}</h5>
                <div className="d-flex flex-row"></div>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                <Link to={`/CourseDetail/${kursi.id}`} className="btn btn-primary text-white">Enroll now...</Link>
              </div>
            </div>
          </div>
        ))}
      </section>
      <Routes>
        <Route path="/CourseDetail/*" element={<CourseDetail />} />
      </Routes>
    </main>
  );
}

export default Courses;
