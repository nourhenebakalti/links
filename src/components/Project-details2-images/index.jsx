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
                <img alt="Triangle Gym neon sign." src="/img/portfolio/project2/R6C13106.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              {/* Use a real video tag for videos */}
              <a>
                <img alt="A low angle photo of a female instructor leading the Triangle event." src="/img/portfolio/project2/R6C13086.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              <a>
                <img alt="A picture capturing the event's general atmosphere in the dark." src="/img/portfolio/project2/R6C13119.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              {/* Use a real image tag for images */}
              <a>
                <img alt="A picture capturing the event's general atmosphere in the dark." src="/img/portfolio/project2/R6C13148.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              {/* Use a real video tag for videos */}
              <a>
                <img alt="Female sports instructor leading the event." src="/img/portfolio/project2/R6C12471.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              <a>
                <img alt="A male sport instructor leading the event." src="/img/portfolio/project2/R6C12389.jpg" />
              </a>
            </div>
            <div className="col-md-3 pr-0">
              <a>
                <img alt="An Image showcasing participants during day time" src="/img/portfolio/project2/R6C12462.jpg"/>
              </a>

            </div>
            
            <div className="col-md-3 pr-0">
              <a>
                <img alt="Female Sports Instructor" src="/img/portfolio/project2/R6C12426.jpg" />
              </a>
            </div>
            <div className="col-12">
              {/* If this image doesn't have a link, consider removing the anchor tag */}
              <a>
                <img alt="Image showing the Triangle Event at night time with the crowd turning their backs to the camera." src="/img/portfolio/project2/R6C13311.jpg" className="big-img" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails2Images;
