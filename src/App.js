import React, { useState } from "react";
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
import { FaChalkboardTeacher } from 'react-icons/fa';
import Course from "./Components/Courses/Coursedata";
import CourseDetail from "./Components/Courses/Coursedetail";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

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
              <h6>Dorajet Kukaj</h6>
            </MenuItem>
            <MenuItem
              component={<Link to="/" className="link" />}
              icon={<BsGrid3X3Gap />}
              className={`menu-item ${location.pathname === "/Dashboard" ? "active" : ""}` }
            >
              Dashboard
            </MenuItem>
            <MenuItem 
              component={<Link to="/Students" className="link" />}
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
                component={<Link to="/YourCourses" className="link" />} 
                icon={<FaGraduationCap />}
                className={`menu-item ${location.pathname === "/YourCourses" ? "active" : ""}` }
              >
                Your Courses
              </MenuItem>
              <MenuItem
                style={{backgroundColor:colors.backgroundColor}}
                component={<Link to="/Courses" className="link" />}
                icon={<MdSchool/>}
                className={`menu-item ${location.pathname === "/Courses" ? "active" : ""}` }
              >
                Explore More...
              </MenuItem>
            </SubMenu>
            <MenuItem
              component={<Link to="/Tutors" className="link" />}
              icon={<FaChalkboardTeacher/>}
              className={`menu-item ${location.pathname === "/Tutors" ? "active" : ""}` }
            >
              Tutors
            </MenuItem>
            
            <SubMenu label="Settings" icon={<AiOutlineSetting />}>
              <MenuItem 
                style={{backgroundColor:colors.backgroundColor}}
                component={<Link to="/Account" className="link" />}
                icon={<AiOutlineUser />}
                className={`menu-item ${location.pathname === "/Account" ? "active" : ""}` }
              >
                Account
              </MenuItem>
              <MenuItem 
                style={{backgroundColor:colors.backgroundColor}}
                component={<Link to="/Chat" className="link" />}
                icon={<AiOutlineMessage />}
                className={`menu-item ${location.pathname === "/Chat" ? "active" : ""}` }              >
                Chat
              </MenuItem>
              <MenuItem
                style={{backgroundColor:colors.backgroundColor}}
                component={<Link to="/Notifications" className="link" />}
                icon={<AiOutlineNotification />}
                className={`menu-item ${location.pathname === "/Notifications" ? "active" : ""}` }              >
                Notifications
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<AiOutlineLogout />} className={location.pathname === "/Logout" ? "active" : ""}>Logout</MenuItem>
          </Menu>
        </Sidebar>
        <section className="flex-grow-1 d-flex flex-column">
          <Topbar toggleDarkMode={toggleDarkMode} colors={colors} />
          <div className="flex-grow-1" style={{ height: "70vh", overflow: "auto" }}>
            <Routes>
              <Route path="/Courses" element={<Courses />} />
              <Route path="/Account" element={<Account />}></Route>
              <Route path="/Tutors" element={<Tutors />}></Route>
              <Route path="/Students" element={<Students />}></Route>             
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/YourCourses" element={<YourCourses />}></Route>
              <Route path="/CourseDetail/:id" element={<CourseDetail />}></Route>
              <Route path="/Chat" element={<Chat />}></Route>
              <Route path="/Notifications" element={<Notifications />}></Route>
            </Routes>
          </div>
          <Footer colors={colors} />
        </section>
      </div>
    </div>
  );
};

export default App;
