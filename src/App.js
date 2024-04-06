import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./Components/Signin/Signin";
import Sidebaar from "./Sidebaar";
import { Dashboard } from "@mui/icons-material";
import PrivateRoute from "./PrivateRoute";
import Signup from "./Components/Signin/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path='/signup' element={<Signup />}></Route>
        <Route path="/home/*" element={<PrivateRoute />} />
        <Route path="/" element={<Signin />} />
      </Routes>
    </Router>
  );
};



export default App;
