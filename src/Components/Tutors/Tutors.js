import React, { useState } from "react";
import "./Tutors.css";
import { useNavigate } from "react-router-dom";
import tutorsData from "./Tutorsdata";

function Tutors() {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState(tutorsData);

  return (
    <>
      <h1>Tutors</h1>
      <div className="box-container">
        <div className="box">
          <h3>Become a tutor</h3>
          <p>HEY ................ </p>
          <button className="inline-btn" onClick={() => navigate("/TutorProfile ")}>
            Get started
          </button>
        </div>

        {tutors.map(tutor => (
          <div className="box" key={tutor.id}>
            <div className="g">
              <img src={tutor.image1} alt="" />
            </div>
            <div className="p">
              <img src={tutor.image2} alt="" />
            </div>
            <span style={{ color: "orange" }}>&#9733;&#9733;&#9733;&#9733;&#9733; </span>
            <h5>{tutor.name}</h5>
            <p>Courses <span>{tutor.courses}</span></p>
            <p>Rating <span>{tutor.rating}</span></p>
            <button className="inline-btn" onClick={() => navigate("/TutorProfile ")}>
              View profile
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Tutors;
