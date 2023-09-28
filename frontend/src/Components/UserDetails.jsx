import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Avatar, Box } from "@mui/material";

const UserDetails = () => {
  const [profile, setProfile] = useState(null);
  const { token } = useContext(AuthContext);

  const getProfile = async () => {
    try {
      const config = {
        headers: {
          token, // Replace 'your_token_value_here' with the actual token value you want to send.
        },
      };

      const res = await axios.get(
        "http://localhost:5000/api/user/profile",
        config
      );
      //   console.log(res);
      setProfile(res.data.user);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    getProfile();
  }, [token]);

  if (!profile) return null;

  return (
    <Box
      sx={{
        display: "flex",
        width: 0.75,
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2rem",
        margin: "0rem 8rem ",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 0px 7px -3px",
      }}
    >
      <Box
        sx={{
          flexDirection: "column",
          fontFamily: "poppins",
        }}
      >
        <h2>
          <b>Username:</b> <i>{profile.username}</i>
        </h2>
        <p>
          <b>Email:</b> {profile.email}
        </p>
        <p>
          <b>DOB:</b> {profile.dob.substring(0, 10)}
        </p>
        <p>
          <b>Gender:</b> {profile.gender}
        </p>
      </Box>
      {profile.profilePicture ? (
        <Avatar
          alt={profile.username}
          src={profile.profilePicture}
          sx={{
            width: 130,
            height: 130,
            borderRadius: "50%",
            border: "4px outset black",
            padding: "2rem",
            backgroundSize: "cover",
          }}
        />
      ) : (
        <Avatar
          sx={{
            bgcolor: "#038c13",
            width: 100,
            height: 100,
            fontSize: 75,
            borderRadius: "50%",
          }}
        >
          {profile.username[0]}
        </Avatar>
      )}
    </Box>
  );
};

export default UserDetails;
