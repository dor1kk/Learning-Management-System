
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {


  return (
    <footer className='d-flex flex-row justify-content-center align-items-center' style={{ backgroundColor:"white",gap:"7px", color:"black",boxShadow:"0 2px 6px rgba(0,0,0,0.4)",  height:"10vh" }}>
                    &copy; {new Date().getFullYear()} by <Link color="inherit" href="#">Grupi Lab 1 Ubt</Link> | all rights reserved!
    </footer>
  );
};

export default Footer;

