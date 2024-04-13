import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, Divider } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';

function Lecture() {
    const { lectureId } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const courseId = searchParams.get('courseId');
    
    const [lecture, setLecture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [userid, setUserid] = useState('');

    useEffect(() => {
        fetchLecture();
        fetchUserId();
    }, [lectureId, courseId]);


    useEffect(() => {
        const fetchCompletedLectures = async () => {
            try {
                if (!userid) {
                    return;
                }
    
                const response = await axios.get(`http://localhost:8080/completed-lectures/${userid}/${courseId}`);
                setCompleted(response.data.includes(lectureId));
            } catch (error) {
                setError('Error fetching completed lectures');
            }
        };
    
        fetchCompletedLectures();
    }, [userid, courseId, lectureId]);
    


  

    const fetchLecture = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/specificlecture/${lectureId}`);
            setLecture(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching lecture');
            setLoading(false);
        }
    };

    const fetchUserId = async () => {
        try {
            const response = await axios.get('http://localhost:8080/userid');
            if (response.data.valid) {
                setUserid(response.data.userid);
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };

    const fetchCompletedLectures = async () => {
        try {
            if (!userid) {
                return;
            }

            const response = await axios.get(`http://localhost:8080/completed-lectures/${userid}/${courseId}`);
            setCompleted(response.data.includes(lectureId));
        } catch (error) {
            setError('Error fetching completed lectures');
        }
    };
    const handleCompleteLecture = async () => {
        if (!completed) {
            try {
                await axios.post('http://localhost:8080/completed-lectures', { lectureId: lectureId, courseId: courseId });
                // Update the completed state after the lecture is marked as completed
                setCompleted(true);
                // Fetch the updated list of completed lectures
                fetchCompletedLectures();
            } catch (error) {
                console.error('Error completing lecture:', error);
            }
        }
    };
    
    

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>{error}</Typography>;
    }

    return (
        <div style={{ width: '90%', margin: 'auto' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Lecture Details
            </Typography>
            <Card >
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {lecture.LectureTitle}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {lecture.LectureContent}
                    </Typography>
                    <img src={lecture.Image} alt="Lecture" style={{ width: '100%', margin: '20px 0', borderRadius: '5px' }} />
                    <Divider />
                    {completed ? (
                        <Typography variant="body1" style={{ color: 'green' }}>Completed</Typography>
                    ) : (
                        <button
                            onClick={handleCompleteLecture}
                            style={{ background: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            Complete Lecture
                        </button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default Lecture;
