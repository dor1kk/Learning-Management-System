import React from 'react';
import './Courses.css'; // Import your custom CSS file
import { FaStar } from 'react-icons/fa';

const ReviewContainer = () => {
    return (
      <div className="review-container">
        <h4 className=''>Give This Course a Review</h4>
        <div className="rating">
          <label htmlFor="rating">Rating:</label>
          <div className="star-rating">
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea className="form-control" id="comment" rows="3" placeholder="Enter your comment"></textarea>
        </div>
        <button type="submit" className="btn btn-submit">Submit</button>
      </div>
    );
  }
  
  export default ReviewContainer;