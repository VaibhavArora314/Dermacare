import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import "./login.scss";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Login from "./Login";

export default function Signup() {
  const [username, setname] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setgender] = useState();
  const [signup, setsignup] = useState(false);
  const [dob, setdob] = useState();
  const [profilePhoto, setprofilePhoto] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleRegister = async () => {
    setIsFlipped(!isFlipped);
    try {
      // Create an object with email and password
      const data = {
        username,
        dob,
        gender,
        email,
        password,
        profilePhoto,
      };

      // Replace 'your_api_endpoint' with the actual API endpoint you want to send the data to
      const response = await axios.post(
        "http://localhost:5000/api/register",
        data
      );

      // Handle the API response here, e.g., set user authentication, redirect, etc.
      console.log("API Response:", response); // You can log the response for debugging
      setsignup(false);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleImageChange = (event) => {
    let img = event.target.files && event.target.files[0];

    if (img) {
      const imageUrl = URL.createObjectURL(img);

      setprofilePhoto(imageUrl);
    }
  };
  console.log(profilePhoto);
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 60;
  const maxYear = currentYear;
  console.log(email);

  return !signup ? (
    <>
      <Grid container>
        <div
          className={`form-parent signup-parent ${
            isFlipped ? "flip-signup-card" : ""
          }`}
        >
          <div className="heading">
            <p>Sign Up</p>
          </div>
          <div className="row-1">
            <div className="signup-field">
              <GoogleOAuthProvider clientId="521618851477-ge9n1u2p7sdp5m4aklj4i6lso0gob5ru.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const details = jwt_decode(credentialResponse.credential);
                    console.log(details);
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  className="Google-btn"
                />
              </GoogleOAuthProvider>
            </div>
          </div>
          <div
            className="signup-row"
            style={{ borderBottom: "1.5px solid black", padding: "0.5rem" }}
          >
            <div className=" row signup-field">
              <label htmlFor="name">Name </label>
              <input
                placeholder="Enter your Name"
                type="email"
                onChange={(e) => setname(e.target.value)}
                required
              />
            </div>
            <div className="row signup-field">
              <label htmlFor="dob">Dob</label>
              <DatePicker
                id="dob"
                dateFormat="yyyy-MM-dd"
                selected={dob}
                placeholderText="Select a date"
                showYearDropdown
                showMonthDropdown
                scrollableYearDropdown
                scrollableMonthYearDropdown
                yearDropdownItemNumber={60} // Number of years displayed in the dropdown
                minDate={new Date(minYear, 0, 1)} // January 1st of the minimum year
                maxDate={new Date(maxYear, 11, 31)}
                onChange={(dob) => {
                  console.log("Selected Date:", dob);

                  setdob(dob);
                }}
                required
              />
            </div>
            <div className="row  signup-field">
              <label htmlFor="gender">Gender </label>
              <select
                name="gender"
                id="gender"
                onChange={(e) => setgender(e.target.value)}
              >
                <option value="default">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Dont say">Prefer Not Say</option>
              </select>
            </div>
            <div className="row  signup-field">
              <label htmlFor="email">Email</label>
              <input
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>
            <div className="row  signup-field">
              <label htmlFor="password">Password </label>
              <input
                placeholder="Enter your email address"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="row  signup-field">
              <label htmlFor="photo">Profile Photo</label>
              <input
                type="file"
                id="prof-photo"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
                style={{ display: "none" }}
                required
              />
              <p
                className="custom-upload-pic"
                onClick={() => document.getElementById("prof-photo").click()}
              >
                Upload Image
              </p>
            </div>
          </div>
          <button className="login-btn" onClick={handleRegister}>
            Register
          </button>
        </div>
      </Grid>
    </>
  ) : (
    !isFlipped && <Login />
  );
}
