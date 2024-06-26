import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signin/Signup";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "./UnAuthorized";
import axios from "axios";

const App = () => {

  
  axios.defaults.withCredentials = true;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const res = await axios.get("http://localhost:8080/userid", { withCredentials: true });
        setIsLoggedIn(res.data.valid);
      } catch (error) {
        console.error("Error checking logged in status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedInStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>

        <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path='/signup' element={<Signup />}></Route>
        <Route path="/home/*" element={<PrivateRoute isLoggedIn={isLoggedIn} />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/signin" />} />
        </Routes>
   
    </Router>
  );
};

export default App;
