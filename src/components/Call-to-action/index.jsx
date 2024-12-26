import React from "react";
import Split from "../Split";
import Link from "next/link";

const CallToAction = ({ img, theme, subBG }) => {
  return (
    <section
      className={`call-action section-padding ${subBG ? "sub-bg" : ""} bg-img`}
      style={{ backgroundImage: `url(${img ? img : "/img/pattern.png"})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-9">
            <div className="content sm-mb30">
              
                <h6 className="wow words chars" data-splitting>
                  Ready to Elevate Your Brand?
                </h6>
                <h1
                  className="wow words custom-font chars"
                  data-splitting
                >
                  Let’s make it happen  </h1>
                  <h2> get started today!
                </h2>
             
            </div>
          </div>

          <div className="col-md-4 col-lg-3 valign">
            <Link href="/contact">
              <a
                className={`btn-curve ${
                  theme == "light" ? "btn-blc" : "btn-lit"
                } wow fadeInUp`}
                data-wow-delay=".5s"
              >
                <span>Get In Touch</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
