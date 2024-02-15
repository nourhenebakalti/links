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
              <a>
                <img alt="A warm ambiance, showcasing the massage room for Penelope, inside the Odyssee which is a 5 star hotel." src="/img/portfolio/project2/pen2.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              <a>
                <img alt="A family laughing inside Penelope's Spa room." src="/img/portfolio/project2/pen3.jpg" />
              </a>
            </div>

            <div className="col-md-3 pr-0">
              <a>
                <img alt="A female model posing with her back facing the camera inside a spa room." src="/img/portfolio/project2/pen1.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              <a>
                <img alt="A woman lying down for a Hot Stone Massage." src="/img/portfolio/project2/pen5.jpg" />
              </a>
            </div>
            <div className="col-12">
              <a>
                <img alt="A woman lying on her back for a neck massage inside a spa." src="/img/portfolio/project2/pen7.jpg" className="big-img" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails2Images;
