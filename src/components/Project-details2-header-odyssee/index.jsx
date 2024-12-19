import React from "react";
import Link from "next/link";

const ProjectDetails2Header = ({data}) => {
  return (
    <section
      className="page-header proj-det bg-img parallaxie valign"
      style={{ backgroundImage: "url(/img/portfolio/project2/bgpen.jpg)" }}
      data-overlay-dark="4"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-9">
            <div className="cont">
              <h6>Client</h6>
              <h2>Penelope, Odyssee Resort Thalasso and Spa</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Client Type</h6>
              <p>
                <a href="#0">Thalasso & Spa</a>
              </p>
            </div>
          </div>
  
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Categories</h6>
              <p>
                <Link href="/works/works-dark">Hotel</Link> ,
                <Link href="/works/works-dark">Resort</Link>
                <Link href="/works/works-dark">Hospitality</Link>
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Location</h6>
              <p>
                <Link href="/works/works-dark">Tunisia - Zarzis​</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails2Header;
