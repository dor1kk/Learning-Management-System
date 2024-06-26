import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./Sidebaar";
import Dashboard from "./Components/Dashboard/Dashboard"; 
import Courses from "./Components/Courses/Courses";
import Account from "./Components/Account/Account";
import Accounttt from "./Components/Account/Accounttt";
import CourseDetail from "./Components/Courses/Coursedetail";
import StudentList from "./Components/Students/Students";
import Notifications from "./Components/Notifications/Notifcations";
import Tutors from "./Components/Tutors/Tutors";
import BecomeTutor from "./Components/Tutors/BecomeTutor";
import TutorProfile from "./Components/Tutors/TutorProfile";
import YourCourses from "./Components/YourCourses/YourCourses";
import TutorDashboard from "./Components/Tutor-Managements/Tutor-Dashboard";
import GradeManagement from "./Components/Tutor-Managements/GradeManagement";
import ExamManagement from "./Components/Tutor-Managements/Exams-Management/ExamsManagement";
import LectureManagement from "./Components/Tutor-Managements/Lectures-Management/LectureManagement";
import EnrollManagement from "./Components/Tutor-Managements/EnrollManagement";
import AddCourse from "./Components/Tutor-Managements/Course-Management/AddCourse";
import UserManagment from "./Components/Admin-Managements/UserManagment/UserManagment";
import CompletedLecturesPage from "./Components/Completed-Lectures/Complete-Lectures";
import Lecture from "./Components/Lectures/Lecture";
import CourseLecture from "./Components/Completed-Lectures/Course-Lecture";
import Friends from "./Components/Friends/Friends";
import EditExam from "./Components/Tutor-Managements/Exams-Management/EditExam";
import Exams from "./Components/Exams/Exams";
import Exam from "./Components/Exams/Exam";
import TakeExam from "./Components/Exams/takeExam";
import axios from "axios";
import EditCourse from "./Components/Tutor-Managements/Course-Management/EditCourse";
import CompletedCourses from "./Components/YourCourses/CompletedCourses";
import CertificatePage from "./Components/YourCourses/Certificate";
import EditUser from "./Components/Admin-Managements/UserManagment/EditUser";
import Feedback from "./Components/Admin-Managements/Feedback";
import Details from "./Components/Courses/Details";
import AnnouncementManagement from "./Components/Tutor-Managements/Announcements-Management/Announcement";
import Mailbox from "./Components/Tutor-Managements/Mail-Box/Mailbox";
import Messages from "./Components/Messages/Messages";
import AnalyticsPage from "./Components/Admin-Managements/Analytics/Analytics";
import CoursesManagement from "./Components/Admin-Managements/UserManagment/CoursesManagement";
import ContentManagement from "./Components/Admin-Managements/ContentManagement/ContentManagement";
import Forum from "./Components/Forum/Forum";
import CourseManagement from "./Components/Tutor-Managements/Course-Management/CourseManagement";
import ManageQuestions from "./Components/Tutor-Managements/Exams-Management/ManageQuestions";
import Homepage from "./Components/Home/Home";


const PrivateRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('');

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const res = await axios.get('http://localhost:8080/');
        setIsLoggedIn(res.data.valid);
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    const fetchRole = async () => {
      try {
        const res = await axios.get('http://localhost:8080/role');
        if (res.data.valid) {
          setRole(res.data.role);
          console.log("Role fetched:", res.data.role);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAuthStatus();
    fetchRole();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  }

  return (
    <Sidebar>
      <Routes>
<<<<<<< HEAD
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Accounttt" element={<Accounttt />} />
        <Route path="/Tutors" element={<Tutors />} />
        <Route path="/BecomeTutor" element={<BecomeTutor />} />
        <Route path="/TutorProfile/:id" element={<TutorProfile />} />
        <Route path="/Students" element={<StudentList />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/YourCourses" element={<YourCourses />} />
        <Route path="/CourseDetail/:id" element={<CourseDetail />} />
        <Route path="/CourseDetails/Details" element={<Details />}></Route>
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/TutorDashboard" element={<TutorDashboard />} />
        <Route path="/T-CoursesManagement" element={<CourseManagement />} />
        <Route path="/T-GradesManagement" element={<GradeManagement />} />
        <Route path="/T-ExamsManagement" element={<ExamManagement />} />
        <Route path="/T-LecturesManagement" element={<LectureManagement />} />
        <Route path="/T-EnrollManagement" element={<EnrollManagement/>} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/UserManagement" element={<UserManagment />}></Route>    
        <Route path="/EditUser/:id" element={<EditUser />}></Route>    
        <Route path="/ligjeratat/:courseId" element={<CompletedLecturesPage />}></Route>
        <Route path="/Courseslecture" element={<CourseLecture />}></Route>
        <Route path="/lecture/:lectureId" element={<Lecture />}></Route>
        <Route path="/Friends" element={<Friends />}></Route>
        <Route path="/editexam/:id" element={<EditExam />}></Route>
        <Route path="/ManageQuestions" element={<ManageQuestions />}></Route>
        <Route path="/exams" element={<Exams />}></Route>
        <Route path="/exam" element={<Exam />} />
        <Route path="/takeExam" element={<TakeExam />}></Route>
        <Route path="/AddCourse" element={<AddCourse />}></Route>
        <Route path="/EditCourse/:id" element={<EditCourse />}></Route>
        <Route path="/CoursesManagement" element={<CoursesManagement />}></Route>
        <Route path="/CompletedCourses" element={<CompletedCourses />}></Route>
        <Route path="/Certificate/:id" element={<CertificatePage />}></Route>
        <Route path="/T-AnnouncementsManagement" element={<AnnouncementManagement />}></Route>
        <Route path="/Mailbox" element={<Mailbox />}></Route>
        <Route path="/Feedback" element={<Feedback />}></Route>
        <Route path="/Messages" element={<Messages />}></Route>
        <Route path="/Analytics" element={<AnalyticsPage />}></Route>
        <Route path="/ContentManagement" element={<ContentManagement />}></Route>
        <Route path="/Forum" element={<Forum />}></Route>
     
   
=======
      <Route path="/Courses" element={<Courses role={role} />} />
<Route path="/Account" element={<Account role={role} />} />
<Route path="/Accounttt" element={<Accounttt role={role} />} />
<Route path="/Tutors" element={<Tutors role={role} />} />
<Route path="/BecomeTutor" element={<BecomeTutor role={role} />} />
<Route path="/TutorProfile/:id" element={<TutorProfile role={role} />} />
<Route path="/Students" element={<StudentList role={role} />} />
<Route path="/AdminDashboard" element={<Dashboard role={role} />} />
<Route path="/YourCourses" element={<YourCourses role={role} />} />
<Route path="/CourseDetail/:id" element={<CourseDetail role={role} />} />
<Route path="/CourseDetails/Details" element={<Details role={role} />}></Route>
<Route path="/Notifications" element={<Notifications role={role} />} />
<Route path="/T-TutorDashboard" element={<TutorDashboard role={role} />} />
<Route path="/T-CoursesManagement" element={<CourseManagement role={role} />} />
<Route path="/T-GradesManagement" element={<GradeManagement role={role} />} />
<Route path="/T-ExamsManagement" element={<ExamManagement role={role} />} />
<Route path="/T-LecturesManagement" element={<LectureManagement role={role} />} />
<Route path="/T-EnrollManagement" element={<EnrollManagement role={role} />} />
<Route path="/addcourse" element={<AddCourse role={role} />} />
<Route path="/" element={<Homepage role={role} />}></Route>
<Route path="/UserManagement" element={<UserManagment role={role} />}></Route>
<Route path="/EditUser/:id" element={<EditUser role={role} />}></Route>
<Route path="/ligjeratat/:courseId" element={<CompletedLecturesPage role={role} />}></Route>
<Route path="/Courseslecture" element={<CourseLecture role={role} />}></Route>
<Route path="/lecture/:lectureId" element={<Lecture role={role} />}></Route>
<Route path="/Friends" element={<Friends role={role} />}></Route>
<Route path="/editexam/:id" element={<EditExam role={role} />}></Route>
<Route path="/ManageQuestions" element={<ManageQuestions role={role} />}></Route>
<Route path="/exams" element={<Exams role={role} />}></Route>
<Route path="/exam" element={<Exam role={role} />} />
<Route path="/takeExam" element={<TakeExam role={role} />}></Route>
<Route path="/AddCourse" element={<AddCourse role={role} />}></Route>
<Route path="/EditCourse/:id" element={<EditCourse role={role} />}></Route>
<Route path="/CoursesManagement" element={<CoursesManagement role={role} />}></Route>
<Route path="/CompletedCourses" element={<CompletedCourses role={role} />}></Route>
<Route path="/Certificate/:id" element={<CertificatePage role={role} />}></Route>
<Route path="/T-AnnouncementsManagement" element={<AnnouncementManagement role={role} />}></Route>
<Route path="/Mailbox" element={<Mailbox role={role} />}></Route>
<Route path="/Feedback" element={<Feedback role={role} />}></Route>
<Route path="/Messages" element={<Messages role={role} />}></Route>
<Route path="/Analytics" element={<AnalyticsPage role={role} />}></Route>
<Route path="/ContentManagement" element={<ContentManagement role={role} />}></Route>
<Route path="/Forum" element={<Forum role={role} />}></Route>
>>>>>>> f1d87f95286a543edc9c1c97712087abe4998e5d
      </Routes>
    </Sidebar>
  );
};

export default PrivateRoute;