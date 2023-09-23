import React, { useContext } from "react";
import "../assets/css/Homepage.scss";
import Login from "../Components/Login";
import { AuthContext } from "../context/AuthContext";

// import bgi from "../assets/icons/mainBG.png";
function Homepage() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <div className="parent">{!isLoggedIn && <Login />}</div>
    </>
  );
}

export default Homepage;