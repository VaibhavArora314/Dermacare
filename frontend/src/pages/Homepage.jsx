import React, { useContext, useState } from "react";
import "../assets/css/Homepage.scss";
import Login from "../Components/Login";

import { AuthContext } from "../context/AuthContext";
import CheckupCard from "../Components/CheckupCard";
import Procedure from "../Components/Procedure";
import CommonDiseases from "../Components/CommonDiseases";
import Loader from "../Components/Loader";
import FAQ from "../Components/FAQ";
// import bgi from "../assets/icons/mainBG.png";
function Homepage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // if (loading) return <Loader message={"Validating credentials..."} />;

  return (
    <>
      <div className="parent">
        {!isLoggedIn ? (
          !loading ? (
            <Login setLoading={setLoading} />
          ) : (
            <Loader message={"Verifying credentials..."} />
          )
        ) : (
          <CheckupCard />
        )}
        {}
      </div>
      {/* <div> */}
      <div className="procedure-section">
        <Procedure />
      </div>
      {/* </div> */}
      {/* <div> */}
      <CommonDiseases />
      <FAQ />
      {/* </div> */}
    </>
  );
}

export default Homepage;
