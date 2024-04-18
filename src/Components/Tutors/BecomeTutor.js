import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineMail, AiOutlineStar, AiOutlineProfile, AiOutlineBook, AiOutlineFieldTime, AiOutlineBank, AiOutlineEnvironment, AiOutlinePhone, AiOutlineCalendar, AiOutlinePicture } from 'react-icons/ai';
import "./Tutors.css";


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
    const navigate = useNavigate();
  
    const Submit = async (e) => {
        e.preventDefault();
        try {
            const formData = { name, email, expertise, bio, courses, experience, education, location, contact, availability, image_url };
            await axios.post("http://localhost:8080/becomeTutor", formData);
            alert("Insert successfully!");
            navigate('/');
        } catch (error) {
            console.error("Insert enrolling:", error);
            alert("Failed to Insert. Please try again.");
        }
    };
      
    return (
        
            <div className='become-container d-flex vh-300 justify-content-center align-items-center' style={{ backgroundColor: '#ADD8E6' }}>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Submit}>
                <h2 style={{ color: '#007BFF', textAlign: 'center', marginBottom: '2rem', textTransform: 'uppercase' }}>Become a Tutor</h2>
                    <div className="d-flex flex-row" style={{gap:"10px"}}>
                        <div className='form-group'>
                            <div className="input-group">
                                <span className="input-group-text  bg-primary text-white"><AiOutlineUser /></span>
                                <input type='text' name='name' placeholder='Name' className='form-control' onChange={(e) =>setName(e.target.value)}/>
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className="input-group">
                                <span className="input-group-text  bg-primary text-white"><AiOutlineMail /></span>
                                <input type='text' name='email' placeholder='Email' className='form-control' onChange={(e) =>setEmail(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row" style={{gap:"10px"}}>
                        <div className='form-group'>
                            <div className="input-group">
                                <span className="input-group-text  bg-primary text-white"><AiOutlineStar /></span>
                                <input type='text' name='expertise' placeholder='Expertise' className='form-control' onChange={(e) =>setExpertise(e.target.value)}/>
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className="input-group">
                                <span className="input-group-text  bg-primary text-white"><AiOutlineProfile /></span>
                                <input type='text' name='bio' placeholder='Bio' className='form-control' onChange={(e) =>setBio(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row" style={{gap:"10px"}}>
                        <div className='form-group'>
                            <div className="input-group">
                                <span className="input-group-text  bg-primary text-white"><AiOutlineBook /></span>
                                <input type='text' name='courses' placeholder='Courses' className='form-control' onChange={(e) =>setCourses(e.target.value)}/>
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className="input-group">
                                <span className="input-group-text  bg-primary text-white"><AiOutlineFieldTime /></span>
                                <input type='text' name='experience' placeholder='Experience' className='form-control' onChange={(e) =>setExperience(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row" style={{gap:"10px"}}>
                        <div className='form-group'>
                            <div className="input-group">
                                <span className="input-group-text  bg-primary text-white"><AiOutlineBank /></span>
                                <input type='text' name='education' placeholder='Education' className='form-control' onChange={(e) =>setEducation(e.target.value)}/>
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className="input-group">
                                <span className="input-group-text  bg-primary text-white"><AiOutlineEnvironment /></span>
                                <input type='text' name='location' placeholder='Location' className='form-control' onChange={(e) =>setLocation(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row" style={{gap:"10px"}}>
                        <div className='form-group'>
                            <div className="input-group">
                                <span className="input-group-text  bg-primary text-white"><AiOutlinePhone /></span>
                                <input type='text' name='contact' placeholder='Contact' className='form-control' onChange={(e) =>setContact(e.target.value)}/>
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className="input-group">
                                <span className="input-group-text bg-primary text-white"><AiOutlineCalendar /></span>
                                <input type='text' name='availability' placeholder='Availability' className='form-control' onChange={(e) =>setAvailability(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className="input-group">
                            <span className="input-group-text  bg-primary text-white"><AiOutlinePicture /></span>
                            <input type='text' name='image_url' placeholder='Image URL' className='form-control' onChange={(e) =>setImage(e.target.value)}/>
                        </div>
                    </div>
                    <button type="submit" className='btn btn-primary text-white' variant="contained" color="primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default BecomeTutor;