import React from "react";
import Link from "next/link";

const ProjectDetails2Header = () => {
  return (
    <section
      className="page-header proj-det bg-img parallaxie valign"
      style={{ backgroundImage: "url(/img/portfolio/project2/bg.jpg)" }}
      data-overlay-dark="4"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-9">
            <div className="cont">
              <h6>Client</h6>
              <h2>Kab Corner</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Client Type</h6>
              <p>
                <a href="#0">Fast Food</a>
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Contract Term</h6>
              <p>6 Months</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Categories</h6>
              <p>
                <Link href="/works/works-dark">Fast Food</Link> ,
                <Link href="/works/works-dark">Restaurant</Link>
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Location</h6>
              <p>
                <Link href="/works/works-dark">Tunis - Tunisia​</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails2Header;
