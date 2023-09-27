import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./login.scss";
import { AuthContext } from "../context/AuthContext";
import Login from "./Login";

export default function Signup({ setLoading }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [signup, setsignup] = useState(false);
  const [dob, setDob] = useState(null); // Initialize dob as null
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const { login: setToken } = useContext(AuthContext);
  const [uploadedFileName, setUploadedFileName] = useState();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("gender", gender);
      formData.append("dob", dob);
      formData.append("profilePicture", profilePhoto);

      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );

      // localStorage.setItem("token", response?.data?.token);
      setToken(response?.data?.token, response?.data?.username);

      console.log("API Response:", response);
      setsignup(false);
      setIsFlipped(true);
    } catch (error) {
      console.error("Registration failed:", error);
    }
    setLoading(false);
  };

  const handleImageChange = (event) => {
    const img = event.target.files[0]; // Get the first selected file

    if (img) {
      setProfilePhoto(img);
      setUploadedFileName(img.name);
    }
  };

  return !signup ? (
    <Grid container>
      <div
        className={`form-parent signup-parent ${
          isFlipped ? "flip-signup-card" : ""
        }`}
      >
        {isFlipped ? (
          <Login />
        ) : (
          <>
            <div className="heading">
              <p>Sign Up</p>
            </div>
            {/* <div className="row-1"> */}
            {/* Google OAuth provider and login button */}
            {/* Add GoogleOAuthProvider and GoogleLogin components here */}
            {/* </div> */}
            <div
              className="signup-row"
              style={{
                // borderBottom: "1.5px solid black",
                padding: "0.5rem",
              }}
            >
              {/* Your form fields */}
              <div className="row signup-field">
                <label htmlFor="name">Name </label>
                <input
                  placeholder="Enter your Name"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="row signup-field">
                <label htmlFor="dob">DOB</label>
                <DatePicker
                  id="dob"
                  dateFormat="yyyy-MM-dd"
                  selected={dob}
                  placeholderText="Select"
                  showYearDropdown
                  showMonthDropdown
                  scrollableYearDropdown
                  scrollableMonthYearDropdown
                  yearDropdownItemNumber={60}
                  onChange={(date) => setDob(date)} // Use date instead of dob
                  required
                />
              </div>
              <div className="row  signup-field">
                <label htmlFor="gender">Gender </label>
                <select
                  name="gender"
                  id="gender"
                  onChange={(e) => setGender(e.target.value)}
                  required
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
                  placeholder="Enter your password"
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
                  {!uploadedFileName ? <>Upload Image</> : uploadedFileName}
                </p>
              </div>
            </div>
            <button onClick={handleRegister} className="login-btn">
              Register
            </button>
            <div className="signup">
              <p>Already have an account ?</p>

              <button className="signup-btn" onClick={() => setsignup(!signup)}>
                Log In
              </button>
            </div>
          </>
        )}
      </div>
    </Grid>
  ) : (
    <Login />
  );
}
