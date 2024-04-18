import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import "./Signin.css";

const Signin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
      });

      const [err, setErr] = useState('');

    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      axios.defaults.withCredentials=true;
      const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/signin', formData)
        .then(res => {
            console.log(res.data); 
            console.log('Login state:', res.data.Login); 
            
            if (res.data.Login) {
                window.location.href='/Home/YourCourses';
            } else {
                setErr('Invalid username or password');
            }
        })
        .catch(err => {
            console.error(err);
            setErr('Error signing in');
        });
    };
    
    
      
  

  return (
    <div className='signin-container' style={{  minHeight: '100vh', padding: '2rem 0' }}>
      <Container className='d-flex flex-row justify-content-center align-items-center'>
        <Row className="justify-content-md-center">
          <Col md="10">
            <div style={{ marginRight:"450px",marginTop:"80px",background: '#ffffff',width:"500px",  padding: '2rem', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h4" component="h2" align="center" gutterBottom style={{color:"#1e4589"}}> 
                Welcome Back!
              </Typography>
              <Form className='d-flex flex-column w-100'  onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  style={{width:"430px"}}
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={formData.username}
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
                  style={{width:"430px"}}

                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <LockIcon color="primary" style={{ marginRight: '0.5rem' }} />
                    ),
                  }}
                />
                {err && <Typography variant="body2" color="error">{err}</Typography>}
                <Button
                  type="submit"
                  
                  variant="contained"
                  style={{ backgroundColor:"#1e4589", color:"white", marginTop: '1.5rem', padding: '0.5rem 3rem' }}
                >
                  Sign In
                </Button>
                <Row style={{ marginTop: '1rem' }}>
                  <Col>
                    <Link to="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Col>
                  <Col className="text-right">
                    <Link to="/signup" variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signin;
