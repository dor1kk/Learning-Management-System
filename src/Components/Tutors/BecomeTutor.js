import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function BecomeTutor() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [expertise, setExpertise] = useState('');
    const [bio, setBio] = useState('');
    const [courses, setCourses] = useState('');
    const [experience, setExperience] = useState('');
    const [education, setEducation] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const [availability, setAvailability] = useState('');
    const [image_url, setImage] = useState('');
    const navigate=useNavigate()
  
    const Submit = async (e) => {
        e.preventDefault();
        try {
          const formData = { name, email, expertise, bio, courses, experience, education, location, contact, availability, image_url, };
          await axios.post("http://localhost:8080/becomeTutor", formData);
        
          alert("Insert successfully!");
          navigate('/')
        } catch (error) {
          console.error("Insert enrolling:", error);
          alert("Failed to Insert. Please try again.");
        }
      };
      

      

return (
    <div className='d-flex vh-300 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
      <form onSubmit={Submit}>
          <h2>Become a Tutor</h2>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' placeholder='Enter name' className='form-control'
            onChange={(e) =>setName(e.target.value) }/>
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='text' name='email' placeholder='Enter email' className='form-control'
            onChange={(e) =>setEmail(e.target.value) }  />
          </div>
          <div className='form-group'>
            <label htmlFor='expertise'>Expertise</label>
            <input type='text' name='expertise' placeholder='Enter expertise' className='form-control'
            onChange={(e) =>setExpertise(e.target.value) }  />
          </div>
          <div className='form-group'>
            <label htmlFor='bio'>Bio</label>
            <textarea name='bio' placeholder='Enter bio' className='form-control'
            onChange={(e) =>setBio(e.target.value) }  />
          </div>
          <div className='form-group'>
            <label htmlFor='courses'>Courses</label>
            <input type='text' name='courses' placeholder='Enter courses' className='form-control'
            onChange={(e) =>setCourses(e.target.value) }  />
          </div>
          <div className='form-group'>
            <label htmlFor='experience'>Experience</label>
            <input type='text' name='experience' placeholder='Enter experience' className='form-control' 
              onChange={(e) =>setExperience(e.target.value) } />
          </div>
          <div className='form-group'>
            <label htmlFor='education'>Education</label>
            <input type='text' name='education' placeholder='Enter education' className='form-control' 
              onChange={(e) =>setEducation(e.target.value) } />
          </div>
          <div className='form-group'>
            <label htmlFor='location'>Location</label>
            <input type='text' name='location' placeholder='Enter location' className='form-control'
              onChange={(e) =>setLocation(e.target.value) } />
          </div>
          <div className='form-group'>
            <label htmlFor='contact'>Contact</label>
            <input type='text' name='contact' placeholder='Enter contact' className='form-control'
              onChange={(e) =>setContact(e.target.value) }  />
          </div>
          <div className='form-group'>
            <label htmlFor='availability'>Availability</label>
            <input type='text' name='availability' placeholder='Enter availability' className='form-control'
              onChange={(e) =>setAvailability(e.target.value) } />
          </div>
          <div className='form-group'>
            <label htmlFor='imageUrl'>Image</label>
            <input type='text' name='image_url' placeholder='Enter image URL' className='form-control'
              onChange={(e) =>setImage(e.target.value) }  />
          </div>
          <button type="submit" variant="contained" color="primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default BecomeTutor;
