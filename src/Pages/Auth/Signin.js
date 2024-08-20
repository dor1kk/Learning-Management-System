import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from 'axios';
import image from '../../Assets/image.png';
import GitHubLogin from 'react-github-login';

import { FaFacebook, FaFacebookSquare, FaGithub } from 'react-icons/fa';


const FacebookLoginButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: '#4267B2',
      color: 'white',
      padding: '0px 20px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <FaFacebook style={{marginRight:"10px"}} /> 
    Continue with Facebook
  </button>
);



const Signin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [err, setErr] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/signin', formData)
      .then(res => {
        if (res.data.Login) {
          window.location.href = '/Home/';
        } else {
          setErr('Invalid username or password');
        }
      })
      .catch(err => {
        console.error(err);
        setErr('Error signing in');
      });
  };

  const handleGithubLoginSuccess = async (response) => {
    try {
      const res = await axios.post('http://localhost:8080/github-signin', {
        token: response.code
      });
  
      if (res.data.valid) {
        window.location.href = res.data.redirectUrl;
      } else {
        setErr('Error with GitHub Sign-In');
      }
    } catch (err) {
      console.error(err);
      setErr('Error with GitHub Sign-In');
    }
  };
  

  const handleGithubLoginFailure = (response) => {
    console.error(response);
    setErr('GitHub Sign-In failed');
  };


  const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await axios.post('http://localhost:8080/google-signin', {
        token: response.credential
      });

      if (res.data.Login) {
        window.location.href = '/Home/YourCourses';
      } else {
        setErr('Error with Google Sign-In');
      }
    } catch (err) {
      console.error(err);
      setErr('Error with Google Sign-In');
    }
  };

  const handleGoogleLoginFailure = (response) => {
    console.error(response);
    setErr('Google Sign-In failed');
  };

  return (
    <GoogleOAuthProvider clientId="768530580864-acl1elg83h1l2jnbh5atn3rpgbl3ll18.apps.googleusercontent.com">
      <Container fluid className="vh-100">
        <Row className="h-100">
          <Col md={6} className="d-flex align-items-center justify-content-center bg-white">
            <div className="w-75">
              <div className="text-center mb-4">
                <h2 className="mb-3">Log in to your Account</h2>
                <p>Welcome back! Select method to log in:</p>
              </div>
              <div className="mb-3 d-flex flex-row" style={{gap: "18px"}}>
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onFailure={handleGoogleLoginFailure}
                />
                 
                 <GitHubLogin
      clientId="Ov23liWUo8mILj00H5ON"
      onSuccess={handleGithubLoginSuccess}
      onFailure={handleGithubLoginFailure}
      redirectUri=""
      className="bg-white border-0" 
    >
     <FaGithub />  Sign in with Github  
      
    </GitHubLogin>

              </div>
              <p className="text-center mb-3">or continue with email</p>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formRememberMe" className="mb-3">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                {err && <p className="text-danger">{err}</p>}
                <Button variant="primary" type="submit" className="w-100">
                  Log in
                </Button>
              </Form>
              <div className="text-center mt-4">
                <p>Don't have an account? <a href="/signup">Create an account</a></p>
              </div>
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
    </GoogleOAuthProvider>
  );
};

export default Signin;
