import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios"; // Import Axios
import "./login.scss";

export default function Login() {
  const [email, setEmail] = useState(""); // State to store email
  const [password, setPassword] = useState(""); // State to store password
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      // Create an object with email and password
      const data = {
        email,
        password,
      };

      // Replace 'your_api_endpoint' with the actual API endpoint you want to send the data to
      const response = await axios.post("http://localhost:5000/api/login", data);

      // Handle the API response here, e.g., set user authentication, redirect, etc.
      console.log("API Response:", response); // You can log the response for debugging

    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Grid container>
      <div className="form-parent">
        <div className="heading">
          <p>Log in</p>
        </div>
        <div className="row row-1">
          {/* ... (your Google OAuth code) */}
        </div>
        <div className="row ">
          <div className="input-field">
            <label htmlFor="title">Email </label>
            <input
              placeholder="Enter your email address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <label htmlFor="password">Password </label>
            <input
              placeholder="Enter your password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
          </div>
        </div>
        <div className="row">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember Me
          </label>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Log In
        </button>
        <div className="signup">
          <p>Don't have an account?</p>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>
    </Grid>
  );
}
