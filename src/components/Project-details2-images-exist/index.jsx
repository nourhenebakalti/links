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
                <img alt="Project Image 2" src="/img/portfolio/project2/1exist.png" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              {/* Use a real video tag for videos */}
              <a>
                <img alt="Project Image 1" src="/img/portfolio/project2/4exist.png" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              <a>
                <img alt="Project Image 4" src="/img/portfolio/project2/2exist.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              {/* If this image doesn't have a link, consider removing the anchor tag */}
              <a>
                <img alt="Project Image 3" src="/img/portfolio/project2/6exist.jpg" />
              </a>
            </div>
            <div className="col-12">
              {/* If this image doesn't have a link, consider removing the anchor tag */}
              <a>
                <img alt="Project Image 5" src="/img/portfolio/project2/5exist.png" className="big-img" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails2Images;
