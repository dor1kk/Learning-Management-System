import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios'; 
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Signup = () => {
  axios.defaults.withCredentials=true;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/signup', formData);
      console.log(response.data); 
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div style={{ background: '#f0f0f0', minHeight: '100vh', padding: '2rem 0' }}>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="6">
            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h4" component="h2" align="center" gutterBottom>
                Sign Up for Our Learning Management System
              </Typography>
              <Form onSubmit={handleSubmit}>
                <TextField
                
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={formData.username}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <AccountCircleIcon color="primary" style={{ marginRight: '0.5rem' }} />
                    ),
                  }}
                />
              <TextField
  variant="outlined"
  margin="normal"
  required
  fullWidth
  id="email"
  label="Email Address"
  name="email"
  autoComplete="email"
  value={formData.email}
  onChange={handleChange}
  InputProps={{
    startAdornment: (
      <EmailIcon color="primary" style={{ marginRight: '0.5rem' }} />
    ),
  }}
/>

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <LockIcon color="primary" style={{ marginRight: '0.5rem' }} />
                    ),
                  }}
                />
                <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck" />
                  <label className="form-check-label" htmlFor="exampleCheck">I agree to the terms and conditions</label>
                </div>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Sign Up
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
