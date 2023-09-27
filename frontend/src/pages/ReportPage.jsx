import React, { useContext, useEffect, useState } from "react";
import PdfViewer from "../Components/PdfButtons";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { Box } from "@mui/material";
import UserDetails from "../Components/UserDetails";
import Divider from "@mui/material/Divider";
import ReportContents from "../Components/ReportContents";

function App() {
  const params = useParams();
  const index = params.id;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the PDF data from your API
    const fetchPdfData = async () => {
      if (!token) return;
      try {
        const config = {
          headers: {
            token, // Replace 'your_token_value_here' with the actual token value you want to send.
          },
          timeout: 10000,
        };
        const res = await axios.get(
          `http://localhost:5000/api/generate-pdf?index=${index}`,
          config
        );
        const d = await res.data;
        setData(d);
      } catch (error) {
        setError("Error generating pdf");
        console.error("Error fetching PDF data:", error);
      }
    };

    fetchPdfData();
  }, [token]);

  if (error)
    return <h1 style={{ textAlign: "center", marginTop: "2rem" }}>{error}</h1>;

  if (!data) return <Loader />;

  return (
    <Box sx={{ marginBottom: 5 }}>
      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>Your Report</h1>
      {data.pdf && (
        <Box
          sx={{
            display: "flex",
            width: "100vw",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UserDetails />
          <Divider sx={{ width: 0.8, marginTop: 2, marginBottom: 2 }} />
          <ReportContents
            diseaseName={data.diseaseName}
            imageUrl={data.imageUrl}
            diseaseInfoResponse={data.diseaseInfoResponse}
            medicinesResponse={data.medicinesResponse}
            pdfData={data.pdf}
            emailUrl={`http://localhost:5000/api/generate-pdf?index=${index}&needEmail=1`}
          />
        </Box>
      )}
    </Box>
  );
}

export default App;
