import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const { getToken } = useContext(AuthContext);

  const getProfile = async () => {
    try {
      const config = {
        headers: {
          token: getToken(), // Replace 'your_token_value_here' with the actual token value you want to send.
        },
      };

      const res = await axios.get(
        "http://localhost:5000/api/user/profile",
        config
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return <div>Profile</div>;
};

export default ProfilePage;
