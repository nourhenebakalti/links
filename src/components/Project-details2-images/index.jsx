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
                <img alt="Project Image 2" src="/img/portfolio/project2/R6C13106.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              {/* Use a real video tag for videos */}
              <a>
                <img alt="Project Image 1" src="/img/portfolio/project2/R6C13086.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              <a>
                <img alt="Project Image 4" src="/img/portfolio/project2/R6C13119.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              {/* Use a real image tag for images */}
              <a>
                <img alt="Project Image 2" src="/img/portfolio/project2/R6C13148.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              {/* Use a real video tag for videos */}
              <a>
                <img alt="Project Image 1" src="/img/portfolio/project2/R6C12471.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              <a>
                <img alt="Project Image 4" src="/img/portfolio/project2/R6C12389.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              <a>
                <img alt="Project Image 4" src="/img/portfolio/project2/R6C12462.jpg"/>
              </a>

            </div>
            
            <div className="col-md-3 pr-0">
              <a>
                <img alt="Project Image 3" src="/img/portfolio/project2/R6C12426.jpg" />
              </a>
            </div>
            <div className="col-12">
              {/* If this image doesn't have a link, consider removing the anchor tag */}
              <a>
                <img alt="Project Image 5" src="/img/portfolio/project2/R6C13311.jpg" className="big-img" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails2Images;
