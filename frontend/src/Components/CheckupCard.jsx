import { Box, Grid, Button } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Procedure from "./Procedure";

const CheckupCard = () => {
  const { username } = useContext(AuthContext);

  return (
    <>
      <Grid container>
        <div className="form-parent" style={{ width: "35%" }}>
          <Box display="flex" sx={{ flexDirection: "column" }}>
            <h4 style={{ marginBottom: 0 }}>Hi, {username}</h4>
            <p>
              Welcome to DermaCare, your one-stop solution for all skin
              diseases. We use the latest AI technologies to detect skin
              diseases and provide the best suggestions for curing them. Whether
              you have a specific skin concern or just want to ensure your
              skin's health, DermaCare is here to help. Start your checkup now
              and take the first step towards healthier skin.
            </p>

            <p style={{ marginBottom: 1 }}>Why choose DermaCare?</p>
            <ul style={{ marginBottom: 1 }}>
              <li>Accurate and quick diagnosis of skin conditions</li>
              <li>Personalized treatment plans tailored to your needs</li>
              {/* <li>Access to a network of experienced dermatologists</li>
              <li>Track your skin health progress with our app</li> */}
            </ul>

            {/* <p>Ready to get started?</p> */}

            <button
              style={{
                display: "flex",
                justifyContent: "end",
                background: "transparent",
                border: "none",
                textDecoration: "underline",
                color: "blue",
                fontFamily: "poppins",
                margin: "1rem",
                fontSize: "0.9em",
              }}
              onClick={(e) => {
                const procedureSection =
                  document.querySelector(".procedure-section");
                if (procedureSection) {
                  procedureSection.scrollIntoView({ behavior: "smooth" }); // Scroll to the Procedure section smoothly.
                }
              }}
            >
              How to Upload
            </button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/image"
            >
              Get Your Checkup
            </Button>
            {/* <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/image"
            >
              Start Your Journey
            </Button> */}
          </Box>
        </div>
      </Grid>
    </>
  );
};

export default CheckupCard;
