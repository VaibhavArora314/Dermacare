import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState(null);
  const { token } = useContext(AuthContext);

  const getHistory = async () => {
    try {
      const config = {
        headers: {
          token, // Replace 'your_token_value_here' with the actual token value you want to send.
        },
      };

      const res = await axios.get(
        "http://localhost:5000/api/user/images",
        config
      );
      //   console.log(res);

      const images = res.data.uploadedImages;

      setHistory(
        images.map((image) => {
          return {
            image: image,
            disease: "Acne",
          };
        })
      );
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    getHistory();
  }, [token]);

  const handleEmailSend = async (index) => {
    try {
      const config = {
        headers: {
          token, // Replace 'your_token_value_here' with the actual token value you want to send.
        },
      };

      //   const res = await axios.get(
      //     `http://localhost:5000/api/generate-pdf?index=${index}`,
      //     config
      //   );
      //   console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  if (!history) return null;

  return (
    <div>
      <h2>History</h2>
      {history.map((h, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <p>{index + 1}</p>
          <img
            src={h.image}
            alt=""
            style={{ height: "100px", width: "100px", objectFit: "cover" }}
          />
          <h4>Acne</h4>
          <button
            style={{ height: "50px" }}
            onClick={() => {
              handleEmailSend(index);
            }}
          >
            Send Report via Email
          </button>
        </div>
      ))}
    </div>
  );
};

export default History;
