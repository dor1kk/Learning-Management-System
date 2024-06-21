import React, { useState, useEffect } from "react";
import { Button, Input, Select } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaClock, FaPencilAlt } from "react-icons/fa";
import "./Exams.css";

const { Option } = Select;

function Exams({role}) {
  if (role !== "Student") {
    window.location.href = "/unauthorized";
  }
  
  const [exams, setExams] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("all");

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get("http://localhost:8080/available-exams");
      setExams(response.data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const formatTimeRemaining = (endTime) => {
    const currentTime = new Date();
    const endDateTime = new Date(endTime);
    const difference = endDateTime - currentTime;

    if (difference <= 0) return null;

    const daysRemaining = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    if (daysRemaining > 0) {
      return `${daysRemaining} day${daysRemaining > 1 ? 's' : ''} left`;
    } else if (hoursRemaining > 0) {
      return `${hoursRemaining} hour${hoursRemaining > 1 ? 's' : ''} and ${minutesRemaining} minute${minutesRemaining > 1 ? 's' : ''} left`;
    } else {
      return `${minutesRemaining} minute${minutesRemaining > 1 ? 's' : ''} left`;
    }
  };

  const filteredExams = exams.filter((exam) => {
    const currentTime = new Date();
    const endTime = new Date(exam.endTime);

    return (
      endTime > currentTime &&
      (filterOption === "all" || exam.Category === filterOption) &&
      exam.examName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <main className="container p-5">
      <Input
        type="text"
        placeholder="Search exams..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <Select
        style={{ marginTop: "10px" }}
        value={filterOption}
        onChange={(value) => setFilterOption(value)}
        className="filter-select"
      >
        <Option value="all">All Categories</Option>
        <Option value="Frontend">Frontend</Option>
        <Option value="Backend">Backend</Option>
      </Select>
      <Button type="primary" style={{ marginLeft: "9px", marginTop: "10px" }}>
        <Link to={'/Home/exam'} style={{ textDecoration: "none" }}>
          Passed Exams
        </Link>
      </Button>
      <section className="exam-course-cards">
        {filteredExams.map((exam) => {
          const timeRemaining = formatTimeRemaining(exam.endTime);
          return (
            <div key={exam.examId} className="exam-card">
              <div className="exam-card-image">
                <img src="https://static.vecteezy.com/system/resources/previews/024/666/275/non_2x/exam-concept-tiny-girl-student-with-test-exam-result-education-studying-digital-elearnning-degree-graduate-concept-modern-flat-cartoon-style-illustration-on-white-background-vector.jpg" alt={exam.examName} />
              </div>

              <div className="exam-card-details">
                <h2 className="exam-course-title">{exam.examName}</h2>
                {timeRemaining && (
                  <p>
                    <FaClock /> {timeRemaining}
                  </p>
                )}
                <div className="exam-links">
                  <Button type="primary" className="test d-flex justify-content-center align-items-center" style={{ marginLeft: "10px", marginBottom: "10px" }}>
                    <Link to={`/home/takeExam?examId=${exam.examId}`} style={{ textDecoration: "none" }}> <FaPencilAlt /> Take the Exam</Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Exams;
