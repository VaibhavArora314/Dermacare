import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState(null);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

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
      const history = res.data.uploadedImages;
      setHistory(history);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    getHistory();
  }, [token]);

  const handleEmailSend = async (index) => {
    if (loading) {
      alert("Generating a PDF. Please Wait!");
      return;
    }

    setLoading(true);

    try {
      const config = {
        headers: {
          token, // Replace 'your_token_value_here' with the actual token value you want to send.
        },
      };
      const res = await axios.get(
        `http://localhost:5000/api/generate-pdf?index=${index}`,
        config
      );
      console.log(res);
      // const pdfData = new Uint8Array(res.data);

      // const blob = new Blob([pdfData], { type: "application/pdf" });

      // // Create a URL for the Blob
      // const url = URL.createObjectURL(blob);
      // // window.open(url, "_blank");

      // const a = document.createElement("a");
      // a.href = url;
      // a.download = "report.pdf"; // Set the desired file name.
      // a.style.display = "none";
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);

      // URL.revokeObjectURL(url);
      setLoading(false);
    } catch (ex) {
      console.log(ex);
      setLoading(false);
    }
  };

  if (!history) return null;

  return (
    <div>
      <h2>History</h2>
      {history.map((h, index) => (
        <div
          key={h._id}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <p>{index + 1}</p>
          <img
            src={h.imageUrl}
            alt=""
            style={{ height: "100px", width: "100px", objectFit: "cover" }}
          />
          <h4>{h.diseaseName}</h4>
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
