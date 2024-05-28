import React, { useState, useEffect } from "react";
import axios from "axios";
import './Account.css';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function Account() {
    const [tutor, setTutor] = useState({});
    const [updatedname, setUpdatedname] = useState('');
    const [updatedemail, setUpdatedemail] = useState('');
    const [updatedexpertise, setUpdatedexpertise] = useState('');
    const [updatedbio, setUpdatedbio] = useState('');
    const [updatedcourses, setUpdatedcourses] = useState('');
    const [updatedexperience, setUpdatedexperience] = useState('');
    const [updatededucation, setUpdatededucation] = useState('');
    const [updatedlocation, setUpdatedlocation] = useState('');
    const [updatedimage_url, setUpdatedimage_url] = useState(''); 
    const [updatedcontact, setUpdatedcontact] = useState('');
    const [updatedavailability, setUpdatedavailability] = useState('');
    const [updatedPlaceholdername] = useState('');
    const [updatedPlaceholderemail] = useState('');
    const [updatedPlaceholderexpertise] = useState('');
    const [updatedPlaceholderbio] = useState('');
    const [updatedPlaceholderexperience] = useState('');
    const [updatedPlaceholdereducation] = useState('');
    const [updatedPlaceholderlocation] = useState('');
    const [updatedPlaceholdercontact] = useState('');
    const [updatedPlaceholderavailability] = useState('');
     const [user, setUser] = useState([]);
    const [Password, setPassword] = useState('');
    const navigate=useNavigate()


    useEffect(() => {
        fetchUsers();
      }, []);
    

      const fetchUsers = () => {
        axios.get('http://localhost:8080/usersss', { withCredentials: true })
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
      
 

    const deleteeProfile = () => {
        axios.delete(`http://localhost:8080/tuturii/${tutor.TutorID}`, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                setTutor({});
            })
            .catch(error => console.error('Error deleting profile:', error));
    };


    useEffect(() => {
        fetchTutorData();
    }, []);

    const fetchTutorData = () => {
        axios.get('http://localhost:8080/tutoria', { withCredentials: true })
            .then(response => {
                if (response.data && response.data.length > 0) {
                    const fetchedTutor = response.data[0];
                    setTutor(fetchedTutor);
                    setUpdatedname(fetchedTutor.name);
                    setUpdatedemail(fetchedTutor.email);
                    setUpdatedexpertise(fetchedTutor.expertise);
                    setUpdatedbio(fetchedTutor.bio);
                    setUpdatedexperience(fetchedTutor.experience);
                    setUpdatededucation(fetchedTutor.education);
                    setUpdatedlocation(fetchedTutor.location);
                    setUpdatedcontact(fetchedTutor.contact);
                    setUpdatedavailability(fetchedTutor.availability);
                    setUpdatedimage_url(fetchedTutor.image_url);

                }
            })
            .catch(error => console.error('Error fetching tutor data:', error));
    };
    
    const handlenameChange = (event) => {
        setUpdatedname(event.target.value);
    };

    const handleemailChange = (event) => {
        setUpdatedemail(event.target.value);
    };

    const handleexpertiseChange = (event) => {
        setUpdatedexpertise(event.target.value);
    };

    const handlebioChange = (event) => {
        setUpdatedbio(event.target.value);
    };


    const handleexperienceChange = (event) => {
        setUpdatedexperience(event.target.value);
    };

    const handleeducationChange = (event) => {
        setUpdatededucation(event.target.value);
    };

    const handlelocationChange = (event) => {
        setUpdatedlocation(event.target.value);
    };

    const handlecontactChange = (event) => {
        setUpdatedcontact(event.target.value);
    };

    const handleavailabilityChange = (event) => {
        setUpdatedavailability(event.target.value);
    };
 
    const handleimage_urlChange = (event) => {
        setUpdatedimage_url(event.target.value);
    };

    const updateProfileee = () => {
        const updatedData = {};

        if (updatedname !== '') {
            updatedData.name = updatedname;
        }
        if (updatedemail !== '') {
            updatedData.email = updatedemail;
        }
        if (updatedexpertise !== '') {
            updatedData.expertise = updatedexpertise;
        }
        if (updatedbio !== '') {
            updatedData.bio = updatedbio;
        }
        if (updatedcourses !== '') {
            updatedData.courses = updatedcourses;
        }
        if (updatedexperience !== '') {
            updatedData.experience = updatedexperience;
        }
        if (updatededucation !== '') {
            updatedData.education = updatededucation;
        }
        if (updatedlocation !== '') {
            updatedData.location = updatedlocation;
        }
        if (updatedcontact !== '') {
            updatedData.contact = updatedcontact;
        }
        if (updatedavailability !== '') {
            updatedData.availability = updatedavailability;
        }

        if (updatedimage_url !== '') {
            updatedData.image_url = updatedimage_url;
        }
        axios.put(`http://localhost:8080/tutorss/${tutor.TutorID}`, updatedData, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                alert("Profile updated successfully!");
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
                                        <input type="text" className="form-control" placeholder={updatedPlaceholdername} aria-label="First name" value={updatedname} onChange={handlenameChange} />

                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Email *</label>
                                            <input type="text" className="form-control" placeholder={updatedPlaceholderemail} aria-label="Email" value={updatedemail} onChange={handleemailChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Expertise *</label>
                                            <input type="text" className="form-control" placeholder={updatedPlaceholderexpertise} aria-label="Expertise" value={updatedexpertise} onChange={handleexpertiseChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Bio *</label>
                                            <input type="text" className="form-control" placeholder={updatedPlaceholderbio} aria-label="Bio" value={updatedbio} onChange={handlebioChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Experience *</label>
                                            <input type="text" className="form-control" placeholder={updatedPlaceholderexperience} aria-label="Experience" value={updatedexperience} onChange={handleexperienceChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Education *</label>
                                            <input type="text" className="form-control" placeholder={updatedPlaceholdereducation} aria-label="Education" value={updatededucation} onChange={handleeducationChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Location *</label>
                                            <input type="text" className="form-control" placeholder={updatedPlaceholderlocation} aria-label="Location" value={updatedlocation} onChange={handlelocationChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Contact *</label>
                                            <input type="text" className="form-control" placeholder={updatedPlaceholdercontact} aria-label="Contact" value={updatedcontact} onChange={handlecontactChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Availability *</label>
                                            <input type="text" className="form-control" placeholder={updatedPlaceholderavailability} aria-label="Availability" value={updatedavailability} onChange={handleavailabilityChange} />
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
                                            <img src={tutor.image_url} alt="Profile" className="img-fluid position-absolute top-0 start-0 w-100 h-100" />
                                            </div>
                                            <div className="col-md-12">
                                          
                                            <input type="text" className="form-control" placeholder="Your image_url" onChange={ handleimage_urlChange} />
                                        </div>
                                           
                                            <label  className="btn btn-success btn-block mt-3" htmlFor="customFile" onClick={updateProfileee}>Upload</label>
                                            <button type="button" className="btn btn-danger" onClick={deleteeProfile}>Remove</button>
                                            <p className="text-muted mt-3 mb-0"><span className="me-1">Note:</span>Minimum size 300px x 300px</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        </form>
                        <form onSubmit={Submit}>
                        <div className="col-md-6 " >
                                <div className="bg-secondary-soft px-4 py-2 rounded">
                                    <div className="row g-3">
                                    <Typography style={{ marginTop: '10px', color: 'green', fontWeight: 'bold' }} variant="h6" gutterBottom>Change Password</Typography>
                                        {/* Old password */}
                                        <div className="col-md-6">
                                        <label className="form-label">Old Password *</label>
                                        <input type="name" className="form-control" aria-label="Old password"  value={user.Password} disabled />

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
                            <button type="custom-button" class="custom-button">Confirm</button>
                            </form>
                 
                  
                    <div style={{ marginTop: '-30px' }} className="gap-3 d-md-flex justify-content-md-end">
                     
                        <button type="button" className="btn btn-primary btn-lg" onClick={updateProfileee}>Update profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
