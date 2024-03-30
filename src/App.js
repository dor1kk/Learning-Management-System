import React, { useState } from "react";
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




const App = () => {
  const [darkMode, setDarkMode] = useState(false);

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
    sidebarColor:"black"
  };

  const colors = darkMode ? darkModeColors : lightModeColors;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "0px",height:"99vh", backgroundColor: colors.backgroundColor }}>
      <div style={{ display: "flex", height: "100%" }}>
        <Sidebar className="app" style={{height:"99vh", backgroundColor: colors.sidebarColor, color: colors.textColor }}>
          <Menu>
            <MenuItem
              className="menu1"
              icon={<AccountCircleIcon />}
            >
              <h6>Dorajet Kukaj</h6>
            </MenuItem>
            <MenuItem
              component={<Link to="/Dashboard" className="link" />}
              icon={<BsGrid3X3Gap />}
            >
              Dashboard
            </MenuItem>
            <MenuItem 
              component={<Link to="/Students" className="link" />}
            icon={<IoReceiptOutline />}> Students </MenuItem>
            
            <SubMenu label="Courses" icon={<IoBookOutline />}>
              <MenuItem
                   component={<Link to="/YourCourses" className="link" />} 
              icon={<FaGraduationCap />}>
                Your Courses
              </MenuItem>
              <MenuItem
               component={<Link to="/Courses" className="link" />}
              icon={<MdSchool/>}>Explore More...</MenuItem>
            </SubMenu>
            <MenuItem
              component={<Link to="/Tutors" className="link" />}
              icon={<FaChalkboardTeacher/>}
            >
              Tutors
            </MenuItem>
            <SubMenu label="Settings" icon={<AiOutlineSetting />}>
              <MenuItem 
              component={<Link to="/Account" className="link" />}
              icon={<AiOutlineUser />}> Account </MenuItem>
              <MenuItem 
              component={<Link to="/Chat" className="link" />}
              icon={<AiOutlineMessage />}> Chat </MenuItem>
              <MenuItem
              component={<Link to="/Notifications" className="link" />}
              icon={<AiOutlineNotification />}>
                Notifications
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<AiOutlineLogout />}> Logout </MenuItem>
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
              <Route path="/Dashboard" element={<Dashboard />}></Route>
              <Route path="/YourCourses" element={<YourCourses />}></Route>
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
