import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

    const handleCompleteLecture = async () => {
        if (!completed) {
            try {
                await axios.post('http://localhost:8080/completed-lectures', { lectureId: lectureId, courseId: courseId });
                setCompleted(true);
            } catch (error) {
                console.error('Error completing lecture:', error);
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container p-4 ">
            <div className="lecture-card">
                <div className="lecture-card-body">
                    <h5 className="card-title text-primary" style={{fontSize:"29px"}}>{lecture.LectureTitle}</h5>
                    <p className="card-text">{lecture.LectureContent}</p>
                    <img src={lecture.Image} alt="Lecture" className="img-fluid mb-3" style={{ borderRadius: '5px' }} />
                    <hr />
                    {completed ? (
                        <p className="card-text" style={{ color: 'green' }}>Completed</p>
                    ) : (
                        <button
                            onClick={handleCompleteLecture}
                            className="btn btn-primary"
                        >
                            Complete Lecture
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Lecture;
