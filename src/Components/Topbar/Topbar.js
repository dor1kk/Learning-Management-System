import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, InputBase, Typography, Divider, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Link } from "react-router-dom";

function Topbar({ toggleDarkMode, colors }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    
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
    

    return (
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
                                        onClick={() => handleCourseClick()}
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
                    <IconButton>
                        <AccountCircleIcon style={{ color:"#2774AE"}} />
                    </IconButton>
                    <IconButton onClick={toggleDarkMode} >
                        <WbSunnyIcon style={{ color: "#2774AE" }} />
                    </IconButton>
                </div>
            </Toolbar>
            <Divider />
        </AppBar>
    );
}

export default Topbar;