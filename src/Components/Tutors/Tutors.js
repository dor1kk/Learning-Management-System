import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import tutorsData from "./Tutorsdata";
import { List, ListItem, ListItemText } from '@mui/material';

import {
  FaGraduationCap,
  FaStar,
  FaUserTie,
  FaBriefcase,
  FaInfoCircle,
} from "react-icons/fa";
import { Container, Grid, Card, Button, Typography, Avatar, Box } from '@mui/material';
import axios from "axios";
import "./Tutors.css";

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
  };

  return (
    <div className="tutor-container">
      <Container className="mt-4">
        <Grid container spacing={3} style={{ display: "flex", flexDirection: "column" }}>
          <Grid item xs={12} md={12} style={{ display: 'flex', flexDirection: 'row' }}>
              <Card  className="p-4 d-flex fle-row" sx={{ boxShadow: "0 3px 6px rgba(0,0,0,0.1)", borderRadius: "10px", marginTop: "16px", flex: 1, marginRight: "16px" }}>
                <div>
                  <Typography variant="h5" color="primary">Become a tutor</Typography>
                  <Typography color="textSecondary" mt={2}>Start your journey sharing your knowledge...</Typography>
                  <Button variant="contained" color="primary" onClick={() => navigate("/Home/BecomeTutor")}>
                    Get started
                  </Button>
                  <Typography variant="body1" mt={2}>Invite your friends</Typography>
                  <Button variant="contained" color="secondary" mt={1}>Get the link!</Button>
                </div>
                <div className="d-flex flex-row">
                  <img src="https://static.vecteezy.com/system/resources/previews/000/932/114/non_2x/male-doing-online-course-with-a-tutor-vector.jpg" style={{ width: "150px", height: "150px", marginTop: "0px" }} alt="tutor" />
                </div>
              </Card>


<Card className="p-3 d-flex flex-row" sx={{ boxShadow: "0 3px 6px rgba(0,0,0,0.1)",gap:"30px", borderRadius: "10px", marginTop: "16px", flex: 1, marginRight: "16px" }}>
  <div style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
    <img src="https://beacontutorspk.com/wp-content/uploads/2023/03/Vector-Smart-Object9.png" style={{ width: "150px", height: "250px"}} alt="tutor" />
  </div>
  <div style={{ flex: 1 }}>
    <Typography variant="h5" color="primary">Top Tutors</Typography>
    <Typography color="textSecondary" mt={2}>Here are our top tutors:</Typography>
    <List style={{ padding: 0 }}>
  {tutors.slice(0, 4).map((tutor, index) => (
    <ListItem key={tutor.id} disablePadding className="bg-light w-75" style={{ backgroundColor: "lightgrey", marginBottom: '8px' }}>
      <Avatar alt={tutor.name} src={tutor.image} style={{ marginRight: '16px' }} />
      <ListItemText primary={`${index + 1}. ${tutor.name}`} />
    </ListItem>
  ))}
</List>

 
  </div>
</Card>

        
        
          </Grid>

          <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',}}>
            {tutors.map(tutor => (
              <Grid item xs={12} md={6} key={tutor.id}>
                <Card className="mt-3" sx={{ display: 'flex', boxShadow: "0 3px 6px rgba(0,0,0,0.1)", borderRadius: "10px", width: '97%' }}>
                  <Avatar src={tutor.image2} sx={{ width: 120, height: 120, margin:3 }} />
                  <Box p={2} style={{ flex: 1 }}>
                    <Typography variant="h6" mb={1}>{tutor.name}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1"><FaGraduationCap /> Courses: {tutor.courses}</Typography>
                    </Box>
                    <Typography variant="body2" mt={2}><FaUserTie /> Expertise: {tutor.expertise}</Typography>
                    <Typography variant="body2" mt={1}><FaBriefcase /> Experience: {tutor.experience}</Typography>
                    <Typography variant="body2" mt={1}><FaInfoCircle /> Bio: {tutor.bio}</Typography>
                    <Button variant="contained" color="primary" fullWidth mt={2} onClick={() => navigate(`/Home/TutorProfile/${tutor.id}`)}>View profile!</Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Tutors;
