import React from "react";
import "./Footer.scss";
import logo from "../assets/icons/logo.png";
import authentic from "../assets/icons/authentic.svg";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

function Footer() {
  return (
    <div className="footer-parent">
      <div className="logo-info">
        <div className="a1">
          <img
            src={logo}
            alt=""
            style={{
              transform: "scale(0.4)",
              borderRadius: "1rem",
              position: "relative",
            }}
          />
          <img
            src={authentic}
            alt="verified"
            style={{ transform: "scale(0.5)", position: "absolute" }}
          />
        </div>
      </div>
      <div className="dermacare-goal">
        <p className="desc">
          At Dermacare, we're dedicated to helping you achieve clear, radiant
          and glowing skin so you can live your life with confidence stress-free
        </p>
        <div className="a2">
          <p className="copyright">© 2023 Dermacare. All rights reserved.</p>
        </div>
      </div>
      <div className="email">
        <div className="b1">
          <p className="tagline">
            Our best skin & hair tips straight to your inbox!
          </p>
        </div>
        <div
          className="b2"
          style={{ position: "relative", display: "inline-block" }}
        >
          <input className="input" type="email" placeholder="Your email" />
          <ArrowRightAltIcon
            fontSize="large"
            style={{
              opacity: "0.8",
              position: "absolute",
              right: "10px",
              top: "20%",
              color: "black",
              // transform: "translateY(-50%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
