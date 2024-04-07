import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebaar from "./Sidebaar";
import Dashboard from "./Components/Dashboard/Dashboard"; 
import Courses from "./Components/Courses/Courses";
import Account from "./Components/Account/Account";
import CourseDetail from "./Components/Courses/Coursedetail";
import StudentList from "./Components/Students/Students";
import Chat from "./Components/Chat/Chat";
import Notifications from "./Components/Notifications/Notifcations";
import Tutors from "./Components/Tutors/Tutors";
import YourCourses from "./Components/YourCourses/YourCourses";
import TutorDashboard from "./Components/Tutor-Managements/Tutor-Dashboard";
import GradeManagement from "./Components/Tutor-Managements/GradeManagement";
import ExamsManagement from "./Components/Tutor-Managements/ExamsManagement";
import LectureManagement from "./Components/Tutor-Managements/LectureManagement";
import EnrollManagement from "./Components/Tutor-Managements/EnrollManagement";
import CourseManagement from "./Components/Tutor-Managements/Course-Management/CourseManagement";
import AddCourse from "./Components/Tutor-Managements/Course-Management/AddCourse";
import UserManagment from "./Components/Admin-Managements/UserManagment/UserManagment";

const PrivateRoute = () => {
  return (
    <Sidebaar>
      <Routes>
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Tutors" element={<Tutors />} />
        <Route path="/Students" element={<StudentList />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/YourCourses" element={<YourCourses />} />
        <Route path="/CourseDetail/:id" element={<CourseDetail />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/TutorDashboard" element={<TutorDashboard />} />
        <Route path="/T-CoursesManagement" element={<CourseManagement />} />
        <Route path="/T-GradesManagement" element={<GradeManagement />} />
        <Route path="/T-ExamsManagement" element={<ExamsManagement />} />
        <Route path="/T-LecturesManagement" element={<LectureManagement />} />
        <Route path="/T-EnrollManagement" element={<EnrollManagement/>} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/UserManagement" element={<UserManagment />}></Route>
      </Routes>
    </Sidebaar>
  );
};

export default PrivateRoute;
