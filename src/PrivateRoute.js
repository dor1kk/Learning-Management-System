import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebaar from "./Sidebaar";
import Home from "./Components/Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard"; 
import Courses from "./Components/Courses/Courses";

import Account from "./Components/Account/Account";
import CourseDetail from "./Components/Courses/Coursedetail";
import StudentList from "./Components/Students/Students";
import Chat from "./Components/Chat/Chat";
import Notifications from "./Components/Notifications/Notifcations";
import Edit from "./Components/Students/Edit-Student";
import Tutors from "./Components/Tutors/Tutors";
import YourCourses from "./Components/YourCourses/YourCourses";




const PrivateRoute = () => {
  return (
    <Sidebaar>
      <Routes>
      <Route path="/Courses" element={<Courses />} />
      <Route path="/Account" element={<Account />} />
      <Route path="/Tutors" element={<Tutors />} />
      <Route path="/Students" element={<StudentList />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/" element={<Home />}></Route>
      <Route path="/YourCourses" element={<YourCourses />} />
      <Route path="/CourseDetail/:id" element={<CourseDetail />} />
      <Route path="/Chat" element={<Chat />} />
      <Route path="/Notifications" element={<Notifications />} />
      <Route path="/Students/Edit/:id" element={<Edit />} />
       
      </Routes>
    </Sidebaar>
  );
};

export default PrivateRoute;
