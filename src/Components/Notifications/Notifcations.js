import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Badge, Avatar, Tag, Tabs } from "antd";
import { BellOutlined, CheckCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import "./Notifications.css";

const { TabPane } = Tabs;

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all'); // Initial active category

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:8080/notifications");
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const getNotificationText = (notification) => {
    switch (notification.NotificationType) {
      case "course_upload":
        return `A new course has been uploaded on the site. Check it out: ${notification.NotificationText}`;
      case "announcement":
        return `New announcement: ${notification.NotificationText}`;
      case "grade":
        return `You've been graded: ${notification.NotificationText}`;
      default:
        return "";
    }
  };

  const getNotificationIcon = (notification) => {
    switch (notification.NotificationType) {
      case "course_upload":
        return <FileTextOutlined />;
      case "announcement":
        return <BellOutlined />;
      case "grade":
        return <CheckCircleOutlined />;
      default:
        return null;
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      await axios.put(`http://localhost:8080/notifications/${notification.NotificationID}`)
      fetchNotifications(); 
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const filterNotificationsByCategory = (category) => {
    if (category === 'all') {
      return notifications;
    } else {
      return notifications.filter(notification => notification.NotificationType === category);
    }
  };

  return (
    <div className="c-container p-5">
      <h1 style={{color:"#2774AE"}}>Notifications</h1>
      <Tabs defaultActiveKey="all" onChange={(key) => setActiveCategory(key)}>
        <TabPane tab="All" key="all">
          <List
            itemLayout="vertical"
            size="large"
            dataSource={notifications}
            renderItem={(notification) => (
              <List.Item
                key={notification.NotificationID}
                extra={
                  <Badge count={1} style={{ backgroundColor: 'red' }}>
                    <Avatar 
                      shape="circle" 
                      style={{cursor:"pointer"}}
                      icon={getNotificationIcon(notification)} 
                      onClick={() => handleNotificationClick(notification)} 
                    />
                  </Badge>
                }
              >
                <List.Item.Meta
                  title={<a className='text-primary' style={{textDecoration:"none"}} href={`/course/${notification.CourseID}`}>{notification.NotificationText}</a>}
                  description={getNotificationText(notification)}
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Announcements" key="announcement">
          <List
            itemLayout="vertical"
            size="large"
            dataSource={filterNotificationsByCategory('announcement')}
            renderItem={(notification) => (
              <List.Item
                key={notification.NotificationID}
                extra={
                  <Badge count={1} style={{ backgroundColor: 'red' }}>
                    <Avatar 
                      shape="circle" 
                      style={{cursor:"pointer"}}
                      icon={getNotificationIcon(notification)} 
                      onClick={() => handleNotificationClick(notification)} 
                    />
                  </Badge>
                }
              >
                <List.Item.Meta
                  title={<a className='text-primary' style={{textDecoration:"none"}} href={`/course/${notification.CourseID}`}>{notification.NotificationText}</a>}
                  description={getNotificationText(notification)}
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Grades" key="grade">
          <List
            itemLayout="vertical"
            size="large"
            dataSource={filterNotificationsByCategory('grade')}
            renderItem={(notification) => (
              <List.Item
                key={notification.NotificationID}
                extra={
                  <Badge count={1} style={{ backgroundColor: 'red' }}>
                    <Avatar 
                      shape="circle" 
                      style={{cursor:"pointer"}}
                      icon={getNotificationIcon(notification)} 
                      onClick={() => handleNotificationClick(notification)} 
                    />
                  </Badge>
                }
              >
                <List.Item.Meta
                  title={<a className='text-primary' style={{textDecoration:"none"}} href={`/course/${notification.CourseID}`}>{notification.NotificationText}</a>}
                  description={getNotificationText(notification)}
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Courses" key="course_upload">
          <List
            itemLayout="vertical"
            size="large"
            dataSource={filterNotificationsByCategory('course_upload')}
            renderItem={(notification) => (
              <List.Item
                key={notification.NotificationID}
                extra={
                  <Badge count={1} style={{ backgroundColor: 'red' }}>
                    <Avatar 
                      shape="circle" 
                      style={{cursor:"pointer"}}
                      icon={getNotificationIcon(notification)} 
                      onClick={() => handleNotificationClick(notification)} 
                    />
                  </Badge>
                }
              >
                <List.Item.Meta
                  title={<a className='text-primary' style={{textDecoration:"none"}} href={`/course/${notification.CourseID}`}>{notification.NotificationText}</a>}
                  description={getNotificationText(notification)}
                />
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Notifications;
