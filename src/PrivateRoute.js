import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebaar from "./Sidebaar";
import Dashboard from "./Components/Dashboard/Dashboard"; 
import Courses from "./Components/Courses/Courses";
import Account from "./Components/Account/Account";
import Accounttt from "./Components/Account/Accounttt";
import CourseDetail from "./Components/Courses/Coursedetail";
import StudentList from "./Components/Students/Students";
import Chat from "./Components/Chat/Chat";
import Notifications from "./Components/Notifications/Notifcations";
import Tutors from "./Components/Tutors/Tutors";
import BecomeTutor from "./Components/Tutors/BecomeTutor";
import TutorProfile from "./Components/Tutors/TutorProfile";
import YourCourses from "./Components/YourCourses/YourCourses";
import TutorDashboard from "./Components/Tutor-Managements/Tutor-Dashboard";
import GradeManagement from "./Components/Tutor-Managements/GradeManagement";
import ExamManagement from "./Components/Tutor-Managements/Exams-Management/ExamsManagement";
import AddExam from "./Components/Tutor-Managements/Exams-Management/AddExam";
import LectureManagement from "./Components/Tutor-Managements/Lectures-Management/LectureManagement";
import EnrollManagement from "./Components/Tutor-Managements/EnrollManagement";
import CourseManagement from "./Components/Tutor-Managements/Course-Management/CourseManagement";
import AddCourse from "./Components/Tutor-Managements/Course-Management/AddCourse";
import UserManagment from "./Components/Admin-Managements/UserManagment/UserManagment";
import CompletedLecturesPage from "./Components/Completed-Lectures/Complete-Lectures";
import Lecture from "./Components/Lectures/Lecture";
import CourseLecture from "./Components/Completed-Lectures/Course-Lecture";
import Friends from "./Components/Friends/Friends";
import EditExam from "./Components/Tutor-Managements/Exams-Management/EditExam";
import ManageQuestions from "./Components/Tutor-Managements/Exams-Management/ManageQuestions";
import Exams from "./Components/Exams/Exams";
import Exam from "./Components/Exams/Exam";
import TakeExam from "./Components/Exams/takeExam";
import axios from "axios";
import EditCourse from "./Components/Tutor-Managements/Course-Management/EditCourse";
import CompletedCourses from "./Components/YourCourses/CompletedCourses";

const PrivateRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);



  axios.defaults.withCredentials=true;

  useEffect(() => {
    console.log("Checking authentication...");
    axios.get('http://localhost:8080/')
      .then(res => {
        console.log("Authentication response:", res.data);
        if (res.data.valid) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(err => {
        console.error('Error checking authentication:', err);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    console.log("Loading...");
    return <div>Loading...</div>; 
  }

  if (!isLoggedIn) {
    console.log("User not authenticated, redirecting to signin page.");
    return <Navigate to="/signin" />;
  }

  console.log("User authenticated, rendering private routes.");
  return (
    <Sidebaar>
      <Routes>
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Accounttt" element={<Accounttt />} />
        <Route path="/Tutors" element={<Tutors />} />
        <Route path="/BecomeTutor" element={<BecomeTutor />} />
        <Route path="/TutorProfile" element={<TutorProfile />} />
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
        <Route path="/T-ExamsManagement" element={<ExamManagement />} />
        <Route path="/T-LecturesManagement" element={<LectureManagement />} />
        <Route path="/T-EnrollManagement" element={<EnrollManagement/>} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/UserManagement" element={<UserManagment />}></Route>        
        <Route path="/ligjeratat/:courseId" element={<CompletedLecturesPage />}></Route>
        <Route path="/Courseslecture" element={<CourseLecture />}></Route>
        <Route path="/lecture/:lectureId" element={<Lecture />}></Route>
        <Route path="/Friends" element={<Friends />}></Route>
        <Route path="/addexam" element={<AddExam />}></Route>
        <Route path="/editexam/:id" element={<EditExam />}></Route>
        <Route path="/manageQuestions" element={<ManageQuestions />}></Route>
        <Route path="/exams" element={<Exams />}></Route>
        <Route path="/exam" element={<Exam />} />
        <Route path="/takeExam" element={<TakeExam />}></Route>
        <Route path="/AddCourse" element={<AddCourse />}></Route>
        <Route path="/EditCourse/:id" element={<EditCourse />}></Route>
        <Route path="/CompletedCourses" element={<CompletedCourses />}></Route>
      </Routes>
    </Sidebaar>
  );
};

export default PrivateRoute;
