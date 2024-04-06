import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';

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
                window.location.href='/Home/dashboard';
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
    <div style={{  minHeight: '100vh', padding: '2rem 0' }}>
      <Container className='d-flex flex-row justify-content-center align-items-center'>
        <Row>
          <img className='img-fluid' style={{width:"auto", height:"400px"}} src="https://img.freepik.com/free-vector/happy-diverse-students-celebrating-graduation-from-school_74855-5853.jpg"></img>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="8">
            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h4" component="h2" align="center" gutterBottom style={{color:"#1e4589"}}> 
                Welcome Back!
              </Typography>
              <Form onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
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
                  fullWidth
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
                  fullWidth
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
