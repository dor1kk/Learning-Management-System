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
import Lectures from "./Components/Lectures/Lectures";
import CompletedLecturesPage from "./Components/Completed-Lectures/Complete-Lectures";
import Lecture from "./Components/Lectures/Lecture";
import CourseLecture from "./Components/Completed-Lectures/Course-Lecture";
import Friends from "./Components/Friends/Friends";
import EditExam from "./Components/Tutor-Managements/Exams-Management/EditExam";
import ManageQuestions from "./Components/Tutor-Managements/Exams-Management/ManageQuestions";
import Exams from "./Components/Exams/Exams";
import Exam from "./Components/Exams/Exam";
import TakeExam from "./Components/Exams/takeExam";

const PrivateRoute = () => {
  return (
    <Sidebaar>
      <Routes>
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Account" element={<Account />} />
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
        <Route path="/lectures" element={<Lectures />} />
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
        
      </Routes>
    </Sidebaar>
  );
};

export default PrivateRoute;
