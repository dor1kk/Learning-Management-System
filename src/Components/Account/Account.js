import React from "react";
import './Account.css';

function Account() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    
                    <div className="my-5">
                        <h3>My Profile</h3>
                        <hr />
                    </div>
                    
                    <form className="file-upload">
                        <div className="row mb-5 gx-5">
                            {/* Contact detail */}
                            <div className="col-md-8 mb-md-0">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="mb-4 mt-0">Profile details</h4>
                                        
                                        <div className="col-md-6">
                                            <label className="form-label">First Name *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="First name" value="Erza" />
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <label className="form-label">Last Name *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Last name" value="Shala" />
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <label className="form-label">Country *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Country" value="Kosove" />
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <label className="form-label">Address *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Address" value="Peje" />
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <label for="inputEmail" className="form-label">Email *</label>
                                            <input type="email" className="form-control" id="inputEmail" value="erzashala1@icloud.com" />
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <label className="form-label">Phone Number *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Phone Number" value="049 361 517" />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Role *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Role" value="Student" />
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            {/* Upload profile */}
                            <div className="col-md-4">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="mb-4 mt-0">Upload your profile photo</h4>
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

                        {/* Social media detail */}
                        <div className="row mb-5 gx-5">
                            <div className="col-md-6 mb-md-0">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="mb-4 mt-0">Social media detail</h4>
                                        
                                        <div className="col-md-6">
                                            <label className="form-label"><i className="fab fa-fw fa-facebook me-2 text-facebook"></i>Facebook *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Facebook" value="http://www.facebook.com" />
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <label className="form-label"><i className="fab fa-fw fa-twitter text-twitter me-2"></i>Twitter *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Twitter" value="http://www.twitter.com" />
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <label className="form-label"><i className="fab fa-fw fa-linkedin-in text-linkedin me-2"></i>Linkedin *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Linkedin" value="http://www.linkedin.com" />
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <label className="form-label"><i className="fab fa-fw fa-instagram text-instagram me-2"></i>Instagram *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Instagram" value="http://www.instagram.com" />
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <label className="form-label"><i className="fas fa-fw fa-basketball-ball text-dribbble me-2"></i>GitHub *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="GitHub" value="http://www.github.com" />
                                        </div>
                                    </div> {/* Row END */}
                                </div>
                            </div>

                            {/* Change password */}
                            <div className="col-md-6">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="my-4">Change Password</h4>
                                        {/* Old password */}
                                        <div className="col-md-6">
                                            <label htmlFor="oldPassword" className="form-label">Old password *</label>
                                            <input type="password" className="form-control" id="oldPassword" />
                                        </div>
                                        {/* New password */}
                                        <div className="col-md-6">
                                            <label htmlFor="newPassword" className="form-label">New password *</label>
                                            <input type="password" className="form-control" id="newPassword" />
                                        </div>
                                        {/* Confirm password */}
                                        <div className="col-md-12">
                                            <label htmlFor="confirmPassword" className="form-label">Confirm Password *</label>
                                            <input type="password" className="form-control" id="confirmPassword" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> {/* Row END */}
                        {/* Button */}
                        <div className="gap-3 d-md-flex justify-content-md-end">
                            <button type="button" className="btn btn-danger btn-lg me-3">Delete profile</button>
                            <button type="button" className="btn btn-primary btn-lg">Update profile</button>
                        </div>
                    </form> {/* Form END */}
                </div>
            </div>
        </div>
    );
}

export default Account;
