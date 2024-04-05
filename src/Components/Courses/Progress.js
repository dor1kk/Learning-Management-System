import React from 'react';
import PropTypes from 'prop-types';
import './Courses.css'; 

const CourseProgress = ({ currentProgress, totalLessons }) => {
  const progressPercentage = (currentProgress / totalLessons) * 100;

  return (
    <div className="course-progress p-4 " style={{width:"320px", backgroundColor:" #f8f9fa", boxShadow:"0 2px 6px rgba(0,0,0,0.1)"}}>
      <h3>Course Progress</h3>
      <div className="progress">
        <div className="progress-bar" role="progressbar" style={{ width: `${progressPercentage}%` }} aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100">
          {`${progressPercentage.toFixed(2)}%`}
        </div>
      </div>
      <p>{`Completed ${currentProgress} out of ${totalLessons} lessons`}</p>
      <div className='d-flex flex-column mt-3' style={{gap:"10px"}}>
      <button className='btn btn-primary text-white'>Continue Learning</button>
      <button className='btn btn-light text-primary border-primary'>Continue Learning</button>
        </div>

        <p className='w-100 mt-4'>You have enrolled on this course on <span className='text-info'>3 April 2024</span></p>
    </div>
  );
};

CourseProgress.propTypes = {
  currentProgress: PropTypes.number.isRequired,
  totalLessons: PropTypes.number.isRequired, // Define the propType for totalLessons
};

export default CourseProgress;
