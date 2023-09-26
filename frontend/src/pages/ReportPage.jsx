import React, { useContext, useEffect, useState } from "react";
import PdfViewer from "../Components/PdfViewer";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

function App() {
  const params = useParams();
  console.log(params);
  const index = params.id;

  const [pdfData, setPdfData] = useState(null);
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
          timeout: 5000,
        };
        const res = await axios.get(
          `http://localhost:5000/api/generate-pdf?index=${index}`,
          config
        );
        const data = await res.data.pdf;
        setPdfData(data);
      } catch (error) {
        console.error("Error fetching PDF data:", error);
      }
    };

    fetchPdfData();
  }, [token]);

  if (!pdfData) return "Loading ...";

  return (
    <div>
      <h1>Your Report</h1>
      {pdfData && <PdfViewer pdfData={pdfData} />}
    </div>
  );
}

export default App;
