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
                <img alt="A red car driving by a colorful pastel building in the 1950's" src="/img/portfolio/project2/1exist.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              {/* Use a real video tag for videos */}
              <a>
                <img alt="A group of friends inside a red convertable car on their way to the beach." src="/img/portfolio/project2/4exist.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              <a>
                <img alt="A top view of a red convertable car taken with a drone camera." src="/img/portfolio/project2/2exist.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              {/* If this image doesn't have a link, consider removing the anchor tag */}
              <a>
                <img alt="Two young male models posing next to a red convertable car" src="/img/portfolio/project2/6exist.jpg" />
              </a>
            </div>
            <div className="col-12">
              {/* If this image doesn't have a link, consider removing the anchor tag */}
              <a>
                <img alt="A young male model lying inside a red convertable car." src="/img/portfolio/project2/5exist.jpg" className="big-img" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails2Images;
