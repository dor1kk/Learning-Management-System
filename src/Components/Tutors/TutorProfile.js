import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  FaEnvelope,
  FaPen,
  FaGraduationCap,
  FaStar,
  FaUserTie,
  FaBriefcase,
  FaInfoCircle,
  FaPhone,
  FaCalendarAlt,
  FaMapMarkerAlt
} from "react-icons/fa";
import axios from 'axios';
import "./TutorProfile.css";

function TutorProfile() {
  const location = useLocation();
  const tutorId = location.pathname.split('/').pop();
  const [tutor, setTutor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [emailContent, setEmailContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tutors/${tutorId}`);
        setTutor(response.data);
      } catch (error) {
        console.error('Error fetching tutor:', error);
      }
    };

    fetchTutor();
  }, [tutorId]);

  const renderTags = (key, value, icon, color) => (
    <Chip
      key={key}
      icon={icon}
      label={value}
      variant="outlined"
      style={{ margin: '4px', color: color, borderColor: color }}
    />
  );

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    try{
      axios.post("http://localhost:8080/send-email",{
        TutorID:tutorId,
        Subject:emailSubject,
        Message:emailContent
      });
    }catch(error){
      console.log(error);
    }
    
  };

  return (
    <Container className="c-container p-5">
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card className="profile-card">
            {tutor && (
              <div className="profile-header">
                <Avatar src={tutor.image_url} alt={tutor.name} className="profile-picture" style={{ width: "170px", height: "170px" }} /> 
                <div className="profile-info">
                  <Typography variant="h5" className="name">{tutor.name}</Typography>
                  <div className="rating-courses">
                    {renderTags('rating', `Rating: ${tutor.rating}`, <FaStar className="icon" />, '#FFD700')} {/* Gold color */}
                    {renderTags('courses', `Courses: ${tutor.courses}`, <FaGraduationCap className="icon" />, '#4CAF50')} {/* Green color */}
                  </div>
                </div>
              </div>
            )}
            {tutor && (
              <div className="profile-details">
                {Object.entries(tutor).map(([key, value]) => {
                  if (key === 'name' || key === 'courses') {
                    return null; // Skip rendering name and courses as tags
                  }
                  const iconColor = '#2196F3'; // Default color for other icons
                  let icon;
                  switch (key) {
                    case 'expertise':
                      icon = <FaUserTie className="icon" style={{ color: '#FF5722' }} />; // Orange color
                      break;
                    case 'experience':
                      icon = <FaBriefcase className="icon" style={{ color: '#9C27B0' }} />; // Purple color
                      break;
                    case 'bio':
                      icon = <FaInfoCircle className="icon" style={{ color: '#E91E63' }} />; // Pink color
                      break;
                    case 'location':
                      icon = <FaMapMarkerAlt className="icon" style={{ color: '#607D8B' }} />; // Blue-grey color
                      break;
                    case 'contact':
                      icon = <FaPhone className="icon" style={{ color: '#FF9800' }} />; // Deep orange color
                      break;
                    case 'email':
                      icon = <FaEnvelope className="icon" style={{ color: '#795548' }} />; // Brown color
                      break;
                    case 'availability':
                      icon = <FaCalendarAlt className="icon" style={{ color: '#4CAF50' }} />; // Green color
                      break;
                    default:
                      icon = null;
                      break;
                  }
                  return renderTags(key, value, icon, iconColor);
                })}
              </div>
            )}
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
              Send Email
            </Button>
            <Dialog open={openModal} onClose={handleCloseModal}>
              <DialogTitle>Send Email</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Subject"
                  fullWidth
                  variant="outlined"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <FaPen className="icon" style={{ color: '#607D8B' }} />
                    ),
                  }}
                />
                <TextField
                  margin="dense"
                  label="Email Content"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSendEmail} color="primary">
                  Send
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TutorProfile;
