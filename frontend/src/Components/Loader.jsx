import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Loader({ message }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
      <p>{message ? message : "Loading..."}</p> {/* Add your message here */}
    </div>
  );
}

export default Loader;
