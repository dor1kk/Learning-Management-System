import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Select, Card, Typography, Button, Row, Col, List } from "antd";
import { FaHtml5, FaNodeJs, FaDatabase, FaCalculator } from 'react-icons/fa';
import axios from "axios";

const { Option } = Select;

function Courses() {
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/coursestutorinfo');
      setCourses(response.data);
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
      return b.AverageRating - a.AverageRating;
    } else {
      return 0;
    }
  });

  return (
    <main className="container p-5">
      <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
        <List
          grid={{ gutter: 16, column: 5 }}
          dataSource={[
            { category: '', label: 'All', icon: null },
            { category: 'Frontend', label: 'Frontend', icon: <FaHtml5 /> },
            { category: 'Backend', label: 'Backend', icon: <FaNodeJs /> },
            { category: 'Database', label: 'Database', icon: <FaDatabase /> },
            { category: 'Math', label: 'Mathematics', icon: <FaCalculator /> },
          ]}
          renderItem={item => (
            <List.Item onClick={() => setCategory(item.category)} style={{ cursor: 'pointer', color: "#0047AB" }}>
              {item.icon} {item.label}
            </List.Item>
          )}
        />
        <Select value={sortBy} onChange={setSortBy} style={{ width: 200 }}>
          <Option value="default">Default</Option>
          <Option value="title">Title</Option>
          <Option value="rating">Rating</Option>
        </Select>
      </Row>
      <Row gutter={[16, 16]}>
        {sortedCourses.map((course) => (
          <Col xs={24} sm={12} md={8} lg={6} key={course.CourseID}>
            <Card
              hoverable
              cover={<img alt="Course" src={course.Image} style={{ height: '140px', objectFit: 'cover' }} />}
              style={{ height: '100%' }}
            >
              <Card.Meta
                title={course.Title}
                description={
                  <>
                    <Typography.Paragraph style={{ color: "gray" }}>
                      {Array.from({ length: 5 }, (_, index) => (
                        <span key={index} style={{ color: index < Math.floor(course.AverageRating) ? 'gold' : 'grey' }}>
                          &#9733;
                        </span>
                      ))}
                      <span style={{ marginLeft: '8px', fontSize: '12px' }}>
                        {course.AverageRating}/5 ({course.NumberOfReviews} reviews)
                      </span>
                    </Typography.Paragraph>
                    <Typography.Paragraph style={{ color: "gray", fontWeight: "bold" }}>{course.TutorName}</Typography.Paragraph>
                    <Button type="primary" block>
                      <Link to={`/Home/CourseDetail/${course.CourseID}`} style={{ color: "white" }}>See more...</Link>
                    </Button>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </main>
  );
}

export default Courses;
