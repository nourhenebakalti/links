import React from "react";
import addParlx from "../../common/addParlx";

const ContactHeader = ({ sliderRef }) => {
  const [pageLoaded, setPageLoaded] = React.useState(false);
  React.useEffect(() => {
    setPageLoaded(true);
    if (pageLoaded) {
      addParlx()
    }
  }, [pageLoaded])
  return (
    <header ref={sliderRef} className="works-header fixed-slider hfixd valign">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-md-11 static">
            <div className="capt mt-50">
              <div className="parlx">
                <h2 className="custom-font">
                 Explore our projects
                </h2>
                <p>
                  Step into our world of creativity and innovation.
                </p>
              </div>

              <div className="bactxt custom-font valign">
                <span className="full-width">Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ContactHeader;
