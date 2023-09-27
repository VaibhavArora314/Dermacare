import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import "./login.scss";
import axios from "axios";
import Signup from "./Signup";
import { AuthContext } from "../context/AuthContext";

export default function Login({ setLoading }) {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setsignup] = useState(false);
  const [error, seterror] = useState(false);
  const [isflipped, setisflipped] = useState();
  const { login: setDetails } = useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Create an object with email and password
      const data = {
        email,
        password,
      };

      // Replace 'your_api_endpoint' with the actual API endpoint you want to send the data to
      const response = await axios.post(
        "http://localhost:5000/api/login",
        data
      );

      setDetails(response?.data?.token, response?.data?.username);

      // Handle the API response here, e.g., set user authentication, redirect, etc.
      console.log("API Response:", response); // You can log the response for debugging
    } catch (error) {
      console.error("Login failed:", error);
      seterror(true);
    }

    setLoading(false);
  };

  console.log(email);
  return !signup ? (
    <>
      <Grid container>
        <div className={`form-parent ${isflipped ? "flip-signup-card" : ""}`}>
          <div className="heading">
            <p>
              Log in{" "}
              {error ? (
                <span
                  style={{
                    fontWeight: 400,
                    fontSize: "0.7em",
                    color: "red",
                  }}
                >
                  {" "}
                  * user not registered kindly signup
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
          <div className="row row-1">
            <div className="input-field">
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
          <div className="row ">
            <div className="input-field">
              <label htmlFor="title">Email </label>
              <input
                placeholder="Enter your email address"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
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
                onChange={(e) => setPassword(e.target.value)}
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
            <button className="signup-btn" onClick={() => setsignup(!signup)}>
              Sign Up
            </button>
          </div>
        </div>
      </Grid>
    </>
  ) : (
    !isflipped && <Signup setLoading={setLoading} />
  );
}
