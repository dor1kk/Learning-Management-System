import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaStar, FaUserTie, FaBriefcase, FaInfoCircle } from "react-icons/fa";
import { Container, Grid, Card, Button, Typography, Avatar, Box } from '@mui/material';
import axios from "axios";

function Tutors() {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tutors");
      setTutors(response.data);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  }

  return (
    <Container className="mt-4">
      <Grid container spacing={3}>
        {tutors.map(tutor => (
          <Grid item xs={12} md={6} key={tutor.TutorID}>
            <Card className="mt-3" sx={{ display: 'flex', boxShadow: "0 3px 6px rgba(0,0,0,0.1)", borderRadius: "10px" }}>
              <Avatar src={tutor.image_url} sx={{ width: 120, height: 120 }} />
              <Box p={2} style={{ flex: 1 }}>
                <Typography variant="h6" mb={1}>{tutor.name}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1"><FaGraduationCap /> Courses: {tutor.courses}</Typography>
                </Box>
                <Typography variant="body2" mt={2}><FaUserTie /> Expertise: {tutor.expertise}</Typography>
                <Typography variant="body2" mt={1}><FaBriefcase /> Experience: {tutor.experience}</Typography>
                <Typography variant="body2" mt={1}><FaInfoCircle /> Bio: {tutor.bio}</Typography>
                <Button variant="contained" color="primary" fullWidth mt={2} onClick={() => navigate(`/home/tutorprofile/${tutor.TutorID}`)}>View profile!</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Tutors;
