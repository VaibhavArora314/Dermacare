import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

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
    <div>
      <h1>{profile.username}</h1>
      <p>{profile.email}</p>
      <p>{profile.dob}</p>
      <p>{profile.gender}</p>
      {profile.profilePicture && <img src={profile.profilePicture} alt="" />}
    </div>
  );
};

export default UserDetails;
