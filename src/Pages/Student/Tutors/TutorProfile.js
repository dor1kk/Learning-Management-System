import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Language as LanguageIcon,
  Phone as PhoneIcon,
  MailOutline as MailOutlineIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { message } from 'antd';
import "../../../Styles/StudentStyles/TutorProfile.css";

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

  const renderTags = (key, value) => (
    <Chip key={key} label={value} variant="outlined" style={{ margin: '4px' }} />
  );

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/send-email", {
        TutorID: tutorId,
        Subject: emailSubject,
        Message: emailContent
      });
      message.success('Email sent successfully.');
      handleCloseModal();
    } catch (error) {
      console.error('Error sending email:', error);
      message.error('Failed to send email.');
    }
  };

  return (
    <section className="container ">
      <Container className="py-5">
        <Grid container spacing={3}>
          <Grid item lg={4}>
            <Card className="mb-4">
              <CardMedia
                component="img"
                height="auto"
                image={tutor?.image_url}
                alt={tutor?.name}
              />
              <CardContent className="text-center">
                <Typography variant="body1" gutterBottom>{tutor?.expertise}</Typography>
                <Typography variant="body1" gutterBottom>{tutor?.location}</Typography>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>Rate</Button>
                <Button variant="outlined" className="ms-1" onClick={handleOpenModal}>Message</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={8}>
            <Card className="mb-4">
              <CardContent>
                <Typography variant="body1" gutterBottom>{tutor?.bio}</Typography>
                <Typography variant="subtitle1" gutterBottom>Expertise</Typography>
                <Typography variant="body1" gutterBottom>{tutor?.expertise}</Typography>
                <Typography variant="subtitle1" gutterBottom>Experience</Typography>
                <Typography variant="body1" gutterBottom>{tutor?.experience}</Typography>
                <Typography variant="subtitle1" gutterBottom>Location</Typography>
                <Typography variant="body1" gutterBottom>{tutor?.location}</Typography>
                <Typography variant="subtitle1" gutterBottom>Contact</Typography>
                <Typography variant="body1" gutterBottom>{tutor?.contact}</Typography>
                <Typography variant="subtitle1" gutterBottom>Availability</Typography>
                <Typography variant="body1" gutterBottom>{tutor?.availability}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

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
              startAdornment: (<MailOutlineIcon />),
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
          <Button onClick={handleCloseModal} color="primary">Cancel</Button>
          <Button onClick={handleSendEmail} color="primary">Send</Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default TutorProfile;
