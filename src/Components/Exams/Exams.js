import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import "./Exams.css";
import { Button } from "antd";


function Exams() {
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

  const handleClick = (examId) => {
    console.log("Navigating to exams page for exam with ID:", examId);
  };

  const filteredExams = exams.filter((exam) => {
    if (
      (filterOption === "all" || exam.Category === filterOption) &&
      exam.examName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  return (
    <main className="c-container p-5">
      <div className="exam-filters">
        <input
          type="text"
          placeholder="Search exams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>
        <Button
          type="primary"
          style={{marginLeft:"9px"}}
        >
          <Link to={'/Home/exam'} style={{textDecoration:"none"}}>
          Passed Exams
          </Link>
        </Button>
      </div>
      <section className="exam-course-cards">
        {filteredExams.map((exam) => (
          <div key={exam.examId} className="exam-card">
            <div className="exam-card-image">
              <img src="https://static.vecteezy.com/system/resources/previews/024/666/275/non_2x/exam-concept-tiny-girl-student-with-test-exam-result-education-studying-digital-elearnning-degree-graduate-concept-modern-flat-cartoon-style-illustration-on-white-background-vector.jpg" alt={exam.examName} />
            </div>

            <div className="exam-card-details">
              <h2 className="exam-course-title">{exam.examName}</h2>
              <div className="exam-links">
                <Link to={`/home/takeExam?examId=${exam.examId}`} className="test btn btn-primary p-1" style={{marginLeft:"10px", marginBottom:"10px"}}> <FaPencilAlt /> Take the Exam</Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Exams;
