import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios'; 
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import ImageIcon from '@mui/icons-material/Image'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { ReactCountryFlag } from 'react-country-flag'; // Import ReactCountryFlag
import "./Signin.css";

const Signup = () => {
  axios.defaults.withCredentials=true;

  const customCountries = [
    { label: 'Kosova', value: 'KS' },
  ];

  const combinedCountries = [...customCountries,...countryList().getData()];

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name:"",
    image:'',
    country: '', 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, country: selectedOption.label });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/signup', formData);
      window.location.href='/Home/Signin'; 
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className='signup-container' style={{  minHeight: '100vh', padding: '2rem 0' }}>
      <Container className=' d-flex flex-row justify-content-center align-items-center' style={{width:"900px"}}>
        <Row className="justify-content-md-center">
          <Col md="12">
            <div style={{marginTop:"50px", marginLeft:"240px",  background: 'transparent', padding: '2rem', borderRadius: '8px' }}>
              <Typography variant="h4" component="h2" align="center" gutterBottom style={{color:"#1e4589"}}>
                Sign Up for free
              </Typography>
              <Form onSubmit={handleSubmit}>
                <div className='d-flex flex-row' style={{gap:"20px"}}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={formData.name}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <AccountCircleIcon color="primary" style={{ marginRight: '0.5rem' }} />
                      ),
                    }}
                  />

<Select
  className="country-select w-100 mt-3 p-2"
  options={combinedCountries} 
  value={formData.country}
  onChange={handleCountryChange}
  placeholder="Select Country"
  styles={{
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent', 
      zIndex:"1000"
    }),
  }}
/>
               

               
                </div>
                
                <div className='d-flex flex-row' style={{gap:"20px"}}>
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
                </div>
                <div className='d-flex flex-row'>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="image"
                  label="Image"
                  type="url"
                  id="image"
                  value={formData.image}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <ImageIcon color="primary" style={{ marginRight: '0.5rem' }} />
                    ),
                  }}
                />



</div>

                <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck" />
                  <label className="form-check-label" htmlFor="exampleCheck">I agree to the terms and conditions</label>
                </div>
                <Button type="submit" variant="contained" style={{backgroundColor:"#1e4589", color:"white"}} fullWidth>
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
