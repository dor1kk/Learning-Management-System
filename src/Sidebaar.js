import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout, Menu, Avatar, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  MessageOutlined,
  PieChartOutlined,
  UserSwitchOutlined,
  EditOutlined,
  ReadOutlined,
  TeamOutlined,
  BookOutlined,
  CheckSquareOutlined,
  VideoCameraOutlined,
  ContainerTwoTone,
  ContainerOutlined,
  DashboardOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  LaptopOutlined,
  ProfileOutlined,
  FormOutlined,
} from '@ant-design/icons';
import Topbar from "./Components/Topbar/Topbar";
import Footer from "./Components/Footer/Footer";
import axios from "axios";
import { AiOutlineSetting } from 'react-icons/ai';
import { ContentCopyRounded, ContentCutOutlined, Forum, MailOutline, Message } from "@mui/icons-material";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const Sidebaar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false); 

  axios.defaults.withCredentials = true;

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

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout} key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ Height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#2774AE' }}>
        <div className="logo" />
        <Menu theme="darkblue" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" style={{ color: "white" }} className="mb-5" icon={<UserOutlined />}>
            <span style={{ color: "white" }}>{name}</span>
          </Menu.Item>
          {role === "Admin" ? (
            <SubMenu key="sub1" icon={<DashboardOutlined />} style={{ color: "white" }} title="Dashboard">
              <Menu.Item key="2"><Link to="/Home/Dashboard" className="link" style={{ color: 'white' }}>Dashboard</Link></Menu.Item>
            </SubMenu>
          ) : role === "Tutor" ? (
            <SubMenu key="sub1" icon={<DashboardOutlined />} style={{ color: "white" }} title="Dashboard">
              <Menu.Item key="3"><Link to="/Home/TutorDashboard" className="link" style={{ color: 'white' }}>Dashboard</Link></Menu.Item>
            </SubMenu>
          ) : null}
          {role === "Admin" && (
            <>
              <Menu.Item key="4" style={{ color: "white" }} icon={<UserSwitchOutlined />}>
                <Link to="/Home/UserManagement" className="link" style={{ color: "white", textDecoration: "none" }}>User Management</Link>
              </Menu.Item>
              <Menu.Item key="5" style={{ color: "white" }} icon={<ContentCutOutlined />}>
                <Link to="/Home/ContentManagement" className="link" style={{ color: "white", textDecoration: "none" }}>Content Management</Link>
              </Menu.Item>
            </>
          )}
          {role === "Tutor" && (
            <>
              <SubMenu key="sub2" icon={<EditOutlined />} style={{ color: "white" }} title="My Course Management">
                <Menu.Item key="6"><Link to="/Home/T-CoursesManagement" style={{ color: "white" }} className="link">Courses Management</Link></Menu.Item>
              </SubMenu>
              <Menu.Item key="7" style={{ color: "white" }} icon={<MailOutline />}>
                <Link to="/Home/Mailbox" className="link" style={{ color: "white", textDecoration: "none" }}>Mail Box</Link>
              </Menu.Item>
              <Menu.Item key="8" style={{ color: "white" }} icon={<ReadOutlined />}>
                <Link to="/Home/Students" className="link" style={{ color: "white", textDecoration: "none" }}>My Student Management</Link>
              </Menu.Item>
              <Menu.Item key="9" style={{ color: "white" }} icon={<CheckSquareOutlined />}>
                <Link to="/Home/T-ExamsManagement" style={{ color: "white", textDecoration: "none" }}>Exams Management</Link>
              </Menu.Item>
              <Menu.Item key="10" style={{ color: "white" }} icon={<BookOutlined />}>
                <Link to="/Home/T-GradesManagement" style={{ color: "white", textDecoration: "none" }}>Grades Management</Link>
              </Menu.Item>
              <Menu.Item key="11" style={{ color: "white" }} icon={<ContainerOutlined />}>
                <Link to="/Home/T-LecturesManagement" style={{ color: "white", textDecoration: "none" }}>Lectures Management</Link>
              </Menu.Item>
              <Menu.Item key="12" style={{ color: "white" }} icon={<ContainerOutlined />}>
                <Link to="/Home/T-AnnouncementsManagement" style={{ color: "white", textDecoration: "none" }}>Announcements Management</Link>
              </Menu.Item>
            </>
          )}
          {role === "Admin" && (
            <Menu.Item key="13" style={{ color: "white" }} icon={<PieChartOutlined />}>
              <Link to="/Home/Analytics" style={{ color: "white", textDecoration: "none" }}>Analytics</Link>
            </Menu.Item>
          )}
          {role === "Student" && (
            <>
              <Menu.Item key="14" style={{ color: "white" }} icon={<LaptopOutlined />}>
                <Link to="/Home/YourCourses" style={{ color: "white", textDecoration: "none" }}>My Courses</Link>
              </Menu.Item>
              <Menu.Item key="15" style={{ color: "white" }} icon={<FormOutlined />}>
                <Link to="/Home/Courses" style={{ color: "white", textDecoration: "none" }}>Explore Courses</Link>
              </Menu.Item>
              <Menu.Item key="16" style={{ color: "white" }} icon={<Message />}>
                <Link to="/Home/Messages" style={{ color: "white", textDecoration: "none" }}>Messages</Link>
              </Menu.Item>
              <Menu.Item key="17" style={{ color: "white" }} icon={<TeamOutlined />}>
                <Link to="/Home/Tutors" style={{ color: "white", textDecoration: "none" }}>Tutors</Link>
              </Menu.Item>
              <Menu.Item key="18" style={{ color: "white" }} icon={<EditOutlined />}>
                <Link to="/Home/exams" style={{ color: "white", textDecoration: "none" }}>Exams</Link>
              </Menu.Item>
              <Menu.Item key="19" style={{ color: "white" }} icon={<UsergroupAddOutlined />}>
                <Link to="/Home/Friends" style={{ color: "white", textDecoration: "none" }}>Friends</Link>
              </Menu.Item>
              <Menu.Item key="20" style={{ color: "white" }} icon={<ContainerOutlined />}>
                <Link to="/Home/Courseslecture" className="link" style={{ color: "white", textDecoration: "none" }}>Lectures</Link>
              </Menu.Item>
              <Menu.Item key="21" style={{ color: "white" }} icon={<Forum />}>
                <Link to="/Home/Forum" style={{ color: "white", textDecoration: "none" }}>Forums</Link>
              </Menu.Item>
            </>
          )}
          {role && (
            <SubMenu key="sub3" style={{ color: "white" }} icon={<AiOutlineSetting />} title="Settings">
              <Menu.Item key="22"><Link to="/Home/Account" style={{ color: "white", textDecoration: "none" }}>Account</Link></Menu.Item>
              <Menu.Item key="23"><Link to="/Home/Notifications" style={{ color: "white", textDecoration: "none" }}>Notifications</Link></Menu.Item>
            </SubMenu>
          )}
          <Menu.Item key="24" style={{ color: "white", textDecoration: "none" }} icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ background: '#1890ff', padding: 0 }}>
          <Topbar />
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
            style: { color: '#fff' },
          })}
        </Header>
        <Content className="site-layout-background" style={{ background: '#fff', height: "80vh", overflow: "scroll" }}>
          {children}
  
          {showChatbot && (
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/e8z2joQubAOsLVlsIDRPz"
              title="Chatbot"
              width="100%"
              style={{ height: "100%", minHeight: "700px" }}
              frameBorder="0"
            ></iframe>
          )}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Sidebaar;
