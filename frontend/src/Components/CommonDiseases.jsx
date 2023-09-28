import React from "react";
import "./diseases.scss";
function CommonDiseases() {
  return (
    <div className="parent-container">
      <div className="parent-container__first">
        <p className="title">
          Our <span className="popular"> popular </span>treatments
          <hr
            style={{
              width: "85%",
              border: "1px solid black",
              marginRight: "15%",
              marginTop: "2%",
            }}
          />
        </p>
        <div className="content">
          <p>
            Whether you have hormonal acne, hair fall, or just want to reduce
            signs of ageing, we are here for you every step of the way. You get
            long-term & result-based care for your specific concern or goal.
          </p>
        </div>
      </div>
      <div className="disease-section">
        <div className="div-1">
          <div className="a">
            <div className="head">
              <p>Psoriasis</p>
            </div>
            <div className="description">
              <p>
                Psoriasis is an autoimmune skin disease characterized by rapid
                skin cell turnover, resulting in thick, scaly patches on the
                skin's surface.{" "}
              </p>
            </div>
          </div>
          <div className="b">
            <div className="head">
              <p>Vitiligo</p>
            </div>
            <div className="description">
              <p>
                Vitiligo is a skin disorder characterized by the loss of
                pigmentation in certain areas of the skin, resulting in white
                patches.
              </p>
            </div>
          </div>
        </div>
        <div className="div-2">
          {" "}
          <div className="head">
            <p>Acne</p>
          </div>
          <div className="description">
            <p>
              Acne is a common skin condition that occurs when hair follicles
              become clogged with oil and dead skin cells. It often results in
              pimples, blackheads, whiteheads, and in some cases, cysts. Acne
              can be influenced by factors such as hormones, genetics, and diet.
              Treatments range from over-the-counter topical products to
              prescription medications, depending on the severity.
            </p>
          </div>
        </div>
        <div className="div-3">
          <div className="c">
            {" "}
            <div className="head">
              <p>Eczema </p>
            </div>
            <div className="description">
              <p>
                Eczema is a chronic skin condition characterized by redness,
                itching, and inflammation.Eczema is often linked to allergies
                and can be triggered by environmental factors.
              </p>
            </div>
          </div>
          <div className="d">
            {" "}
            <div className="head">
              <p>Atopic Dermatitis</p>
            </div>
            <div className="description">
              <p>
                Atopic dermatitis is a specific type of eczema that often begins
                in childhood. It is associated with intense itching, redness,
                and dry skin patches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommonDiseases;
