import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Avatar, Box } from "@mui/material";
import { green } from "@mui/material/colors";

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
        marginLeft: 10,
        marginRight: 10,
        marginTop: 2,
      }}
    >
      <Box sx={{ flexDirection: "column" }}>
        <h2>{profile.username}</h2>
        <p>{profile.email}</p>
        <p>{profile.dob}</p>
        <p>{profile.gender}</p>
      </Box>
      {profile.profilePicture ? (
        <Avatar
          alt={profile.username}
          src={profile.profilePicture}
          sx={{ width: 100, height: 100 }}
        />
      ) : (
        <Avatar
          sx={{
            bgcolor: "#038c13",
            width: 100,
            height: 100,
            fontSize: 75,
          }}
        >
          {profile.username[0]}
        </Avatar>
      )}
    </Box>
  );
};

export default UserDetails;