import axios from "axios";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/profile");
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
