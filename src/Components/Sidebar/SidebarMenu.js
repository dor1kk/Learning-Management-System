import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTachometerAlt, FaUsers, FaChalkboardTeacher, FaInbox, FaEnvelope, FaChartPie, FaPlay, FaSchool,
  FaComments, FaUser, FaSignOutAlt
} from 'react-icons/fa'; // Import the icons from react-icons

const SidebarMenu = ({ role, handleLogout }) => {
  return (
    <div className="space-y-2 p-4 bg-gray-100 h-full">
      {role === "Admin" && (
        <>
          <SidebarLink to="/Home/AdminDashboard" icon={<FaTachometerAlt />} text="Dashboard" />
          <SidebarLink to="/Home/UserManagement" icon={<FaUsers />} text="User Management" />
          <SidebarLink to="/Home/CoursesManagement" icon={<FaChalkboardTeacher />} text="Courses Management" />
          <SidebarLink to="/Home/ContentManagement" icon={<FaInbox />} text="Content Management" />
          <SidebarLink to="/Home/Feedback" icon={<FaEnvelope />} text="Feedback" />
          <SidebarLink to="/Home/Analytics" icon={<FaChartPie />} text="Analytics" />
          <SidebarLink to="/Home/Team" icon={<FaUsers />} text="Team" />
          <SidebarLink to="/Home/Player" icon={<FaPlay />} text="Player" />
        </>
      )}
      {role === "Tutor" && (
        <>
          <SidebarLink to="/Home/TutorDashboard" icon={<FaTachometerAlt />} text="Dashboard" />
          <SidebarLink to="/Home/T-CoursesManagement" icon={<FaChalkboardTeacher />} text="Courses Management" />
          <SidebarLink to="/Home/Mailbox" icon={<FaEnvelope />} text="Mail Box" />
          <SidebarLink to="/Home/Students" icon={<FaSchool />} text="Student Management" />
          <SidebarLink to="/Home/T-ExamsManagement" icon={<FaPlay />} text="Exams Management" />
          <SidebarLink to="/Home/T-GradesManagement" icon={<FaChartPie />} text="Grades Management" />
          <SidebarLink to="/Home/T-LecturesManagement" icon={<FaEnvelope />} text="Lectures Management" />
          <SidebarLink to="/Home/T-AnnouncementsManagement" icon={<FaInbox />} text="Announcements Management" />
          <SidebarLink to="/Home/Account" icon={<FaUser />} text="Account" />
        </>
      )}
      {role === "Student" && (
        <>
          <SidebarLink to="/Home/YourCourses" icon={<FaPlay />} text="My Courses" />
          <SidebarLink to="/Home/Courses" icon={<FaChalkboardTeacher />} text="Explore Courses" />
          <SidebarLink to="/Home/Messages" icon={<FaComments />} text="Messages" />
          <SidebarLink to="/Home/Tutors" icon={<FaUsers />} text="Tutors" />
          <SidebarLink to="/Home/Exams" icon={<FaSchool />} text="Exams" />
          <SidebarLink to="/Home/Lectures" icon={<FaPlay />} text="Lectures" />
          <SidebarLink to="/Home/Forum" icon={<FaComments />} text="Forums" />
          <SidebarLink to="/Home/Account" icon={<FaUser />} text="Account" />
        </>
      )}
      <button
        onClick={handleLogout}
        className="flex items-center p-2 mt-4 text-gray-700 hover:bg-gray-200 rounded-md"
      >
        <FaSignOutAlt className="text-gray-500" />
        <span className="ml-2">Logout</span>
      </button>
    </div>
  );
};

const SidebarLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md"
  >
    <span className="text-gray-500">{icon}</span>
    <span className="ml-2">{text}</span>
  </Link>
);

export default SidebarMenu;
