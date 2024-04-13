import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, InputBase, Typography, Divider, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

function Topbar({ toggleDarkMode, colors }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    
        const courses = [
            { id: 1, title: 'Course 1', image: 'course1.jpg' },
            { id: 2, title: 'Course 2', image: 'course2.jpg' },
            // Add more course data as needed
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
        <AppBar position="static" elevation={0} style={{ backgroundColor: colors.backgroundColor, color: colors.textColor }}>
            <Toolbar>
                <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
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
                            <SearchIcon style={{ color: colors.textColor }} />
                        </IconButton>
                    </form>
                    {searchResults.length > 0 && (
                        <Paper style={{ position: 'absolute', zIndex: 1, top: '40px', width: '37%' }}>
                            <List>
                                {searchResults.map(course => (
                                    <ListItem
                                        key={course.id}
                                        button
                                        onClick={() => handleCourseClick()} // Call handleCourseClick function on click
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
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <IconButton>
                        <AccountCircleIcon style={{ color: colors.textColor }} />
                    </IconButton>
                    <IconButton onClick={toggleDarkMode} >
                        <WbSunnyIcon style={{ color: colors.textColor }} />
                    </IconButton>
                </div>
            </Toolbar>
            <Divider />
        </AppBar>
    );
}

export default Topbar;