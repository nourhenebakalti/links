/* eslint-disable @next/next/no-img-element */
import React from "react";

const ProjectDetails2Images = () => {
  return (
    <section className="projdtal">
      {/* Using h2 with display: 'none' for spacing is not recommended */}
      {/* Consider using margin or padding instead */}
      <div className="container-fluid">
        <div className="justified-gallery">
        <div className="row">
            <div className="col-md-3 pr-0">
              {/* Use a real image tag for images */}
              <a>
                <img alt="A Kabcorner cheeseburger with beef." src="/img/portfolio/project2/Kabcorner.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              {/* Use a real video tag for videos */}
              <a>
                <img alt="A spilled fast food item made with onion rings, chicken and fries." src="/img/portfolio/project2/fam.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              <a>
                <img alt="Crushed chocolate chip cookies with a dark background." src="/img/portfolio/project2/cookie.png" />
              </a>
            </div>
                   
            <div className="col-md-3 pr-0">
              <a>
                <img alt="A double patty chicken burger." src="/img/portfolio/project2/gran.jpg" />
              </a>
            </div>
            <div className="col-12">
              {/* If this image doesn't have a link, consider removing the anchor tag */}
              <a>
                <img alt="Kab Corner fast food restaurant." src="/img/portfolio/project2/kabwide.jpg" className="big-img" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails2Images;
