import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaChalkboard } from "react-icons/fa";
import { Card, Input, Select } from "antd";
import "./CourseLecture.css";

const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;

function CourseLecture() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");

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
    console.log("Navigating to lectures page with courseId:", courseId);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const filteredCourses = enrolledCourses.filter((course) => {
    return course.Title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredAndSortedCourses = filteredCourses.filter((course) => {
    return filterValue === "" || course.Category === filterValue;
  });

  return (
    <main className="c-container p-5">
      <div style={{ marginBottom: "20px" }}>
        <Search
          placeholder="Search courses..."
          onSearch={handleSearch}
          style={{ width: 200, marginRight: "10px" }}
        />
        <Select
          defaultValue=""
          style={{ width: 200 }}
          onChange={handleFilterChange}
        >
          <Option value="">All Categories</Option>
          {/* Assuming you have a list of categories */}
          <Option value="category1">Category 1</Option>
          <Option value="category2">Category 2</Option>
          {/* Add more options as needed */}
        </Select>
      </div>
      <section className="cslec-course-cards" style={{ marginLeft: "20px", paddingTop: "20px" }}>
        {filteredAndSortedCourses.map((course) => (
          <Card
            key={course.EnrollmentID}
            hoverable
            cover={<img alt={course.Title} src={course.Image} />}
            style={{ width: 240 }}
            onClick={() => handleClick(course.CourseID)}
          >
            <Meta
              title={<span style={{ fontWeight: "bold" }} className="text-primary">{course.Title}</span>}
              style={{ marginTop: "-10px" }}
              description={
                <Link to={`/home/ligjeratat/${course.CourseID}`} style={{ textDecoration: "none" }}>
                  <FaChalkboard /> Lectures...
                </Link>
              }
            />
          </Card>
        ))}
      </section>
    </main>
  );
}

export default CourseLecture;
