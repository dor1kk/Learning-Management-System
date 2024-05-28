import React, { useState, useEffect } from 'react';
import { Rate, Button, Input, Modal } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const ReviewModal = ({ visible, onClose, courseId }) => {
  const [ratingData, setRatingData] = useState({
    courseId: courseId,
    rating: "",
    comment: ""
  });

  useEffect(() => {
    setRatingData({
      courseId: courseId,
      rating: "",
      comment: ""
    });
  }, [courseId, visible]);

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
        courseId: courseId,
        rating: "",
        comment: ""
      });
      onClose(); // Close the modal on successful submission
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <Modal
      title="Give This Course a Review"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
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
    </Modal>
  );
};

export default ReviewModal;
