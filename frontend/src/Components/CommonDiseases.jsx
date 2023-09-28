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
            Whether you have hormonal acne, or just want to reduce signs of
            ageing, we are here for you every step of the way. You get long-term
            & result-based care for your specific concern or goal.
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
                Psoriasis is known for its silvery scales and often affects
                joints. Lichen Planus causes shiny, flat-topped bumps on the
                skin, often affecting the wrists and ankles. Both can be managed
                with treatments to alleviate symptoms and flare-ups.
              </p>
            </div>
          </div>
          <div className="b">
            <div className="head">
              <p>Vitiligo</p>
            </div>
            <div className="description">
              <p>
                Vitiligo causes white patches due to pigment loss, impacting the
                skin's appearance. It's thought to be an autoimmune condition
                affecting melanocytes. Treatments aim to restore color or even
                skin tone.
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
              become clogged with oil and dead skin cells, leading to pimples,
              blackheads, and whiteheads. Rosacea, on the other hand, is a
              chronic skin disorder that primarily affects the face, causing
              redness, flushing, and in some cases, pimples. Both conditions can
              have a significant impact on a person's self-confidence and
              quality of life.
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
                Eczema, marked by dry, itchy patches, can worsen with triggers
                like stress or irritants. Moisturizing regularly, avoiding
                triggers, and using prescribed treatments can help manage
                flare-ups and maintain skin health.
              </p>
            </div>
          </div>
          <div className="d">
            {" "}
            <div className="head">
              <p> Candidiasis</p>
            </div>
            <div className="description">
              <p>
                Fungal infections like ringworm and candidiasis cause
                discomfort, itching, and visible rashes. Maintaining personal
                hygiene and using antifungal treatments can help eliminate the
                infection and prevent recurrence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommonDiseases;
