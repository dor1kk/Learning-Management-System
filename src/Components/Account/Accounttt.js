import React, { useState, useEffect } from "react";
import axios from "axios";
import './Account.css';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function Account() {
    const [student, setStudent] = useState({});
    const [updatedName, setUpdatedName] = useState('');
    const [updatedGrade, setUpdatedGrade] = useState('');
    const [updatedImage, setUpdatedImage] = useState('');
    const [updatedPlaceholderName, setUpdatedPlaceholderName] = useState('');
    const [updatedPlaceholderGrade, setUpdatedPlaceholderGrade] = useState('');
    const [user, setUser] = useState([]);
    const [Password, setPassword] = useState('');
    const navigate=useNavigate()

    useEffect(() => {
        fetchUsers();
      }, []);
    

      const fetchUsers = () => {
        axios.get('http://localhost:8080/users', { withCredentials: true })
            .then(response => {
                if (response.data && response.data.length > 0) {
                    setUser(response.data[0]); 
                }
            })
            .catch(error => console.error('Error fetching users:', error));
    };
    

  
    const Submit = async (e) => {
        e.preventDefault();
        try {
            const formData = { Password };
            await axios.post("http://localhost:8080/useri", formData);
            alert("Insert successfully!");
            navigate('/');
        } catch (error) {
            console.error("Insert enrolling:", error);
            alert("Failed to Insert. Please try again.");
        }
    };
      

    const deleteProfile = () => {
        axios.delete(`http://localhost:8080/students/${student.ID}`, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                
                setStudent({});
               
                axios.delete(`http://localhost:8080/users/${student.UserID}`, { withCredentials: true })
                    .then(userResponse => {
                        console.log(userResponse.data);
                        
                    })
                    .catch(userError => console.error('Error deleting corresponding user:', userError));
            })
            .catch(error => console.error('Error deleting profile:', error));
    };
    

    const deleteeeProfile = () => {
        axios.delete(`http://localhost:8080/studentii/${student.ID}`, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                setStudent({});
            })
            .catch(error => console.error('Error deleting profile:', error));
    };


    useEffect(() => {
        fetchStudentData();
    }, []);

    const fetchStudentData = () => {
        axios.get('http://localhost:8080/studentsa', { withCredentials: true })
            .then(response => {
                if (response.data && response.data.length > 0) {
                    const fetchedStudent = response.data[0];
                    setStudent(fetchedStudent);
                    setUpdatedName(fetchedStudent.Name);
                    setUpdatedGrade(fetchedStudent.Grade);
                    setUpdatedImage(fetchedStudent.Image);
                    setUpdatedPlaceholderName(fetchedStudent.Name);
                    setUpdatedPlaceholderGrade(fetchedStudent.Grade);
                  
                    
                }
            })
            .catch(error => console.error('Error fetching student data:', error));
    };
    const handleNameChange = (event) => {
        setUpdatedName(event.target.value);
    };

    const handleGradeChange = (event) => {
        setUpdatedGrade(event.target.value);
    };
    
    const handleImageChange = (event) => {
        setUpdatedImage(event.target.value);
    };

    
 

    const updateProfile = () => {
        const updatedData = {};
        if (updatedName !== '') {
            updatedData.Name = updatedName;
        }
        if (updatedGrade !== '') {
            updatedData.Grade = updatedGrade;
        }
        if (updatedImage !== '') {
            updatedData.Image = updatedImage;
        }


        axios.put(`http://localhost:8080/students/${student.ID}`, updatedData, { withCredentials: true })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => console.error('Error updating profile:', error));
    };
    
  
    return (
        <div className="container mt-1"> 
            <div className="row">
                <div className="col-12">
                    <div className="my-5">
                        <Typography variant="h3" gutterBottom fontWeight="bold" color="primary">My Profile</Typography>
                    </div>
                    <form className="file-upload">
                        <div className="row mb-5 gx-5">
                            {/* Contact detail */}
                            <div className="col-md-8 mb-md-0">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">Profile details</Typography>
                                        <div className="col-md-6">
                                            <label className="form-label">First Name *</label>
                                            <input type="text" className="form-control" placeholder={updatedPlaceholderName} aria-label="Name" value={updatedName} onChange={handleNameChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Grade *</label>
                                            <input type="text" className="form-control" placeholder={updatedPlaceholderGrade} aria-label="Grade" value={updatedGrade} onChange={handleGradeChange} />
                                        </div>
                                        {/* Add other profile details here */}
                                    </div>
                                    </div>
                            </div>
                            <div className="col-md-4 ">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">Upload Profile Photo</Typography>
                                    <div className="text-center">
                                        <div className="square position-relative display-2 mb-3">
                                            <img src={student.Image} alt="Profile" className="img-fluid position-absolute top-0 start-0 w-100 h-100" />
                                        </div>
                                    
                                        <div className="col-md-12">
                                          
                                          <input type="text" className="form-control" placeholder="Your image_url" onChange={ handleImageChange} />
                                      </div>
                                         
                                          <label  className="btn btn-success btn-block mt-3" htmlFor="customFile" onClick={updateProfile}>Upload</label>
                                          <button type="button" className="btn btn-danger" onClick={deleteeeProfile} >Remove</button>
                                          <p className="text-muted mt-3 mb-0"><span className="me-1">Note:</span>Minimum size 300px x 300px</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                   
                        </form>
                       <form onSubmit={Submit}>
                        <div  style={{ marginTop: '-310px' }} className="col-md-6 " >
                                <div className="bg-secondary-soft px-4 py-2 rounded">
                                    <div className="row g-3">
                                    <Typography style={{ marginTop: '10px', color: 'green', fontWeight: 'bold' }} variant="h6" gutterBottom>Change Password</Typography>
                                        {/* Old password */}
                                        <div className="col-md-6">
                                        <label className="form-label">Old Password *</label>
                                        <input type="name" className="form-control" placeholder="" aria-label="Old password"   value={user.Password}  />

                                        </div>
                                        {/* New password */}
                                        <div className="col-md-6">
                                        <label className="form-label">New Password *</label>
                                        <input type="password" className="form-control" placeholder="New Password"  
                                        onChange={(e) =>setPassword(e.target.value) }  /> 

                                        </div>
                                     
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="custom-button">Confirm</button>
                            </form>
                 
                                     
                                      
                    {/* Button */}
                    <div  style={{ marginTop: '100px' }} className="gap-3 d-md-flex justify-content-md-end">
                        <button type="button" className="btn btn-danger btn-lg me-3" onClick={deleteProfile}>Delete profile</button>
                        <button type="button" className="btn btn-primary btn-lg" onClick={updateProfile}>Update profile</button>
                    </div>
                </div>
                </div>
                </div>
       
    );
    }
export default Account;
