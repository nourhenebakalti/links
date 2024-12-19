import React from "react";

const ProjectDetailsIntroduction = ({des,bulletPoints = []}) => {
  console.log("test",bulletPoints);
  return (
    <section className="intro-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="htit">
              <h4>
                <span>01 </span> LINKS Services:
              </h4>
            </div>
          </div>
          <div className="col-lg-8 offset-lg-1 col-md-8">
            <div className="text js-scroll__content">
              <p className="extra-text">
                {des}
                 </p>
                 <ul className="smp-list mt-30">
                {bulletPoints.map((point, index) => (
                  <li key={index}>{point}</li> 
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsIntroduction;
