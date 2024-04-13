import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid, Card, Avatar, Button } from '@mui/material';
import { FaGraduationCap, FaStar, FaUserTie, FaBriefcase, FaInfoCircle, FaPhone, FaEnvelope, FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import tutors from "./Tutorsdata"; 
import "./TutorProfile.css"; 

function TutorProfile() {
  const { id } = useParams();
  const tutor = tutors.find((tutor) => tutor.id === id);

  if (!tutor) {
    return <div>Tutor not found</div>; 
  }

  return (
    <Container className="tutor-profile">
    <Typography variant="h3" className="heading" style={{ textAlign: 'center', color: '#0047AB', fontWeight: 'bold', marginBottom: '30px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Tutor Profile</Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card className="profile-card">
            <div className="profile-header">
              <Avatar src={tutor.image2} alt={tutor.name} className="profile-picture" style={{ width: "170px", height: "170px" }} /> 
              <div className="profile-info">
                <Typography variant="h5" className="name">{tutor.name}</Typography>
                <div className="rating-courses">
                  <Typography variant="subtitle1" className="rating"><FaStar className="icon" /> Rating: {tutor.rating}</Typography>
                  <Typography variant="subtitle1" className="courses"><FaGraduationCap className="icon" /> Courses: {tutor.courses}</Typography> 
                </div>
              </div>
            </div>
            <div className="profile-details">
              <Typography><FaUserTie className="icon" /> Expertise: {tutor.expertise}</Typography>
              <Typography><FaBriefcase className="icon" /> Experience: {tutor.experience}</Typography>
              <Typography><FaInfoCircle className="icon" /> Bio: {tutor.bio}</Typography>
              <Typography><FaGraduationCap className="icon" /> Education: {tutor.education}</Typography>
              <Typography><FaMapMarkerAlt className="icon" /> Location: {tutor.location}</Typography>
              <Typography><FaPhone className="icon" /> Contact: {tutor.contact}</Typography>
              <Typography><FaEnvelope className="icon" /> Email: {tutor.email}</Typography>
              <Typography><FaCalendarAlt className="icon" /> Availability: {tutor.availability}</Typography>
            </div>
            <Button variant="contained" color="primary" fullWidth>Contact Tutor</Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TutorProfile;



