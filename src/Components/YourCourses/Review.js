import React, { useState } from 'react';
import { Rate, Button, Input } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const { TextArea } = Input;

const ReviewContainer = () => {
    const location=useLocation();
    const CourseId=location.pathname.split('/').pop();

    const[ratingData,setRatingData]=useState({
      courseId:CourseId,
      rating:"",
      comment:""
    })

    const handleChange = (value, name) => {
      setRatingData({ ...ratingData, [name]: value });
    };
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await axios.post("http://localhost:8080/addrating", {
              rating: ratingData.rating,
              comment: ratingData.comment,
              courseId: ratingData.courseId
          });
          setRatingData({
              ...ratingData,
              rating: "", 
              comment: "" 
          });
      } catch (error) {
          console.log('Error:', error);
      }
  };
  

    return (
        <div className="c-container p-5">
          <div className='mt-5'>
            <h4 className='text-primary'>Give This Course a Review</h4>
            <div className="rating">
                <label>Rating:</label>
                <Rate
                  name="rating"
                  onChange={(value) => handleChange(value, "rating")}
                  value={ratingData.rating}
                />

            </div>
            <div className="form-group">
                <label>Comment:</label>
                <TextArea
                  name="comment"
                  rows={3}
                  placeholder="Enter your comment"
                  onChange={(e) => handleChange(e.target.value, "comment")}
                  value={ratingData.comment}
/>
            </div>
            <Button type="primary" onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    );
}

export default ReviewContainer;
