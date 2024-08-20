import React, { useState } from "react";
import { Modal, Input, Badge, Table } from 'antd';
import axios from "axios";
import { DoneAll, MapRounded } from "@mui/icons-material";
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon, AccountCircle as AccountCircleIcon, Feedback as FeedbackIcon, Notifications as NotificationsIcon } from "@mui/icons-material";

function Topbar({ toggleDarkMode, colors, handleDrawerToggle }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
    const [isUserModalVisible, setIsUserModalVisible] = useState(false);
    const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [userInfo, setUserInfo] = useState(null);

    const courses = [
        { id: 1, title: 'Course 1', image: 'course1.jpg' },
        { id: 2, title: 'Course 2', image: 'course2.jpg' },
    ];

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term.trim() !== '') {
            const results = courses.filter(course => course.title.toLowerCase().includes(term.toLowerCase()));
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleCourseClick = () => {
        window.location.href = '/Home/Courses';
    };

    const showFeedbackModal = () => {
        setIsFeedbackModalVisible(true);
    };

    const handleFeedbackOk = async () => {
        try {
            await axios.post('http://localhost:8080/insertFeedback', { feedback });
            setIsFeedbackModalVisible(false);
            setFeedback('');
        } catch (error) {
            console.error('There was an error submitting the feedback!', error);
        }
    };

    const handleFeedbackCancel = () => {
        setIsFeedbackModalVisible(false);
    };

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
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
                return notification.NotificationText;
        }
    };

    const showUserModal = async () => {
        try {
            const response = await axios.get('http://localhost:8080/studentsa');
            setUserInfo(response.data[0]);
            setIsUserModalVisible(true);
        } catch (error) {
            console.error('There was an error fetching the user info!', error);
        }
    };

    const handleUserModalOk = () => {
        setIsUserModalVisible(false);
    };

    const handleUserModalCancel = () => {
        setIsUserModalVisible(false);
    };

    const showNotificationModal = async () => {
        try {
            const response = await axios.get("http://localhost:8080/notifications");
            setIsNotificationModalVisible(true);
            setNotifications(response.data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const handleNotificationClick = async (notification) => {
        try {
            await axios.put(`http://localhost:8080/notifications/${notification.NotificationID}`);
            showNotificationModal();
        } catch (error) {
            console.error("Error updating notification:", error);
        }
    };

    const handleNotificationModalOk = () => {
        setIsNotificationModalVisible(false);
    };

    const handleNotificationModalCancel = () => {
        setIsNotificationModalVisible(false);
    };

    const columns = [
        {
            dataIndex: 'NotificationText',
            key: 'NotificationText',
            render: (text, record) => <a>{getNotificationText(record)}</a>,
        },
        {
            key: 'action',
            render: (text, record) => (
                <Badge count={1} style={{ backgroundColor: 'red' }}>
                    <Avatar 
                        shape="circle" 
                        style={{ cursor: "pointer" }}
                        onClick={() => handleNotificationClick(record)} 
                    />
                </Badge>
            ),
        },
    ];

    return (
        <>
            <div className="bg-white shadow-md flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                    <button onClick={handleDrawerToggle} className="text-gray-600">
                        <MenuIcon />
                    </button>
                    <h1 className="text-gray-600 text-xl font-semibold">Education.</h1>
                </div>
                <div className="flex-1 mx-4 relative">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full py-2 px-4 border rounded-md bg-gray-100 focus:outline-none"
                    />
                    <button className="absolute right-0 top-0 mt-2 mr-2 text-gray-600">
                        <SearchIcon />
                    </button>
                    {searchResults.length > 0 && (
                        <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-2 shadow-lg">
                            <List>
                                {searchResults.map(course => (
                                    <ListItem
                                        key={course.id}
                                        button
                                        onClick={() => handleCourseClick()}
                                    >
                                        <ListItemAvatar>
                                            <Avatar alt={course.title} src={course.image} />
                                        </ListItemAvatar>
                                        <ListItemText primary={course.title} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={showUserModal} className="text-gray-600">
                        <AccountCircleIcon />
                    </button>
                    <button onClick={showFeedbackModal} className="text-gray-600">
                        <FeedbackIcon />
                    </button>
                    <div className="relative">
                        <button onClick={showNotificationModal} className="text-gray-600">
                            <NotificationsIcon />
                        </button>
                        <Badge count={notifications.filter(n => !n.read).length} className="absolute top-0 right-0">
                            <span className="sr-only">Notifications</span>
                        </Badge>
                    </div>
                </div>
            </div>

            <Modal
                title="User Info"
                open={isUserModalVisible}
                onOk={handleUserModalOk}
                onCancel={handleUserModalCancel}
            >
                {userInfo ? (
                    <div>
                        <p>Username: {userInfo.username}</p>
                        <p>Email: {userInfo.email}</p>
                        <p>Role: {userInfo.role}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal>

            <Modal
                title="Feedback"
                open={isFeedbackModalVisible}
                onOk={handleFeedbackOk}
                onCancel={handleFeedbackCancel}
            >
                <Input.TextArea
                    rows={4}
                    value={feedback}
                    onChange={handleFeedbackChange}
                    placeholder="Write your feedback here..."
                />
            </Modal>

            <Modal
                title="Notifications"
                open={isNotificationModalVisible}
                onOk={handleNotificationModalOk}
                onCancel={handleNotificationModalCancel}
                width={800}
            >
                <Table
                    dataSource={notifications}
                    columns={columns}
                    pagination={false}
                    rowKey="NotificationID"
                />
            </Modal>
        </>
    );
}

export default Topbar;
