function PdfViewer({ pdfData }) {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Centers vertically in the viewport
  };

  return (
    <div style={containerStyle}>
      <iframe
        src={`data:application/pdf;base64,${pdfData}`}
        title="PDF Viewer"
        width="90%"
        height="600px"
        // id="user_report"
        // download="user_report.pdf"
        // name="user_report"
      ></iframe>
    </div>
  );
}

export default PdfViewer;
