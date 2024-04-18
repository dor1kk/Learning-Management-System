import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Sidebaar from "./Sidebaar";

const AuthenticatedSidebar = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/') 
      .then(res => {
        if (res.data.valid) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          window.location.href="/signin"
        }
      })
      .catch(err => console.log(err));
  }, []);

  return isLoggedIn ? <Sidebaar>{children}</Sidebaar> : null;
};

export default AuthenticatedSidebar;
