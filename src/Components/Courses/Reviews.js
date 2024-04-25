import React, { useState, useEffect } from "react";
import { Carousel, Card, Col, Row, Tag } from 'antd';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {  FaComment, FaStar } from "react-icons/fa";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const courseId = location.pathname.split('/').pop();  

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ratings/${courseId}`);
        setReviews(response.data.ratings);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [courseId]);

  return (
    <div>
      <Carousel 
        prevArrow={<LeftOutlined style={{ fontSize: '24px', color: '#1890ff', cursor: 'pointer' }} />}
        nextArrow={<RightOutlined style={{ fontSize: '24px', color: '#1890ff', cursor: 'pointer' }} />}
      >
        {reviews.map(review => (
          <div key={review.id}>
            <Card 
              title={ 
                <div>
                  <img src={review.Image} alt={review.studentName} style={{ marginRight: 8, width: 30, height: 30 }} />
                  {review.Name}
                </div>
              }
              bordered={false}
            >
              <p><strong><Tag color="orange"><FaStar /> Rating:</Tag></strong> {review.Rating}</p>
              <p><strong><Tag color="blue"><FaComment /> Comment:</Tag></strong> {review.Comment}</p>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Reviews;
