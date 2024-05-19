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
import { toPng } from 'html-to-image'; // Corrected import statement
import { Height } from '@mui/icons-material';

const { Title, Paragraph } = Typography;

const CertificatePage = () => {
  const location = useLocation();
  const courseId = location.pathname.split('/')[3];

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

  const downloadCertificate = () => {
    const cardElement = document.getElementById('cert-container');
    toPng(cardElement) 
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'certificate.png';
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <div id='cert-container' className='c-container p-3' style={{height:"85vh"}}>
      <Card className='c-container' style={{ width: '100%', height:"90%", marginTop:"50px" }}>
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
              <Title level={3}><UserOutlined className='text-primary' style={{ marginRight: "5px" }} />{course.Name}</Title>
              <Paragraph>
                {course.studentName} has successfully<Tag color='green'>completed</Tag>the course
              </Paragraph>
              <Title level={3}><BookOutlined className='text-primary' style={{ marginRight: "6px" }} />{course.Title} </Title>
              <Paragraph>
                on <CalendarOutlined /> <Tag color='orange'>{formatDate(course.CompletionDate)}</Tag>
              </Paragraph>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Button type="primary" size="default" onClick={downloadCertificate}>
            <CheckOutlined /> Download Certificate
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CertificatePage;
