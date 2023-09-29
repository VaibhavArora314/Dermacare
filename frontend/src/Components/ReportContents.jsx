import { Avatar, Box } from "@mui/material";
import React from "react";
import PdfViewer from "./PdfButtons";

const hospitals = [
  [
    "Dwarka Dermatologist , Pediatric Dermatologist , ( Skin Specislist )",
    "Upper ground floor , plot no- 96, Sector 13, Dwarka, Delhi, 110078",
    "http://www.kvsc.in/",
  ],

  [
    "Dr. J S. Randhawa, Skin Specialist, Dermatologist, Skin Clinic",
    "Randhawa's Skin & VD Centre, Flat No. 689, LIG OM Appartment, Sector-14, Pocket B, Dwarka, Delhi, 110075",
    "https://drrandhawadermatologist.webs.com/",
  ],

  [
    "Dr. Sumit Sethi - Dermatologist || Skin Specialist || Laser Hair Removal in Dwarka",
    "Metro Station, Venkateshwar Hospital, Sector 18A, Dwarka, near Sector 12, Delhi 110075",
    "https://www.dermastation.com/",
  ],
  [
    "Dermosphere Clinic- on Apollo 24|7",
    "Flat number 154, Akshardham Apartment, Sector 19, Pocket 3, Phase 1, Dwarka, New Delhi, Delhi, 110075",
    "https://www.dermosphere.com/",
  ],

  [
    "Twacha Skin Clinic",
    "84 , Sector 12A , Near IGL Petrol Pump , Road opposite Bal Bharti School, Dwarka, New Delhi, Delhi 110078",
    "https://twachaclinic.com/",
  ],
];

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
        <h3>Hospitals</h3>
        {hospitals.map((hospital, i) => (
          <>
            {" "}
            <h4>
              <b>
                {i + 1}.{" "}
                <a href={hospital[2]} target="_blank">
                  {hospital[0]}
                </a>
              </b>
            </h4>
            <p style={{ margin: 0 }}>{hospital[1]}</p>
          </>
        ))}
      </Box>
    </>
  );
};

export default ReportContents;
