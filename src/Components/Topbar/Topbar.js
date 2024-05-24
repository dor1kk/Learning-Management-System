import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, InputBase, Typography, Divider, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import FeedbackIcon from '@mui/icons-material/Feedback';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'; // Import the VideoLibraryIcon
import { Modal, Input } from 'antd';
import axios from "axios";
import { MapRounded } from "@mui/icons-material";


function Topbar({ toggleDarkMode, colors }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
    const [isUserModalVisible, setIsUserModalVisible] = useState(false);
    const [isAboutUsModalVisible, setIsAboutUsModalVisible] = useState(false); 
    const [feedback, setFeedback] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [isStepByStepGuideModalVisible, setIsStepByStepGuideModalVisible] = useState(false); 

    const courses = [
        { id: 1, title: 'Course 1', image: 'course1.jpg' },
        { id: 2, title: 'Course 2', image: 'course2.jpg' },
    ];

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term.trim() !== '') {
            const results = courses.filter(course => course.title.toLowerCase().includes(term.toLowerCase()));
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleCourseClick = () => {
        window.location.href = `/Home/Courses`; 
    };

    const showFeedbackModal = () => {
        setIsFeedbackModalVisible(true);
    };



    const handleFeedbackOk = async () => {
        try {
            await axios.post('http://localhost:8080/insertFeedback', { feedback });
            setIsFeedbackModalVisible(false);
            setFeedback('');
        } catch (error) {
            console.error('There was an error submitting the feedback!', error);
        }
    };

    const handleFeedbackCancel = () => {
        setIsFeedbackModalVisible(false);
    };

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const showUserModal = async () => {
        try {
            const response = await axios.get('http://localhost:8080/studentsa');
            setUserInfo(response.data[0]);
            setIsUserModalVisible(true);
        } catch (error) {
            console.error('There was an error fetching the user info!', error);
        }
    };

    const handleUserModalOk = () => {
        setIsUserModalVisible(false);
    };

    const handleUserModalCancel = () => {
        setIsUserModalVisible(false);
    };

    const showAboutUsModal = () => {
        setIsAboutUsModalVisible(true);
    };

    const handleAboutUsOk = () => {
        setIsAboutUsModalVisible(false);
    };

    const handleAboutUsCancel = () => {
        setIsAboutUsModalVisible(false);
    };

    const showStepByStepGuideModal = () => {
        setIsStepByStepGuideModalVisible(true);
    };

    const handleStepByStepGuideOk = () => {
        setIsStepByStepGuideModalVisible(false);
    };

    const handleStepByStepGuideCancel = () => {
        setIsStepByStepGuideModalVisible(false);
    };


    return (
        <>
            <AppBar position="static" elevation={0} style={{ backgroundColor: "white" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1, color:"#2774AE" }}>
                        Education.
                    </Typography>
                    <div style={{ flexGrow: 1 }}>
                        <form className="d-flex align-items-center">
                            <InputBase
                                type="text"
                                className="form-control bg-light"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                style={{ marginRight: "10px" }}
                            />
                            <IconButton type="submit">
                                <SearchIcon style={{ color: "#2774AE"}} />
                            </IconButton>
                        </form>
                        {searchResults.length > 0 && (
                            <Paper style={{ position: 'absolute', zIndex: 1, top: '40px', width: '37%' }}>
                                <List>
                                    {searchResults.map(course => (
                                        <ListItem
                                            key={course.id}
                                            button
                                            onClick={()=> handleCourseClick()}
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar alt={course.title} src={course.image} />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={course.title} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Paper>
                                )}
                            </div>
                            <div style={{ flexGrow: 1, textAlign: "end" }}>
                                <IconButton edge="start" style={{color:"#2774AE"}} aria-label="menu">
                                    <MenuIcon />
                                </IconButton>
                                <IconButton onClick={showUserModal}>
                                    <AccountCircleIcon style={{ color:"#2774AE"}} />
                                </IconButton>
                                <IconButton onClick={toggleDarkMode} >
                                    <WbSunnyIcon style={{ color: "#2774AE" }} />
                                </IconButton>
                                <IconButton onClick={showFeedbackModal}>
                                    <FeedbackIcon style={{ color: "#2774AE" }} />
                                </IconButton>
                                {/* Add the IconButton for "About Us" */}
                                <IconButton onClick={showAboutUsModal}>
                                    <VideoLibraryIcon style={{ color: "#2774AE" }} />
                                </IconButton>
                                {/* Add the IconButton for "Step by Step Guide" */}
                                <IconButton onClick={showStepByStepGuideModal}>
                                    {/* Use any appropriate icon */}
                                    <MapRounded style={{ color: "#2774AE" }} />
                                </IconButton>
                            </div>
                        </Toolbar>
                        <Divider />
                    </AppBar>

                    <Modal
                        title="About Us"
                        visible={isAboutUsModalVisible}
                        onOk={handleAboutUsOk}
                        onCancel={handleAboutUsCancel}
                        okText="Close"
                        >
                        <video width="470" height="315" controls poster="https://visme.co/blog/wp-content/uploads/2023/02/What-Is-a-Learning-Management-System-How-to-Choose-the-Right-LMS-Thumbnail.jpg">
                        <source src={require('./LearningManagement.mp4')} type="video/mp4" />
                        Your browser does not support the video tag.
                        </video>
                </Modal>

                <Modal
                        title="Step by Step Guide"
                        visible={isStepByStepGuideModalVisible}
                        onOk={handleStepByStepGuideOk}
                        onCancel={handleStepByStepGuideCancel}
                        okText="Close"
                        >
                        <video width="470" height="315" controls poster="https://document360.com/wp-content/uploads/2024/03/Onboarding-Process-Checklist-scaled.jpg">
                        <source src={require('./Stepbystep.mp4')} type="video/mp4" />
                        Your browser does not support the video tag.
                        </video>
                </Modal>
                    
                    
                <Modal
                        title="Feedback"
                        visible={isFeedbackModalVisible}
                        onOk={handleFeedbackOk}
                        onCancel={handleFeedbackCancel}
                        okText="Submit"
                    >
                        <Input.TextArea
                            rows={4}
                            value={feedback}
                            onChange={handleFeedbackChange}
                            placeholder="Please enter your feedback"
                        />
                    </Modal>
                    
                    <Modal
                        title="User Information"
                        visible={isUserModalVisible}
                        onOk={handleUserModalOk}
                        onCancel={handleUserModalCancel}
                        okText="Close"
                    >
                        {userInfo && (
                            <>
                                <p><strong>Name:</strong> {userInfo.Name}</p>
                                <p><strong>Username:</strong> {userInfo.Username}</p>
                                <p><strong>Email:</strong> {userInfo.Email}</p>
                                <p><strong>Country:</strong> {userInfo.Country}</p>
                                <p><strong>Role:</strong> {userInfo.Role}</p>
                            </>
                        )}
                    </Modal>
                    
                    


                    </>
                    );
                    }
                    
            export default Topbar;
                    
                    
                       
