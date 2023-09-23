import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CheckupCard = () => {
  return (
    <>
      <Grid container>
        <div className={`form-parent`}>
          <div>
            <Link to="/image">Get your Checkup Now</Link>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default CheckupCard;
