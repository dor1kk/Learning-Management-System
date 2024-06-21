import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Collapse, IconButton, Avatar, Menu, MenuItem, AppBar, Toolbar, Typography, Button
} from '@mui/material';
import {
  Menu as MenuIcon, AccountCircle, Dashboard, Settings, ExitToApp, ExpandLess, ExpandMore,
  Inbox, Mail, Group, Edit, Forum, PieChart, Laptop, School, Notifications
} from '@mui/icons-material';
import Topbar from "./Components/Topbar/Topbar";
import Footer from "./Components/Footer/Footer";
import axios from "axios";

const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8080')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post('http://localhost:8080/logout');
      if (res.data.status === "Success") {
        setAuth(false);
        setName('');
        setRole('');
        navigate('/');
      } else {
        alert("Error");
      }
    } catch (err) {
      console.error('Error logging out:', err);
      alert("Error logging out. Please try again later.");
    }
  };
  
  useEffect(() => {
    axios.get('http://localhost:8080/')
      .then(res => {
        if (res.data.valid) {
          setName(res.data.username);
        }
      })
      .catch(err => console.log(err));
  }, [location.pathname, navigate]);

  useEffect(() => {
    axios.get('http://localhost:8080/role')
      .then(res => {
        if (res.data.valid) {
          setRole(res.data.role);
        }
      })
      .catch(err => console.log(err));
  }, [location.pathname, navigate]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuItemClick = () => {
    setOpen(!open);
  };

  const handleChatbotToggle = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Drawer variant="persistent" anchor="left" open={open}>
        <div style={{ width: 250, backgroundColor: '#2774AE', height: '120vh', color: 'white' }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
            {role === "Admin" && (
              <>
                <ListItem button component={Link} to="/Home/AdminDashboard" onClick={handleMenuItemClick}>
                  <ListItemIcon>
                    <Dashboard style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/Home/UserManagement" onClick={handleMenuItemClick}>
                  <ListItemIcon>
                    <Group style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="User Management" />
                </ListItem>
                <ListItem button component={Link} to="/Home/CoursesManagement" onClick={handleMenuItemClick}>
                  <ListItemIcon>
                    <Edit style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Courses Management" />
                </ListItem>
                <ListItem button component={Link} to="/Home/ContentManagement" onClick={handleMenuItemClick}>
                  <ListItemIcon>
                    <Inbox style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Content Management" />
                </ListItem>
                <ListItem button component={Link} to="/Home/Feedback" onClick={handleMenuItemClick}>
                  <ListItemIcon>
                    <Mail style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Feedback" />
                </ListItem>
                <ListItem button component={Link} to="/Home/Analytics" onClick={handleMenuItemClick}>
                  <ListItemIcon>
                    <PieChart style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Analytics" />
                </ListItem>
              </>
            )}
            {role === "Tutor" && (
              <>
           <ListItem button component={Link} to="/Home/t-TutorDashboard" onClick={handleMenuItemClick}>
  <ListItemIcon>
    <Dashboard style={{ color: 'white' }} />
  </ListItemIcon>
  <ListItemText primary="Dashboard" />
</ListItem>
<ListItem button component={Link} to="/Home/T-CoursesManagement" onClick={handleMenuItemClick}>
  <ListItemIcon>
    <Edit style={{ color: 'white' }} />
  </ListItemIcon>
  <ListItemText primary="Courses Management" />
</ListItem>
<ListItem button component={Link} to="/Home/Mailbox" onClick={handleMenuItemClick}>
  <ListItemIcon>
    <Mail style={{ color: 'white' }} />
  </ListItemIcon>
  <ListItemText primary="Mail Box" />
</ListItem>
<ListItem button component={Link} to="/Home/Students" onClick={handleMenuItemClick}>
  <ListItemIcon>
    <School style={{ color: 'white' }} />
  </ListItemIcon>
  <ListItemText primary="Student Management" />
</ListItem>
<ListItem button component={Link} to="/Home/T-ExamsManagement" onClick={handleMenuItemClick}>
  <ListItemIcon>
    <Laptop style={{ color: 'white' }} />
  </ListItemIcon>
  <ListItemText primary="Exams Management" />
</ListItem>
<ListItem button component={Link} to="/Home/T-GradesManagement" onClick={handleMenuItemClick}>
  <ListItemIcon>
    <PieChart style={{ color: 'white' }} />
  </ListItemIcon>
  <ListItemText primary="Grades Management" />
</ListItem>
<ListItem button component={Link} to="/Home/T-LecturesManagement" onClick={handleMenuItemClick}>
  <ListItemIcon>
    <Mail style={{ color: 'white' }} />
  </ListItemIcon>
  <ListItemText primary="Lectures Management" />
</ListItem>
<ListItem button component={Link} to="/Home/T-AnnouncementsManagement" onClick={handleMenuItemClick}>
  <ListItemIcon>
    <Inbox style={{ color: 'white' }} />
  </ListItemIcon>
  <ListItemText primary="Announcements Management" />
</ListItem>

<ListItem button component={Link} to="/Home/Account" onClick={handleMenuItemClick}>
                  <ListItemIcon>
                    <Notifications style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </ListItem>

              

              </>
            )}
            {role === "Student" && (
              <>
                <ListItem button component={Link} to="/Home/YourCourses" onClick={handleMenuItemClick}>
  <ListItemIcon>
    <Laptop style={{ color: 'white' }} />
  </ListItemIcon>
  <ListItemText primary="My Courses" />
</ListItem>
<ListItem button component={Link} to="/Home/Courses" onClick={handleMenuItemClick}>
  <ListItemIcon>
    <Edit style={{ color: 'white' }} />
  </ListItemIcon>
  <ListItemText primary="Explore Courses" />
</ListItem>
<ListItem button component={Link} to="/Home/Messages" onClick={handleMenuItemClick}>
  <ListItemIcon>
    <Forum style={{ color: 'white' }} />
  </ListItemIcon>
  <ListItemText primary="Messages" />
</ListItem>
<ListItem button component={Link} to="/Home/Tutors" onClick={handleMenuItemClick}>
  <ListItemIcon>
    <Group style={{ color: 'white' }} />
  </ListItemIcon>
  <ListItemText primary="Tutors" />
</ListItem>
<ListItem button component={Link} to="/Home/exams" onClick={handleMenuItemClick}>
  <ListItemIcon>
    <School style={{ color: 'white' }} />
  </ListItemIcon>
  <ListItemText primary="Exams" />
</ListItem>
<ListItem button component={Link} to="/Home/Courseslecture" onClick={handleMenuItemClick}>
  <ListItemIcon>
    <Laptop style={{ color: 'white' }} />
  </ListItemIcon>
  <ListItemText primary="Lectures" />
</ListItem>
<ListItem button component={Link} to="/Home/Forum" onClick={handleMenuItemClick}>
  <ListItemIcon>
    <Forum style={{ color: 'white' }} />
  </ListItemIcon>
  <ListItemText primary="Forums" />
</ListItem>


                <ListItem button component={Link} to="/Home/Accounttt" onClick={handleMenuItemClick}>
                  <ListItemIcon>
                    <Notifications style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </ListItem>

              </>
              
            )}
            {role && (
              <ListItem button onClick={handleDrawerToggle}>
                <ListItemIcon>
                  <Settings style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Settings" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            )}
            {open && (
              <Collapse in={open} timeout="auto" unmountOnExit>
               
            </Collapse>
          )}
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    </Drawer>
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor:"white"}}>
          <IconButton style={{Color:"#2774AE"}} edge="start"  aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
            <Topbar />
       
        </Toolbar>
      </AppBar>
      <div style={{ backgroundColor: '#fff', height: "80vh", overflow: "scroll" }}>
        {children}

        {showChatbot && (
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/e8z2joQubAOsLVlsIDRPz"
            title="Chatbot"
            width="100%"
            style={{ height: "100%", minHeight: "700px" }}
            frameBorder="0"
          ></iframe>
        )}
      </div>
      <Footer />
    </div>
  </div>
);
};

export default Sidebar;

                   
