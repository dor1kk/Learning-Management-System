import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Select, Chip, Card, CardContent, Typography, Button, Grid, FormControl, MenuItem, InputLabel, Box, List, ListItem, ListItemText } from "@mui/material";
import { FaHtml5, FaNodeJs, FaDatabase, FaCalculator } from 'react-icons/fa';
import { BiNetworkChart } from 'react-icons/bi';
import CourseDetail from "./Coursedetail";

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
      return b.AverageRating - a.AverageRating;
    } else {
      return 0;
    }
  });

  return (
    <main className="container p-5">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <List component="ul" sx={{ display: 'flex', padding: 0, width: "100%" }}>
            <ListItem button onClick={() => setCategory("")} style={{ color: "#0047AB", marginRight: '10px' }}>All</ListItem>
            <ListItem button onClick={() => setCategory("Frontend")} style={{ color: "#0047AB", marginRight: '10px' }}><FaHtml5 /> Frontend</ListItem>
            <ListItem button onClick={() => setCategory("Backend")} style={{ color: "#0047AB", marginRight: '10px' }}><FaNodeJs /> Backend</ListItem>
            <ListItem button onClick={() => setCategory("Database")} style={{ color: "#0047AB", marginRight: '10px' }}><FaDatabase /> Database</ListItem>
            <ListItem button onClick={() => setCategory("Math")} style={{ color: "#0047AB" }}><FaCalculator /> Mathematics</ListItem>
          </List>
        </Box>
        <Box>
          <FormControl variant="outlined" style={{ minWidth: 150 }}>
            <InputLabel id="sort-by-label">Sort by:</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort by"
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Grid container spacing={3} className="mt-4">
        {sortedCourses.map((course) => (
          <Grid item xs={12} sm={6} md={3} key={course.CourseID}>
            <Card className="course-card">
              <img src={course.Image} alt="Course" className="card-img" />
              <CardContent>
                <Typography variant="subtitle1" style={{ color: "gray" }}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} style={{ color: index < Math.floor(course.AverageRating) ? 'gold' : 'grey' }}>&#9733;</span>
                  ))} <span className="" style={{ color: "gray", marginLeft: "8px", fontSize: "12px" }}>{course.AverageRating}/5 ({course.NumberOfReviews} reviews)</span>
                </Typography>
                <Typography variant="h6" style={{ color: "gray", fontWeight: "bolder" }}>{course.Title}</Typography>
                <div style={{ marginTop: "8px" }}>
                  <Typography style={{ color: "gray", fontWeight: "bolder", fontSize: "14px" }}>{course.TutorName}</Typography>
                </div>
                <Button component={Link} to={`/Home/CourseDetail/${course.CourseID}`} variant="contained" color="primary" style={{ marginTop: "16px" }}>See more...</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export default Courses;
