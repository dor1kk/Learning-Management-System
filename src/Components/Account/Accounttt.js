import React, { useState, useEffect } from "react";
import axios from "axios";

function Account() {
    const [student, setStudents] = useState({});

    useEffect(() => {
        fetchStudentData();
    }, []);

    const fetchStudentData = () => {
        axios.get('http://localhost:8080/studentsa', { withCredentials: true })
            .then(response => {
                if (response.data && response.data.length > 0) {
                    setStudents(response.data[0]); 
                }
            })
            .catch(error => console.error('Error fetching student data:', error));
    };
    

    return (
        <div>
            <h2>User Profile</h2>
            <p>Name: {student.name}</p>
            <p>Grade: {student.grade}</p>
            <p>Title: {student.title}</p>
            <p>Image: {student.image}</p>
        </div>
    );
}

export default Account;
