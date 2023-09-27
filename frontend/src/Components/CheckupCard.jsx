import { Box, Grid, Button } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CheckupCard = () => {
  const { username } = useContext(AuthContext);

  return (
    <>
      <Grid container>
        <div className={`form-parent`}>
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

            <p>Why choose DermaCare?</p>
            <ul>
              <li>Accurate and quick diagnosis of skin conditions</li>
              <li>Personalized treatment plans tailored to your needs</li>
              <li>Access to a network of experienced dermatologists</li>
              <li>Track your skin health progress with our app</li>
            </ul>
            <p>Ready to get started?</p>
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
