import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Loader({ message, color }) {
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
      <p style={{ color: color ? color : "initial", zIndex: 100 }}>
        {message ? message : "Loading..."}
      </p>
      {/* Add your message here */}
    </div>
  );
}

export default Loader;
