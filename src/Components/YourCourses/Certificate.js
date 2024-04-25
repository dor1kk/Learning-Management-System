import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, Tag } from 'antd';
import {
  TrophyOutlined,
  CalendarOutlined,
  UserOutlined,
  BookOutlined,
  CheckOutlined
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; 

const { Title, Paragraph } = Typography;

const CertificatePage = () => {
  const location = useLocation();
  const courseId = location.pathname.split('/')[3];

  console.log("course id ", courseId);

  const [completedCourseData, setCompletedCourseData] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const fetchCompletedCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/completedcoursesbyid', {
        params: { courseId: courseId } // Send courseId as a query parameter
      });
      setCompletedCourseData(response.data.results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedCourses();
  }, []); 
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    });
  };


  return (
    <div className='cert-container'>
      <Card style={{ width: '600px', margin: 'auto', marginTop: '20px', boxShadow:"0 2px 6px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: 'center' }}>
          <TrophyOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
          <Title level={2}>Certificate of Completion</Title>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {completedCourseData.map(course => (
            <div key={course.CompletedCourseID}> 
              <Paragraph>
                This is to <Tag color="blue">certify that</Tag>
              </Paragraph>
              <Title level={3}><UserOutlined className='text-primary' style={{marginRight:"5px"}} />{course.Name}</Title>
              <Paragraph>
                {course.studentName} has successfully<Tag color='green'>completed</Tag>the course 
              </Paragraph>
              <Title level={3}><BookOutlined className='text-primary' style={{marginRight:"6px"}} />{course.Title} </Title>
              <Paragraph>
                on <CalendarOutlined /> <Tag color='orange'>{formatDate(course.CompletionDate)}</Tag>
              </Paragraph>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Button type="primary" size="default">
            <CheckOutlined /> Download Certificate
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CertificatePage;
