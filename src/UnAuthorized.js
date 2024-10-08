import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={  <Link to='/' Classname='btn btn-primary'>Go Back Home</Link>}
    />
  );
};

export default Unauthorized;
