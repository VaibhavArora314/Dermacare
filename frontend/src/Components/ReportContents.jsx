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
        <Box sx={{ flexDirection: "column", gap: 0, fontFamily: "helvetica" }}>
          Disease Name:
          <h3>{diseaseName}</h3>
          <PdfViewer
            pdfData={pdfData}
            emailUrl={emailUrl}
            diseaseName={diseaseName}
          />
        </Box>
        {imageUrl && (
          <Avatar
            alt=""
            src={imageUrl}
            sx={{ width: 300, height: 300, borderRadius: "6px" }}
          />
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
          fontFamily: "lato",
        }}
      >
        <h4>
          <b>Disease Info:</b>
        </h4>
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
        <h4>
          <b>Suggested Medicines:</b>
        </h4>
        {medicinesResponse
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
        <h4>
          <b>Note:</b>
        </h4>
        <p style={{ color: "#ea0000", margin: 0, marginTop: 1 }}>
          The results are generated using advanced AI technology, which provides
          valuable insights. However, it is crucial to prioritize your health
          and well-being. We strongly recommend consulting a qualified medical
          professional before making any decisions or taking any additional
          steps based on these results.
        </p>
      </Box>
    </>
  );
};

export default ReportContents;
