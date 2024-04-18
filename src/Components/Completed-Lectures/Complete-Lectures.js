import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Box } from '@mui/material';
import { DateRange, Done } from '@mui/icons-material'; // Import the Done icon
import { Link , useLocation} from 'react-router-dom';

function CompletedLecturesPage({ completedLecturesCount, totalLecturesCount, courseName }) {
    const completionPercentage = totalLecturesCount > 0 ? (completedLecturesCount / totalLecturesCount) * 100 : 0;

  

    const location = useLocation();
    console.log("Location:", location);
    
    const searchParams = new URLSearchParams(location.search);
    const pathnameParts = location.pathname.split('/');
    const courseId = pathnameParts[pathnameParts.length - 1];
    console.log("Course ID from URL:", courseId);
    

    
    

    const [completedLectures, setCompletedLectures] = useState([]);
    const [courseTitle, setCourseTitle] = useState('');
    const [courseImage, setCourseImage] = useState('');
    const [userId,setUserId]=useState("");
    const [lectures, setLectures]=useState([]); 

    const fetchAllLectures = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/lectures/${courseId}`);
            setLectures(response.data);
        } catch (error) {
            console.error('Error fetching all lectures:', error);
        }
    };

    const fetchUserId = async () => {
        try {
            const response = await axios.get('http://localhost:8080/userid');
            if (response.data.valid) {
                setUserId(response.data.userid);
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };
    
    useEffect(() => {
        console.log("Course ID from URL:", courseId);
        fetchAllLectures();
        fetchCourseTitle();
        fetchUserId();
    }, []);
    
    

    const fetchCourseTitle = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/courses/${courseId}`);
            setCourseTitle(response.data.Title);
            setCourseImage(response.data.Image);
        } catch (error) {
            console.error('Error fetching course title:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit"
        });
      };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Lectures for Course: {courseTitle}
            </Typography>
            <Grid container spacing={3}>
                {lectures.map((lecture, index) => (
                    <Grid key={lecture.lectureId} item xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <Box position="relative">
                                <Typography variant="h6" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', zIndex: 1 }}>
                                    Lecture {index + 1}
                                </Typography>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={courseImage}
                                    alt="Lecture"
                                    style={{ filter: 'brightness(50%)' }}
                                />
                               
                            </Box>
                            <CardContent>
                                <Typography style={{ width: "220px" }} variant="body1" component="h2" gutterBottom>
                                    {lecture.Title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <DateRange /> {formatDate(lecture.completionDate)}
                                </Typography>
                                <Typography>
                                    <Link to={`/home/lecture/${lecture.LectureID}?courseId=${courseId}`} style={{ textDecoration: 'none' }}>
                                        <Typography variant="body2" color="primary">
                                            View Details
                                        </Typography>
                                    </Link>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

          
        </Container>
    );
}

export default CompletedLecturesPage;
