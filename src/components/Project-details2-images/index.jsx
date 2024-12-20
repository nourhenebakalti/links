/* eslint-disable @next/next/no-img-element */
import React from "react";

const ProjectDetailsImages = ({images=[]}) => {
  return (
    <section className="projdtal">
      <h2 style={{display: 'none'}}> &nbsp; </h2>
      <div className="container-fluid">
        <div className="justified-gallery">
          <div className="row">
            <div className="col-md-3 pr-0">
              <a>
                <img alt="A warm ambiance, showcasing the massage room for Penelope, inside the Odyssee which is a 5 star hotel." src={`http://localhost:5000${images[0]}`} />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              <a>
                <img alt="A family laughing inside Penelope's Spa room." src={`http://localhost:5000${images[1]}`} />
              </a>
            </div>

            <div className="col-md-3 pr-0">
              <a>
                <img alt="A female model posing with her back facing the camera inside a spa room." src={`http://localhost:5000${images[2]}`} />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              <a>
                <img alt="A woman lying down for a Hot Stone Massage." src={`http://localhost:5000${images[3]}`} />
              </a>
            </div>
            <div className="col-12">
              <a>
                <img alt="A woman lying on her back for a neck massage inside a spa." src={`http://localhost:5000${images[4]}`} className="big-img" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsImages;
