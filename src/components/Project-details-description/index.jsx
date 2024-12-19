import React from "react";

const ProjectDetailsDescription = ({title,about_section}) => {
  return (
    <section className="intro-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="htit">
              <h4>
                <span>02 </span> About {title}
              </h4>
            </div>
          </div>
          <div className="col-lg-8 offset-lg-1 col-md-8 mb-30">
            <div className="text">
              <p className="extra-text">
              {about_section}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsDescription;
