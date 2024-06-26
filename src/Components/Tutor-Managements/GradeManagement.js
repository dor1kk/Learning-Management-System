import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Avatar, Select, Button, notification } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const { Option } = Select;

function GradeManagement({role}) {

    if (role !== "Tutor") {
        window.location.href = "/unauthorized";
      }

    const [exams, setExams] = useState([]);
    const [grades, setGrades] = useState([]);
    const [formData, setFormData] = useState({
        grade: ""
    });

    useEffect(() => {
        const fetchPassedExams = async () => {
            try {
                const response = await axios.get('http://localhost:8080/passedexam');
                setExams(response.data);
            } catch (error) {
                console.error('Error fetching passed exams:', error);
            }
        };

        fetchPassedExams();

        const gradesArray = [];
        for (let i = 6; i <= 10; i++) {
            gradesArray.push(i);
        }
        setGrades(gradesArray);
    }, []);

    const handleChange = (value, courseId, userId) => {
        setFormData({ ...formData, grade: value });
    }

    const handleSubmit = async (courseId, userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/completedcourses/graded`, {
                params: {
                    courseId: courseId,
                    userId: userId
                }
            });

            if (response.data.graded) {
                notification.warning({
                    message: 'Student has already been graded!',
                });
            } else {
                await axios.post('http://localhost:8080/completedcourses', {
                    courseId: courseId,
                    userId: userId,
                    grade: formData.grade
                });

                notification.success({
                    message: 'Student has been graded!',
                });
            }
        } catch (error) {
            console.error('Error adding new passed exam:', error);
        }
    };

    const columns = [
        {
            title: 'Exam',
            dataIndex: 'Name',
            key: 'Name',
            render: (text, record) => (
                <div>
                    <Avatar src={record.Image} />
                    <span>{`${record.Name} - ${record.examName}`}</span>
                </div>
            )
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
            render: (text, record) => (
                <Select
                    defaultValue=""
                    onChange={(value) => handleChange(value, record.courseId, record.ID)}
                    style={{ width: 100 }}
                >
                    {grades.map((grade, index) => (
                        <Option key={index} value={grade}>{grade}</Option>
                    ))}
                </Select>
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record) => (
                <Button
                    type="primary"
                    onClick={() => handleSubmit(record.courseId, record.UserId)}
                >
                    Add Grade
                </Button>
            )
        }
    ];

    return (
        <div className="container p-5">
            <Table
                dataSource={exams}
                columns={columns}
                rowKey="id"
                pagination={false}
            />
        </div>
    );
}

export default GradeManagement;
