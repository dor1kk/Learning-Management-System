import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard"; 
import Courses from "./Pages/Student/Courses/Courses";
import Account from "./Pages/Home/Account/Account";
import Accounttt from "./Pages/Home/Account/Accounttt";
import CourseDetail from "./Pages/Student/Courses/Coursedetail";
import Notifications from "./Pages/Home/Notifications/Notifcations";
import Tutors from "./Pages/Student/Tutors/Tutors";
import BecomeTutor from "./Pages/Student/Tutors/BecomeTutor";
import TutorProfile from "./Pages/Student/Tutors/TutorProfile";
import YourCourses from "./Pages/Student/YourCourses/YourCourses";
import TutorDashboard from "./Pages/Tutor/TutorDashboard/Tutor-Dashboard";
import GradeManagement from "./Pages/Tutor/GradeManagement/GradeManagement";
import ExamManagement from "./Pages/Tutor/Exams-Management/ExamsManagement";
import LectureManagement from "./Pages/Tutor/Lectures-Management/LectureManagement";
import AddCourse from "./Pages/Tutor/Course-Management/AddCourse";
import UserManagment from "./Pages/Admin/UserManagement/UserManagment";
import CompletedLecturesPage from "./Pages/Student/Lectures/Complete-Lectures";
import Lecture from "./Pages/Student/Lectures/Lecture";
import CourseLecture from "./Pages/Student/Lectures/Course-Lecture";
import EditExam from "./Pages/Tutor/Exams-Management/EditExam";
import Exams from "./Pages/Student/Exams/Exams";
import Exam from "./Pages/Student/Exams/Exam";
import TakeExam from "./Pages/Student/Exams/takeExam";
import axios from "axios";
import EditCourse from "./Pages/Tutor/Course-Management/EditCourse";
import CompletedCourses from "./Pages/Student/YourCourses/CompletedCourses";
import CertificatePage from "./Pages/Student/YourCourses/Certificate";
import EditUser from "./Pages/Admin/UserManagement/EditUser";
import Feedback from "./Pages/Admin/Feedbacks/Feedback";
import Details from "./Pages/Student/Courses/Details";
import AnnouncementManagement from "./Pages/Tutor/Announcements-Management/Announcement";
import Mailbox from "./Pages/Tutor/Mail-Box/Mailbox";
import Messages from "./Pages/Student/Messages/Messages";
import AnalyticsPage from "./Pages/Admin/AnalyticsPage/Analytics";
import CoursesManagement from "./Pages/Admin/CourseManagement/CoursesManagement";
import ContentManagement from "./Pages/Admin/ContentManagement/ContentManagement";
import Forum from "./Pages/Student/Forum/Forum";
import CourseManagement from "./Pages/Tutor/Course-Management/CourseManagement";
import ManageQuestions from "./Pages/Tutor/Exams-Management/ManageQuestions";


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
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Accounttt" element={<Accounttt />} />
        <Route path="/Tutors" element={<Tutors />} />
        <Route path="/BecomeTutor" element={<BecomeTutor />} />
        <Route path="/TutorProfile/:id" element={<TutorProfile />} />
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
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/UserManagement" element={<UserManagment />}></Route>    
        <Route path="/EditUser/:id" element={<EditUser />}></Route>    
        <Route path="/ligjeratat/:courseId" element={<CompletedLecturesPage />}></Route>
        <Route path="/Courseslecture" element={<CourseLecture />}></Route>
        <Route path="/lecture/:lectureId" element={<Lecture />}></Route>
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
     
   
      </Routes>
    </Sidebar>
  );
};

export default PrivateRoute;