import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Lock } from '@mui/icons-material';

function CompletedLecturesPage({ completedLecturesCount, totalLecturesCount, courseName }) {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pathnameParts = location.pathname.split('/');
    const courseId = pathnameParts[pathnameParts.length - 1];

    const [completedLectures, setCompletedLectures] = useState([]);
    const [courseTitle, setCourseTitle] = useState('');
    const [courseImage, setCourseImage] = useState('');
    const [userId, setUserId] = useState('');

    const fetchAllLectures = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/lecturess/${courseId}`);
            setCompletedLectures(response.data);
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
        <div className="container p-5">
            <h4 className="text-center text-primary">Lectures for course: {courseTitle}</h4>
            <div className="row mt-4">
            {completedLectures.map((lecture, index) => {
    console.log(`Lecture ${index + 1} - isCompleted: ${lecture.isCompleted}`);
    return (
        <div key={lecture.lectureId} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="lect-card mb-3 d-flex flex-column justify-conent-center align-items-center" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.2)", height:"250px" }}>
                <div className="position-relative">
                    <h6 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', zIndex: 1 }}>
                        Lecture {index + 1}
                    </h6>
                    <img
                        className="card-img-top"
                        src={courseImage}
                        alt="Lecture"
                        style={{ filter: 'brightness(50%)' }}
                    />
                   
                </div>
                <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{marginTop:"-35px"}}>
                {lecture.isCompleted === 1 ? (
                        <Link to={`/home/lecture/${lecture.LectureID}?courseId=${courseId}`} style={{ textDecoration: 'none' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="green" style={{ marginTop: "40px" }}>
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                            </svg>
                        </Link>
                    ) : (
                        (index === 0 || completedLectures[index - 1].isCompleted === 1) ? (
                            <Link to={`/home/lecture/${lecture.LectureID}?courseId=${courseId}`} style={{ textDecoration: 'none' }}>
                                View Details
                            </Link>
                        ) : (
                            <Lock style={{ marginTop: "40px", color:"#00538C" }} />
                        )
                    )}
                {lecture.isCompleted === 1 && (

                    <p className="card-text">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M19 9h-1V7c0-1.1-.9-2-2-2H8C6.9 5 6 5.9 6 7v10c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2v-2h1c1.1 0 2-.9 2-2V11c0-1.1-.9-2-2-2zm-6 8H8V7h5v2h-3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h3v2zm4-8h-2V7h2v2z" />
                        </svg> {formatDate(lecture.completionDate)}
                    </p> )}
                    {lecture.isCompleted === 1 && (

                        <Link to={`/home/lecture/${lecture.LectureID}?courseId=${courseId}`} style={{ textDecoration: 'none' }}>
                            <span className="text-primary">View Details</span>
                        </Link>
                    )}
                     {lecture.isCompleted === 0 && (
                       ( <p className='text-primary'>Not completed yet</p>) )}
                </div>
            </div>
        </div>
    );
})}

            </div>
        </div>
    );
    
}

export default CompletedLecturesPage;
