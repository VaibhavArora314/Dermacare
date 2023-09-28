import { Box, Button } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function PdfButtons({ pdfData, emailUrl, diseaseName }) {
  const { token } = useContext(AuthContext);

  const viewPdf = () => {
    // Decode the base64-encoded PDF data
    const decodedPdfData = atob(pdfData);

    // Convert the decoded data into a Uint8Array
    const uint8Array = new Uint8Array(decodedPdfData.length);
    for (let i = 0; i < decodedPdfData.length; i++) {
      uint8Array[i] = decodedPdfData.charCodeAt(i);
    }

    // Create a Blob from the Uint8Array
    const blob = new Blob([uint8Array], {
      type: "application/pdf",
    });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Open the PDF in a new tab
    window.open(url, "_blank");
  };

  const sendEmail = async () => {
    if (!token) return;
    try {
      const config = {
        headers: {
          token, // Replace 'your_token_value_here' with the actual token value you want to send.
        },
        timeout: 10000,
      };
      const res = await axios.get(emailUrl, config);
      console.log("PDF sent", res);
      alert("email sent!");
    } catch (error) {
      console.error("Error sending PDF", error);
      alert("An error occured while sending email!");
    }
  };

  const buttonStyle = {
    backgroundColor: "#038c13", // Your custom color in hexadecimal format
    color: "white", // Text color
  };
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button variant="contained" style={buttonStyle} onClick={viewPdf}>
        View PDF
      </Button>
      <Button variant="contained" style={buttonStyle} onClick={sendEmail}>
        Send Email
      </Button>
      {/* <iframe
        src={`data:application/pdf;base64,${pdfData}`}
        title="PDF Viewer"
        width="90%"
        height="600px"
      ></iframe> */}
    </Box>
  );
}

export default PdfButtons;
