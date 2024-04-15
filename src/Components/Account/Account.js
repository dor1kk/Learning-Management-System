import React, { useState, useEffect } from "react";
import axios from "axios";
import './Account.css';
import Typography from '@mui/material/Typography';

function Account() {
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        fetchTutorData();
    }, []);

    const fetchTutorData = () => {
        axios.get('http://localhost:8080/tutoria', { withCredentials: true })
            .then(response => {
                if (response.data && response.data.length > 0) {
                    setProfileData(response.data[0]);
                }
            })
            .catch(error => console.error('Error fetching tutor data:', error));
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
                                            <input type="text" className="form-control" placeholder="" aria-label="First name" value={profileData.name} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Email *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Email" value={profileData.email} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Expertise *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Expertise" value={profileData.expertise} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Bio *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Bio" value={profileData.bio} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Courses *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Courses" value={profileData.courses} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Experience *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Experience" value={profileData.experience} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Education *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Education" value={profileData.education} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Location *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Location" value={profileData.location} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Contact *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Contact" value={profileData.contact} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Availability *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Availability" value={profileData.availability} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                    

<Typography variant="h4" gutterBottom fontWeight="bold" color="primary">Upload Profile Photo</Typography>

                                        <div className="text-center">
                                            
                                            <div className="square position-relative display-2 mb-3">
                                                <i className="fas fa-fw fa-user position-absolute top-50 start-50 translate-middle text-secondary"></i>
                                            </div>
                                            
                                            <input type="file" id="customFile" name="file" hidden />
                                            <label className="btn btn-success btn-block" htmlFor="customFile">Upload</label>
                                            <button type="button" className="btn btn-danger">Remove</button>
                                            
                                            <p className="text-muted mt-3 mb-0"><span className="me-1">Note:</span>Minimum size 300px x 300px</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 

                       
                    </form>
                    {/* Button */}
                    <div className="gap-3 d-md-flex justify-content-md-end">
                        <button type="button" className="btn btn-danger btn-lg me-3">Delete profile</button>
                        <button type="button" className="btn btn-primary btn-lg">Update profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
