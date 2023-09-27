import { Avatar, Box } from "@mui/material";
import React from "react";
import PdfViewer from "./PdfButtons";

const ReportContents = ({
  diseaseName,
  imageUrl,
  diseaseInfoResponse,
  medicinesResponse,
  pdfData,
  emailUrl,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: 0.75,
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: 10,
          marginRight: 10,
          marginTop: 2,
        }}
      >
        <Box sx={{ flexDirection: "column", gap: 0 }}>
          Disease Name:
          <h4>{diseaseName}</h4>
          <PdfViewer pdfData={pdfData} emailUrl={emailUrl} />
        </Box>
        {imageUrl && (
          <Avatar alt="" src={imageUrl} sx={{ width: 100, height: 100 }} />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 0.75,
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: 2,
          gap: 0,
        }}
      >
        <h4>Disease Info:</h4>
        {diseaseInfoResponse
          .split("\n")
          //   .slice(0, 5)
          .map((d, i) => (
            <p key={i} style={{ margin: 0, marginTop: 3 }}>
              {d}
            </p>
          ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 0.75,
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: 2,
        }}
      >
        <h4>Suggested Medicines:</h4>
        {medicinesResponse
          .split("\n")
          //   .slice(0, 5)
          .map((d, i) => (
            <p key={i} style={{ margin: 0, marginTop: 3 }}>
              {d}
            </p>
          ))}
      </Box>
    </>
  );
};

export default ReportContents;
