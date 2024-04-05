import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import tutorsData from "./Tutorsdata"; 
import { FaGraduationCap, FaStar, FaUserTie, FaBriefcase, FaInfoCircle } from "react-icons/fa";
import { Container, Grid, Card, Button, Typography, Avatar, Box } from '@mui/material';

function Tutors() {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    setTutors(tutorsData); 
  }, []);

  return (
    <Container className="mt-4">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className="p-4" sx={{ boxShadow: "0 3px 6px rgba(0,0,0,0.1)", borderRadius: "10px" }}>
            <Typography variant="h5" color="primary">Become a tutor</Typography>
            <Typography color="textSecondary" mt={2}>Start your journey sharing your knowledge...</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate("/TutorProfile")}>
              Get started
            </Button>
            <Typography variant="body1" mt={2}>Invite your friends</Typography>
            <Button variant="contained" color="secondary" mt={1}>Get the link!</Button>
          </Card>
        </Grid>

        {tutors.map(tutor => (
          <Grid item xs={12} md={6} key={tutor.id}>
            <Card className="mt-3" sx={{ display: 'flex', boxShadow: "0 3px 6px rgba(0,0,0,0.1)", borderRadius: "10px" }}>
              <Avatar src={tutor.image2} sx={{ width: 120, height: 120 }} />
              <Box p={2} style={{ flex: 1 }}>
                <Typography variant="h6" mb={1}>{tutor.name}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1"><FaGraduationCap /> Courses: {tutor.courses}</Typography>
                  <Typography variant="subtitle1" className="rating"><FaStar className="icon" /> Rating: {tutor.rating}</Typography>
              </Box>
                <Typography variant="body2" mt={2}><FaUserTie /> Expertise: {tutor.expertise}</Typography>
                <Typography variant="body2" mt={1}><FaBriefcase /> Experience: {tutor.experience}</Typography>
                <Typography variant="body2" mt={1}><FaInfoCircle /> Bio: {tutor.bio}</Typography>
                <Button variant="contained" color="primary" fullWidth mt={2} onClick={() => navigate(`/TutorProfile/${tutor.id}`)}>View profile!</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Tutors;






