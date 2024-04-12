import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Divider, Button, Card, CardContent } from '@mui/material';
import { ExpandMore, ExpandLess, Done } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import "./Lectures.css"

function Lectures() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const courseId = searchParams.get('courseId');
    
 
    const [lectures, setLectures] = useState([]);
    const [userid, setUserid] = useState('');
    const [selectedLecture, setSelectedLecture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [completedLectures, setCompletedLectures] = useState([]);

    useEffect(() => {
        fetchLectures();
        fetchUserId();
    }, [courseId]);
    

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

    const fetchLectures = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/lectures/${courseId}`);
            setLectures(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching lectures');
            setLoading(false);
        }
    };

    const fetchCompletedLectures = async () => {
        try {
            if (!userid) {
                return;
            }

            const response = await axios.get(`http://localhost:8080/completed-lectures/${userid}/${courseId}`);
            setCompletedLectures(response.data);
        } catch (error) {
            setError('Error fetching completed lectures');
        }
    };

    useEffect(() => {
        fetchCompletedLectures();
    }, [userid, courseId]);

    const handleLectureClick = (lectureID) => {
        setSelectedLecture(selectedLecture === lectureID ? null : lectureID);
    };
    const handleCompleteLecture = async (lectureID) => {
        if (!completedLectures.includes(lectureID)) {
            try {
                await axios.post('http://localhost:8080/completed-lectures', { lectureId: lectureID, courseId: courseId });
                setCompletedLectures(prevCompletedLectures => [...prevCompletedLectures, lectureID]);
            } catch (error) {
                console.error('Error completing lecture:', error);
            }
        }
    };
    

    const isLectureCompleted = (lectureID) => completedLectures.includes(lectureID);

    const filteredLectures = lectures.filter(lecture =>
        lecture.LectureTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="lectures-container" style={{ width: '90%', margin: 'auto' }}>
            <List>
                {loading && <Typography>Loading...</Typography>}
                {error && <Typography>{error}</Typography>}
                {!loading && !error && filteredLectures.map((lecture, index) => (
                    <ListItem key={lecture.LectureID} style={{ marginBottom: '20px' }} button onClick={() => handleLectureClick(lecture.LectureID)}>
                        <img src={lecture.Image} alt="Course" style={{ width: '100px', height: 'auto', marginRight: '20px' }} />
                        <ListItemText
                            primary={lecture.LectureTitle}
                            secondary={selectedLecture === lecture.LectureID ? `Description: ${lecture.LectureContent}` : null}
                        />
                        {selectedLecture === lecture.LectureID ? <ExpandLess /> : <ExpandMore />}
                        {isLectureCompleted(lecture.LectureID) && <Done style={{color:"green"}} />}
                        {selectedLecture === lecture.LectureID && (
                            <CardContent>
                                <Divider />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Done />}
                                    onClick={() => handleCompleteLecture(lecture.LectureID)}
                                    disabled={isLectureCompleted(lecture.LectureID)}
                                >
                                    Complete
                                </Button>
                            </CardContent>
                        )}
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default Lectures;
