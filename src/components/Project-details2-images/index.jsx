/* eslint-disable @next/next/no-img-element */
import React from "react";

const ProjectDetails2Images = () => {
  return (
    <section className="projdtal">
      <h2 style={{display: 'none'}}> &nbsp; </h2>
      <div className="container-fluid">
        <div className="justified-gallery">
          <div className="row">
            <div className="col-md-3 pr-0">
              <a href="img/portfolio/project2/1exist.png">
                <img alt="" src="/img/portfolio/project2/1exist.png" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              <a href="img/portfolio/project2/2exist.png">
                <img alt="" src="/img/portfolio/project2/2exist.png" />
              </a>
            </div>

            <div className="col-md-3 pr-0">
              <a href="img/portfolio/project2/3exist.png">
                <img alt="" src="/img/portfolio/project2/3exist.png" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              <a>
                <img alt="" src="/img/portfolio/project2/4exist.png" />
              </a>
            </div>
            <div className="col-12">
              <a>
                <img alt="" src="/img/portfolio/project2/5exist.png" className="big-img" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails2Images;
