import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddExam = ({ fetchExams }) => {
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/exams', formData);
      fetchExams();
      setFormData({
        courseId: '',
        examName: '',
        startTime: '',
        endTime: ''
      });
    } catch (error) {
      console.error('Error creating exam:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Exam</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="courseId" className="form-label">Select Course:</label>
          <select className="form-select" id="courseId" name="courseId" value={formData.courseId} onChange={handleChange}>
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.CourseID} value={course.CourseID}>{course.Title}</option>
            ))}
          </select>
        </div>
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
        <button type="submit" className="btn btn-primary">Add Exam</button>
      </form>
    </div>
  );
};

export default AddExam;
