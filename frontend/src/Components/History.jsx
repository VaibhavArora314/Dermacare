import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";

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

  if (!history || history.length === 0) return null;

  return (
    <Box
      sx={{
        flexDirection: "column",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        display: "flex",
        alignItems: "center",
      }}
    >
      <h2 style={{ fontSize: "2em", fontFamily: "montserrat", opacity: "0.8" }}>
        {" "}
        Report History
        <hr
          style={{ marginTop: 4, border: "1px solid gray", opacity: "0.5" }}
        />
      </h2>
      <TableContainer>
        <Table sx={{ maxWidth: 1500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>S.No.</b>
              </TableCell>
              <TableCell>
                <b>Image</b>
              </TableCell>
              <TableCell>
                <b>Disease Name</b>
              </TableCell>
              <TableCell>
                <b>Report</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((h, index) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">
                  <img
                    src={h.imageUrl}
                    alt=""
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                    }}
                  />
                </TableCell>
                <TableCell align="left">{h.diseaseName}</TableCell>
                <TableCell align="left">
                  {/* <button
                    style={{ height: "50px" }}
                    onClick={() => {
                      handleEmailSend(index);
                    }}
                  >
                    Send Report
                  </button> */}
                  <Link to={`/report/${index}`}>Report</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default History;
