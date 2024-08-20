import React, { useState, useEffect } from "react";
import { Drawer, List, IconButton } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import Topbar from '../Topbar/Topbar';
import Footer from '../Footer/Footer';
import axios from "axios";
import MenuIcon from '@mui/icons-material/Menu'; // Import the hamburger menu icon

const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(false); // Initially closed
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);

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

  return (
    <div style={{ display: 'flex' }}>
      <IconButton 
        color="inherit" 
        aria-label="open drawer" 
        onClick={handleDrawerToggle}
        edge="start"
        sx={{ ml: 2, display: { sm: 'none' } }} 
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary" 
        anchor="left"
        open={open}
        onClose={handleDrawerToggle} 
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            backgroundColor: 'white',
          
            height: '100vh'
          }
        }}
      >
        <SidebarHeader name={name} />
        <List>
          <SidebarMenu
            role={role}
            handleDrawerToggle={handleDrawerToggle}
            handleLogout={handleLogout}
            open={open}
    
          />
        </List>
      </Drawer>
      <div style={{ flexGrow: 1 }}>
        <Topbar handleDrawerToggle={handleDrawerToggle} />
        <div style={{ backgroundColor: '#fff', height: "90vh", overflow: "scroll" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
