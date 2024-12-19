import React from "react";
import Link from "next/link";

const ProjectDetailsHeader = ({ img, client_type, title,categories,location}) => {
 
  return (
    <section
      className="page-header proj-det bg-img parallaxie valign"
      style={{ backgroundImage: `url(http://localhost:5000${img})` }}
      data-overlay-dark="4"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-9">
            <div className="cont">
              <h6>Client</h6>
              <h2>{title}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Client Type</h6>
              <p>
                <a href="#0">{client_type}</a>
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Categories</h6>
              <p>
                <a href="#0">{categories}</a>
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Location</h6>
              <p>
                <a href="#0">{location}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsHeader;
