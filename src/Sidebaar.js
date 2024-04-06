import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { AiOutlineMenu, AiOutlineSetting, AiOutlineUser, AiOutlineLock, AiOutlineNotification, AiOutlineLogout, AiOutlineProfile, AiFillProfile } from 'react-icons/ai';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { IoReceiptOutline } from 'react-icons/io5';
import Topbar from "./Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Footer from "./Components/Footer/Footer";
import Dashboard from "./Components/Dashboard/Dashboard";
import TutorProfile from "./Components/Tutors/TutorProfile";
import Courses from "./Components/Courses/Courses";
import Account from "./Components/Account/Account";
import Tutors from "./Components/Tutors/Tutors";
import Students from "./Components/Students/Students";
import YourCourses from "./Components/YourCourses/YourCourses";
import Chat from "./Components/Chat/Chat";
import Notifications from "./Components/Notifications/Notifcations";
import { IoBookOutline } from 'react-icons/io5';
import { MdSchool } from 'react-icons/md';
import { FaGraduationCap } from 'react-icons/fa';
import { AiOutlineMessage } from 'react-icons/ai';
import { FaChalkboardTeacher, FaHome } from 'react-icons/fa';
import Course from "./Components/Courses/Coursedata";
import CourseDetail from "./Components/Courses/Coursedetail";
import Signin from "./Components/Signin/Signin";
import Edit from "./Components/Students/Edit-Student";
import Signup from "./Components/Signin/Signup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Sidebaar = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

axios.defaults.withCredentials= true;

  useEffect(() => {
    axios.get('http://localhost:8080/')
      .then(res => {
        console.log(res.data); 
        if (res.data.valid) {
          setName(res.data.username);
        } 
      })
      .catch(err => console.log(err));
  }, [location.pathname, navigate]);
  

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const lightModeColors = {
    backgroundColor: "#ffffff",
    textColor: "#333333",
    footerBackgroundColor: "#f0f0f0",
    footerTextColor: "#333333",
    sidebarColor:"#a8d5e5"
  };

  const darkModeColors = {
    backgroundColor: "#333333",
    textColor: "#ffffff",
    footerBackgroundColor: "#222222",
    footerTextColor: "#ffffff",
    sidebarColor:"black",
    searchColor:"gray"
  };

  const colors = darkMode ? darkModeColors : lightModeColors;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "0px",height:"99vh", backgroundColor: colors.backgroundColor }}>
      <div style={{ display: "flex", height: "100%" }}>
        <Sidebar className="app" style={{height:"99vh", backgroundColor: colors.sidebarColor, color: colors.textColor }}>
          <Menu>
            <MenuItem
              className={`menu-item-1 ${location.pathname === "/Profile" ? "active" : ""}`}
              icon={<AccountCircleIcon />}
            >
            <h6>{name}</h6>
            </MenuItem>
           
            <MenuItem
              component={<Link to="/Home/Dashboard" className="link" />}
              icon={<BsGrid3X3Gap />}
              className={`menu-item ${location.pathname === "/Dashboard" ? "active" : ""}` }
            >
              Dashboard
            </MenuItem>
            <MenuItem 
              component={<Link to="/Home/Students" className="link" />}
              icon={<IoReceiptOutline />}
              className={`menu-item ${location.pathname === "/Students" ? "active" : ""}` }
            >
              Students
            </MenuItem>
            
            <SubMenu 
              label="Courses" 
              icon={<IoBookOutline />}
              className={`menu-item ${(location.pathname === "/Courses" || location.pathname === "/YourCourses") ? "active" : ""}`}
            >
              <MenuItem
                style={{backgroundColor:colors.backgroundColor}}
                component={<Link to="/Home/YourCourses" className="link" />} 
                icon={<FaGraduationCap />}
                className={`menu-item ${location.pathname === "/YourCourses" ? "active" : ""}` }
              >
                Your Courses
              </MenuItem>
              <MenuItem
                style={{backgroundColor:colors.backgroundColor}}
                component={<Link to="/Home/Courses" className="link" />}
                icon={<MdSchool/>}
                className={`menu-item ${location.pathname === "/Courses" ? "active" : ""}` }
              >
                Explore More...
              </MenuItem>
            </SubMenu>
            <MenuItem
              component={<Link to="/Home/Tutors" className="link" />}
              icon={<FaChalkboardTeacher/>}
              className={`menu-item ${location.pathname === "/Tutors" ? "active" : ""}` }
            >
              Tutors
            </MenuItem>

            
            
            <SubMenu label="Settings" icon={<AiOutlineSetting />}>
              <MenuItem 
                style={{backgroundColor:colors.backgroundColor}}
                component={<Link to="/Home/Account" className="link" />}
                icon={<AiOutlineUser />}
                className={`menu-item ${location.pathname === "/Account" ? "active" : ""}` }
              >
                Account
              </MenuItem>
              <MenuItem 
                style={{backgroundColor:colors.backgroundColor}}
                component={<Link to="/Home/Chat" className="link" />}
                icon={<AiOutlineMessage />}
                className={`menu-item ${location.pathname === "/Chat" ? "active" : ""}` }              >
                Chat
              </MenuItem>
              <MenuItem
                style={{backgroundColor:colors.backgroundColor}}
                component={<Link to="/Home/Notifications" className="link" />}
                icon={<AiOutlineNotification />}
                className={`menu-item ${location.pathname === "/Notifications" ? "active" : ""}` }              >
                Notifications
              </MenuItem>
            </SubMenu>
            
          </Menu>
        </Sidebar>
        <section className="flex-grow-1 d-flex flex-column">
          <Topbar toggleDarkMode={toggleDarkMode} colors={colors} />
          <div className="flex-grow-1" style={{ height: "70vh", overflow: "auto" }}>
            {children}
          </div>
          <Footer colors={colors} />
        </section>
      </div>
    </div>
  );
};

export default Sidebaar;
