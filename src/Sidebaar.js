import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { AiOutlineMenu, AiOutlineSetting, AiOutlineUser, AiOutlineLock, AiOutlineNotification, AiOutlineLogout, AiOutlineProfile, AiFillProfile, AiOutlineDashboard } from 'react-icons/ai';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { IoReceiptOutline, IoSchoolOutline } from 'react-icons/io5';
import Topbar from "./Components/Topbar/Topbar";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Footer from "./Components/Footer/Footer";

import { FaChalkboard, FaPencilAlt, FaUserAstronaut, FaUserFriends } from "react-icons/fa";
import { IoBookOutline } from 'react-icons/io5';
import { MdGrade, MdSchool } from 'react-icons/md';
import { FaChartLine, FaClipboardCheck, FaCode, FaGraduationCap, FaUserPlus } from 'react-icons/fa';
import { AiOutlineMessage } from 'react-icons/ai';
import { FaChalkboardTeacher, FaHome } from 'react-icons/fa';

import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa6";


const Sidebaar = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole]=useState('');
  const [image,setImage]=useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
 

  
axios.defaults.withCredentials= true;

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

const handleLogout = () => {
  axios.get('http://localhost:8080/logout')
    .then(res => {
      if (res.data.Status === "Success") {
      
        setAuth(false);
        setName('');
        setRole('');
      
        navigate('/');
      } else {
        alert("Error");
      }
    })
    .catch(err => console.log(err));
};
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

  useEffect(() => {
    axios.get('http://localhost:8080/role')
      .then(res => {
        console.log(res.data); 
        if (res.data.valid) {
          setRole(res.data.role);
        } 
      })
      .catch(err => console.log(err));
  }, [location.pathname, navigate]);


  useEffect(() => {
    axios.get('http://localhost:8080/image')
      .then(res => {
        console.log(res.data); 
        if (res.data.valid) {
          setImage(res.data.image);
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
              icon={<img src={image} style={{width:"40px", height:"40px", borderRadius:"50%"}}></img>}
            >
            <h6>{name}</h6>
            </MenuItem>
            {role === "Admin" ? (
          <MenuItem
        component={<Link to="/Home/Dashboard" className="link" />}
        icon={<AiOutlineDashboard />}
       className={`menu-item ${location.pathname === "/Dashboard" ? "active" : ""}`}
     >
    Dashboard
  </MenuItem>
) : role === "Tutor" ? (
    <MenuItem
    component={<Link to="/Home/TutorDashboard" className="link" />}
    icon={<BsGrid3X3Gap />}
    className={`menu-item ${location.pathname === "/TutorDashboard" ? "active" : ""}`}
  >
    Dashboard
  </MenuItem>
) : null}


            
     

            {role === "Tutor" ? (
            <MenuItem
             component={<Link to="/Home/T-CoursesManagement" className="link" />}
            icon={<FaCode />}
            className={`menu-item ${location.pathname === "/Tutor-Courses" ? "active" : ""}` }
            >
           My Course Management
          </MenuItem>
              ) :role=== "Admin" ? (
                <MenuItem
                component={<Link to="/Home/" className="link" />}
               icon={<FaCode />}
               className={`menu-item ${location.pathname === "/Tutor-Courses" ? "active" : ""}` }
               >Course Management
             </MenuItem>
              ):null}


          {role === "Tutor" ? (
            <MenuItem
             component={<Link to="/Home/Students" className="link" />}
            icon={<IoReceiptOutline />}
            className={`menu-item ${location.pathname === "/Students" ? "active" : ""}` }
            >
            My Student Management
          </MenuItem>
              ) : null}

            
          {role === "Tutor" ? (
            <MenuItem
             component={<Link to="/Home/T-ExamsManagement" className="link" />}
            icon={<FaClipboardCheck />}
            className={`menu-item ${location.pathname === "/ExamManagement" ? "active" : ""}` }
            >
            Exams Management
          </MenuItem>
              ) : null}

{role === "Tutor" ? (
            <MenuItem
             component={<Link to="/Home/T-GradesManagement" className="link" />}
            icon={<MdGrade />}
            className={`menu-item ${location.pathname === "/GradeManagement" ? "active" : ""}` }
            >
            Grades Management
          </MenuItem>
              ) : null}

{role === "Tutor" ? (
            <MenuItem
             component={<Link to="/Home/T-LecturesManagement" className="link" />}
            icon={<IoSchoolOutline  />}
            className={`menu-item ${location.pathname === "/LectureManagement" ? "active" : ""}` }
            >
            Lectures Management
          </MenuItem>
              ) : null}






           {role === "Admin" ? (
          <MenuItem
        component={<Link to="/Home/Analytics" className="link" />}
        icon={<FaChartLine />}
       className={`menu-item ${location.pathname === "/Analytics" ? "active" : ""}`}
     >
    Analytics
  </MenuItem>):null}

        

           {role === "Student" ? (
          
              <MenuItem
                component={<Link to="/Home/YourCourses" className="link" />} 
                icon={<FaGraduationCap />}
                className={`menu-item ${location.pathname === "/YourCourses" ? "active" : ""}` }
              >
                My Courses
              </MenuItem>):null }
              {role === "Student" ? (
              <MenuItem
                component={<Link to="/Home/Courses" className="link" />}
                icon={<FaCode/>}
                className={`menu-item ${location.pathname === "/Courses" ? "active" : ""}` }
              >
                Explore Courses
              </MenuItem>
         ):null }


            {role === "Student" ? (
            <MenuItem
            component={<Link to="/Home/Tutors" className="link" />}
            icon={<FaChalkboardTeacher />}
            className={`menu-item ${location.pathname === "/Tutors" ? "active" : ""}`}
            >
            Tutors
            </MenuItem>
                ) : null}

{role === "Student" ? (
            <MenuItem
            component={<Link to="/Home/exams" className="link" />}
            icon={<FaPencilAlt />}
            className={`menu-item ${location.pathname === "/exams" ? "active" : ""}`}
            >
            Exams
            </MenuItem>
                ) : null}


{role === "Student" ? (
            <MenuItem
            component={<Link to="/Home/Friends" className="link" />}
            icon={<FaUserFriends />}
            className={`menu-item ${location.pathname === "/Friends" ? "active" : ""}`}
            >
            Friends
            </MenuItem>
                ) : null}

{role === "Student" ? (
            <MenuItem
            component={<Link to="/Home/Courseslecture" className="link" />}
            icon={<FaChalkboard />}
            className={`menu-item ${location.pathname === "/Lectures" ? "active" : ""}`}
            >
            Lectures
            </MenuItem>
                ) : null}

                
              {role === "Tutor" ? (
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
             ) : role=== "Student" ? (
              <SubMenu label="Settings" icon={<AiOutlineSetting />}>
              <MenuItem 
                style={{backgroundColor:colors.backgroundColor}}
                component={<Link to="/Home/Accounttt" className="link" />}
                icon={<AiOutlineUser />}
                className={`menu-item ${location.pathname === "/Accounttt" ? "active" : ""}` }
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
            </SubMenu>):null}


            
            

          


            <MenuItem
            onClick={handleLogout}
            
            icon={<AiOutlineLogout />}
            className={`menu-item ${location.pathname === "/Friends" ? "active" : ""}`}
            >
            Logout
            </MenuItem>
           
      
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
