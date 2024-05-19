import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Typography } from 'antd';
import { FaGlobe, FaStar } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AnalyticsPage = () => {
  const [pageLoadTime, setPageLoadTime] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [userReviewsByCountry, setUserReviewsByCountry] = useState([]);

  useEffect(() => {
    const measurePageLoadTime = () => {
      const navigationStart = performance.timing.navigationStart;
      const loadTime = performance.now() - navigationStart;
      setPageLoadTime(loadTime.toFixed(2)); 
    };

    measurePageLoadTime();

    const simulatedAverageRating = Math.floor(Math.random() * 5) + 1; // Random number between 1 and 5
    setAverageRating(simulatedAverageRating);

    const simulatedReviewsByCountry = [
      { country: 'USA', positiveReviews: 100, negativeReviews: 20 },
      { country: 'UK', positiveReviews: 80, negativeReviews: 15 },
      { country: 'Germany', positiveReviews: 120, negativeReviews: 30 },
    ];
    setUserReviewsByCountry(simulatedReviewsByCountry);
  }, []); // Empty dependency array to run effect only once on component mount

  return (
    <main className='analytics-container'>
      <Row gutter={[16, 16]} className='main-stats'>
        <Col xs={24} sm={12} md={8}>
          <Card className='stats-card' hoverable>
            <Statistic title="Page Load Time (ms)" value={pageLoadTime !== null ? pageLoadTime : 'Loading...'} prefix={<FaGlobe />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className='stats-card' hoverable>
            <Statistic title="Average Rating" value={averageRating} prefix={<FaStar />} precision={1} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className='analytics-charts'>
        <Col xs={24} lg={12}>
          <Card className='chart-card' title="User Reviews by Country">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userReviewsByCountry}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="positiveReviews" stroke="#2774AE" name="Positive Reviews" />
                <Line type="monotone" dataKey="negativeReviews" stroke="#FF6347" name="Negative Reviews" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </main>
  );
};

export default AnalyticsPage;
