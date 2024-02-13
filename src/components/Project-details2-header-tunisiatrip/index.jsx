import React from "react";
import Link from "next/link";

const ProjectDetails2Header = () => {
  return (
    <section
      className="page-header proj-det bg-img parallaxie valign"
      style={{ backgroundImage: "url(/img/portfolio/project2/tunisia.jpg)" }}
      data-overlay-dark="4"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-9">
            <div className="cont">
              <h6>Project</h6>
              <h2>TUNISIATRIP.COM</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Client</h6>
              <p>
                <a href="#0">Atlantis Voyages</a>
              </p>
            </div>
          </div>
  
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Categories</h6>
              <p>
                <Link href="/works/works-dark">Tourism</Link> ,
                <Link href="/works/works-dark">International</Link>
                <Link href="/works/works-dark">Website</Link>
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Location</h6>
              <p>
                <Link href="/works/works-dark">Tunisia & Korea​</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails2Header;
