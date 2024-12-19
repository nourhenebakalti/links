import React from "react";
import DarkTheme from "../layouts/Dark";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import PortfolioCustomColumn from "../components/Portfolio-custom-column";
import CallToAction from "../components/Call-to-action";
import Footer from "../components/Footer";
//import ContactHeader from "../components/Project-header";


const Works3Dark = () => {
  const fixedHeader = React.useRef(null);
  const MainContent = React.useRef(null);
  const navbarRef = React.useRef(null);
  React.useEffect(() => {
    setInterval(() => {
      if (fixedHeader.current) {
        var slidHeight = fixedHeader.current.offsetHeight;
      }
      if (MainContent.current) {
        MainContent.current.style.marginTop = slidHeight + "px";
      }
    }, 1000);
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
  }, []);

  return (
    <DarkTheme>
      <Navbar nr={navbarRef} />
      <Helmet>
        <title>Links Station | Projects Showcase</title>
        <meta name="description" content="Step into our world of creativity and innovation. Explore past projects showcasing the LINKS STATION difference. Each a testament to our commitment to excellence, creativity, and results. Ready to be inspired? Dive into our portfolio"/>
      </Helmet>
      <div className="main-content" ref={MainContent}>
        <PortfolioCustomColumn  column={3}/>
        <CallToAction theme="dark" />
        <Footer noSubBG />
      </div>
    </DarkTheme>
  );
};

export default Works3Dark;
