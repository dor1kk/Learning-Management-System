import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function GradeManagement() {
    const [exams, setExams] = useState([]);
    const [grades, setGrades] = useState([]);
    const [formData, setFormData] = useState({
        grade: ""
    });
    const [submittedIds, setSubmittedIds] = useState(() => {
        // Load submitted IDs from local storage on component mount
        const submittedIdsFromStorage = localStorage.getItem('submittedIds');
        return submittedIdsFromStorage ? JSON.parse(submittedIdsFromStorage) : [];
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event, courseId, userId) => {
        event.preventDefault();
        
        try {
            await axios.post('http://localhost:8080/completedcourses', {
                courseId: courseId,
                userId: userId,
                grade: formData.grade
            });
            
            // Filter out the graded student from exams
            const updatedExams = exams.filter(exam => exam.ID !== userId);
            setExams(updatedExams);

            // Update submitted IDs only if the user is not already submitted
            if (!submittedIds.includes(userId)) {
                const updatedSubmittedIds = [...submittedIds, userId];
                setSubmittedIds(updatedSubmittedIds);
                localStorage.setItem('submittedIds', JSON.stringify(updatedSubmittedIds));
            }
        } catch (error) {
            console.error('Error adding new passed exam:', error);
        }
    };
    
    return (
        <div className="exam-container" style={{ textAlign: "center" }}>
            <h2 className='text-primary' style={{ fontWeight: "bold" }}>Grades</h2>

            <div className="row">
                <div className="col">
                    <ul className="list-group mt-3">
                        {exams.map((exam, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center mt-2">
                                <img src={exam.Image} style={{ width: "70px", height: "70px", borderRadius: "50%" }} alt="student" />
                                {exam.Name} - {exam.examName} - Score: {exam.score}
                                <div className='d-flex align-items-center'>
                                    {submittedIds.includes(exam.ID) ? (
                                        <p>Graded</p>
                                    ) : (
                                        <>
                                            <select onChange={handleChange} className="form-select" style={{ width: "65px", marginRight: "20px" }} name="grade">
                                                {grades.map((grade, index) => (
                                                    <option key={index} value={grade}>{grade}</option>
                                                ))}
                                            </select>
                                            <button className='btn btn-primary' onClick={(event) => handleSubmit(event, exam.courseId, exam.ID)}>Add Grade</button>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default GradeManagement;
