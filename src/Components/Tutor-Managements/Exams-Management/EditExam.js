import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const EditExam = ({ fetchExams }) => {
  const location = useLocation();
  const examId = location.pathname.split('/').pop(); // Extract examId from URL
  const [formData, setFormData] = useState({
    examId: examId,
    courseId: '',
    examName: '',
    startTime: '',
    endTime: ''
  });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tutorcourses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching tutor courses:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/exams/${examId}`, formData);
    } catch (error) {
      console.error('Error editing exam:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Exam</h2>
      <form onSubmit={handleEdit}>
       
        <div className="mb-3">
          <label htmlFor="examName" className="form-label">Exam Name:</label>
          <input type="text" className="form-control" id="examName" name="examName" value={formData.examName} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="startTime" className="form-label">Start Time:</label>
          <input type="datetime-local" className="form-control" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="endTime" className="form-label">End Time:</label>
          <input type="datetime-local" className="form-control" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditExam;
