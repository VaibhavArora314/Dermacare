import React, { useState } from "react";
import Grid from "@mui/material/Grid";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import "./login.scss";
export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <Grid container>
      <div className="form-parent">
        <div className="heading">
          <p>Log in</p>
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
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <label htmlFor="password">Password </label>
            <input placeholder="Enter your password" type="password" required />
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

        <button className="login-btn">Log In</button>
        <div className="signup">
          <p>Don't have an account?</p>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>
    </Grid>
  );
}
