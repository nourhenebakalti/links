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
              <a >
                <img alt="Lobby room with hanging chandeliers inside Royal Tulip, a 5 star hotel" src="/img/portfolio/project2/3.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              <a>
                <img alt="Restaurant inside Royal Tulip, a 5 star hotel" src="/img/portfolio/project2/17.jpg" />
              </a>
            </div>

            <div className="col-md-3 pr-0">
              <a>
                <img alt="A sunset view from a balcony inside Royal Tulip, a 5 star hotel" src="/img/portfolio/project2/25.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              <a>
                <img alt="A wooden bridge on top of the sea inside Royal Tulip, a 5 star hotel" src="/img/portfolio/project2/Hamam.jpg"/>
              </a>
            </div>
            <div className="col-12">
              <a>
                <img alt="A centered photo of wooden bridge on top of the sea inside Royal Tulip, a 5 star hotel" src="/img/portfolio/project2/9.jpg" className="big-img" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails2Images;
