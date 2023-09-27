import React, { useState } from "react";
import "./faq.scss";
import AddBoxIcon from "@mui/icons-material/AddBox";
function FAQ() {
  const [plusIcon, setplusIcon] = useState(Array(5).fill(false));

  const handlePlusOpen = (index) => {
    setplusIcon((prev) => {
      const newIcons = [...prev];
      newIcons[index] = !newIcons[index];
      console.log(newIcons);
      return newIcons;
    });
  };
  return (
    <div className="faq-parent">
      <div className="heading">
        <p>
          Frequently Asked <span>Questions:</span>
        </p>
      </div>

      <div
        className={`question-tile ${plusIcon[0] ? "answer" : ""}`}
        onClick={() => handlePlusOpen(0)}
      >
        <p>What is this website for?</p>
        <AddBoxIcon
          fontSize="large"
          style={{
            marginTop: "1.5%",
          }}
        />
      </div>
      {plusIcon[0] && (
        <>
          <div className="answer">
            <p>
              This website is designed to provide preliminary diagnoses of
              various skin conditions using artificial intelligence. It can help
              users identify potential skin issues based on uploaded images.
            </p>
          </div>
        </>
      )}

      <div
        className={`question-tile ${plusIcon[1] ? "answer" : ""}`}
        onClick={() => handlePlusOpen(1)}
      >
        <p>How does it work?</p>
        <AddBoxIcon fontSize="large" style={{ marginTop: "1.5%" }} />
      </div>
      {plusIcon[1] && (
        <>
          <div className="answer">
            <p>
              Users can upload an image of their skin condition, and our AI
              system will analyze the image to identify the skin condition. The
              results will be provided in a PDF report.
            </p>
          </div>
        </>
      )}

      <div
        className={`question-tile ${plusIcon[2] ? "answer" : ""}`}
        onClick={() => handlePlusOpen(2)}
      >
        <p>How long does it take to receive the diagnosis report?</p>
        <AddBoxIcon fontSize="large" style={{ marginTop: "1.5%" }} />
      </div>
      {plusIcon[2] && (
        <>
          <div className="answer">
            <p>
              The processing time may vary, but in most cases, you should
              receive the diagnosis report within a few minutes.
            </p>
          </div>
        </>
      )}

      <div
        className={`question-tile ${plusIcon[3] ? "answer" : ""}`}
        onClick={() => handlePlusOpen(3)}
      >
        <p>Can healthcare professionals use this tool?</p>
        <AddBoxIcon fontSize="large" style={{ marginTop: "1.5%" }} />
      </div>
      {plusIcon[3] && (
        <>
          <div className="answer">
            <p>
              Yes, healthcare professionals can use the tool to aid in their
              preliminary assessments, but it should not replace their clinical
              judgment.
            </p>
          </div>
        </>
      )}

      <div
        className={`question-tile ${plusIcon[4] ? "answer" : ""}`}
        onClick={() => handlePlusOpen(4)}
      >
        <p>How can I contact your support team for assistance?</p>
        <AddBoxIcon
          fontSize="large"
          style={{
            marginTop: "1.5%",
            transition: "transform 0.3s ease",
          }}
        />
      </div>
      {plusIcon[4] && (
        <>
          <div className="answer">
            <p>
              You can contact our support team through [contact information],
              and we will be happy to assist you with any questions or issues.
            </p>
          </div>
        </>
      )}
      {/* <div className="question-tile">1</div>
      <div className="question-tile">1</div>
      <div className="question-tile">1</div> */}
    </div>
  );
}

export default FAQ;
