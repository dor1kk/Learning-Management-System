import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Avatar, Select, Button, notification } from 'antd';
import { CheckOutlined } from '@ant-design/icons';


const { Option } = Select;

function GradeManagement() {
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

    const handleChange = (value) => {
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

    return (
        <div className="c-container p-5" style={{ textAlign: "center" }}>
            <h2 className='text-primary' style={{ fontWeight: "bold" }}>Grades</h2>

            <div className="row">
                <div className="col">
                    <List
                        dataSource={exams}
                        renderItem={exam => (
                            <List.Item
                            style={{ background: "white", padding: "10px", marginBottom: "10px", borderRadius: "8px", boxShadow:"0 2px 6px rgba(0,0,0,0.1)" }}

                                key={exam.id}
                                actions={[
                                    <Select
                                        defaultValue=""
                                        onChange={handleChange}
                                        style={{ width: 100 }}
                                    >
                                        {grades.map((grade, index) => (
                                            <Option key={index} value={grade}>{grade}</Option>
                                        ))}
                                    </Select>,
                                    <Button
                                        type="primary"
                                        onClick={() => handleSubmit(exam.courseId, exam.ID)}
                                    >
                                        Add Grade
                                    </Button>
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={exam.Image} />}
                                    title={`${exam.Name} - ${exam.examName}`}
                                    description={`Score: ${exam.score}`}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default GradeManagement;
