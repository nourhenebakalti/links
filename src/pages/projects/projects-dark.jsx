import React from "react";
import DarkTheme from "../../layouts/Dark";
import addParlx from "../../common/addParlx";
import Navbar from "../../components/Navbar";
import SmallFooter from "../../components/Small-footer";
import PortfolioCustomColumn from "../../components/Portfolio-custom-column";
import CallToAction from "../../components/Call-to-action";
import Footer from "../../components/Footer";


const Works3Dark = () => {
  const fixedHeader = React.useRef(null);
  const MainContent = React.useRef(null);
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);

  const [pageLoaded, setPageLoaded] = React.useState(false);
  React.useEffect(() => {
    setPageLoaded(true);
    if (pageLoaded) {
      addParlx();
    }
  }, [pageLoaded]);

  React.useEffect(() => {
    var navbar = navbarRef.current;
    if (window.pageYOffset > 300) {
      navbar.classList.add("nav-scroll");
    } else {
      navbar.classList.remove("nav-scroll");
    }
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        navbar.classList.add("nav-scroll");
      } else {
        navbar.classList.remove("nav-scroll");
      }
    });
    window.addEventListener("load", () => {
      setTimeout(() => {
        if (fixedHeader.current) {
          var slidHeight = fixedHeader.current.offsetHeight;
          if (MainContent.current) {
            MainContent.current.style.marginTop = slidHeight + "px";
          }
        }
      }, 0);
    });
  }, [fixedHeader, MainContent, navbarRef]);

  return (
    <DarkTheme>
      <Navbar nr={navbarRef} lr={logoRef} />
      <header
        ref={fixedHeader}
        className="works-header fixed-slider hfixd valign"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 col-md-11 static">
              <div className="capt mt-50">
                <div className="parlx">
                  <h2 className="custom-font">Explore Our Projects</h2>
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
      <div ref={MainContent} className="main-content">
        <CallToAction theme="dark" />
        <PortfolioCustomColumn column={2}/>
        <Footer noSubBG />
      </div>
    </DarkTheme>
  );
};

export default Works3Dark;
