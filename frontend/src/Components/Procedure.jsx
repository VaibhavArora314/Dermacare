import React from "react";
import one from "../assets/icons/one.png";
import two from "../assets/icons/two.png";
import three from "../assets/icons/three.png";
import "./procedure.scss";
function Procedure() {
  return (
    <>
      <div className="procedure">
        <div className="procedure__heading">
          How{" "}
          <span
            style={{
              color: "#118480",
            }}
          >
            Dermacare{" "}
          </span>
          works ?
          <hr />
        </div>

        <div className="procedureContainer">
          <div className="procedureContainer__div1">
            <div className="procedureContainer__div1__Image"></div>

            <div className="procedureContainer__div1__content-head">
              <p>Click & Upload </p>
            </div>
            <div className="procedureContainer__div1__Content">
              <p className="details">
                Navigate to the upload section through the checkup button from
                the navbar.Upload a sharp and clear image of the affected part
                of your skin for our model to give you the best results.
              </p>
            </div>
          </div>

          <div className="procedureContainer__div2">
            <div className="procedureContainer__div2__TwoImage"></div>
            <div className="procedureContainer__div2__content-head">
              <p> View your Diagnosis Report</p>
            </div>

            <div className="procedureContainer__div2__TwoContent">
              <p className="details">
                Upon successful upload of an image, click on generate report and
                wait for the model to show its magic and generate your results.
              </p>
            </div>
          </div>

          <div className="procedureContainer__div3">
            <div className="procedureContainer__div3__ThreeImage"></div>
            <div className="procedureContainer__div3__content-head">
              <p>Access via Email</p>
            </div>

            <div className="procedureContainer__div3__ThreeContent">
              <p className="details">
                For export purpose lookout for the pdf and email options in the
                generated report which can be easily downloaded or sent to the
                registered mail ensuring hassle free storge and retrieval .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Procedure;
