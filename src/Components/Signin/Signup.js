import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import image from './image.png';
import './Signin.css';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import FacebookLoginButton from './Signin'
import { message, notification } from 'antd';

const Signup = () => {
  axios.defaults.withCredentials = true;

  const customCountries = [
    { label: 'Kosova', value: 'KS' },
  ];

  const combinedCountries = [...customCountries, ...countryList().getData()];

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    image: '',
    country: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, country: selectedOption });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const countryValue = formData.country ? formData.country.value : '';
      const updatedFormData = { ...formData, country: countryValue };
      if (!formData.email.endsWith('@lms.com')) {
        notification.error({
          message: 'Error',
          description: 'Please use an email address from the LMS domain (e.g., studenti1@lms.com)',
        });

        return;
      }
      const response = await axios.post('http://localhost:8080/signup', updatedFormData);
      window.location.href = '/Home/Signin';
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col md={6} className="d-flex align-items-center justify-content-center bg-white">
          <div className="w-75">
            <div className="text-center mb-4">
              <h2 className="mb-3 text-primary">Sign Up for free</h2>

              <p>Welcome back! Select method to sign up:</p>
            </div>

            <div className="mb-3 d-flex flex-row" style={{gap: "18px"}}>
            <GoogleOAuthProvider>

            <GoogleLogin
              
                />
                    </GoogleOAuthProvider>

                 
            </div>

            <p className="text-center mb-3">or continue with :</p>


            <Form onSubmit={handleSubmit}>
              <div className="d-flex flex-row mb-3" style={{ gap: "20px" }}>
                <Form.Group controlId="formName" className="w-50">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formCountry" className="w-50">
                  <Select
                    className="country-select"
                    options={combinedCountries}
                    value={formData.country}
                    onChange={handleCountryChange}
                    placeholder="Select Country"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: 'transparent',
                      }),
                    }}
                  />
                </Form.Group>
              </div>
              <div className="d-flex flex-row mb-3" style={{ gap: "20px" }}>
                <Form.Group controlId="formUsername" className="w-50">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="w-50">
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formImage" className="mb-3">
                <Form.Control
                  type="url"
                  placeholder="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formTerms" className="mb-3">
                <Form.Check type="checkbox" label="I agree to the terms and conditions" required />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100 bg-primary" style={{ color: "white" }}>
                Sign Up
              </Button>
            </Form>
          </div>
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-center" style={{ backgroundColor: "#065ad8" }}>
          <div className="w-75 text-center">
            <img src={image} alt="Connect with every application" className="img-fluid" />
            <p className="text-white mt-4">Connect with every application.</p>
            <p className="text-white">Everything you need in an easily customizable dashboard.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
