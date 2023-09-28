import React from "react";
import "../assets/css/disease.scss";
import one from "../assets/icons/one.png";
import two from "../assets/icons/two.png";

function DiseasePage() {
  return (
    <div className="disease-parent">
      <div className="images">
        <img src={one} alt="img-1" />
        <img src={two} alt="img-2" />
      </div>
      <div className="disease-details">
        <div className="key-points">
          <h5>Key Points</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            dolorum aut architecto est sint, eum ratione porro accusantium
            assumenda numquam commodi, iure, iste officiis fugit. Aperiam
            eveniet illum explicabo doloremque?
          </p>
        </div>
        <div className="key-points">
          <h5>Common Medicines</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            dolorum aut architecto est sint, eum ratione porro accusantium
            assumenda numquam commodi, iure, iste officiis fugit. Aperiam
            eveniet illum explicabo doloremque?
          </p>
        </div>
        <div className="key-points">
          <h5>Preventive Measures</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            dolorum aut architecto est sint, eum ratione porro accusantium
            assumenda numquam commodi, iure, iste officiis fugit. Aperiam
            eveniet illum explicabo doloremque?
          </p>
        </div>
        <div className="key-points">
          <h5>Home Remedies</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            dolorum aut architecto est sint, eum ratione porro accusantium
            assumenda numquam commodi, iure, iste officiis fugit. Aperiam
            eveniet illum explicabo doloremque?
          </p>
        </div>
      </div>
    </div>
  );
}

export default DiseasePage;
