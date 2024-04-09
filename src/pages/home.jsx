import { useRef, useEffect } from "react";
//= ================== Layout ==================//
import DarkTheme from "../layouts/Dark";
//= ================== Components ==================//
import Navbar from "../components/Navbar";
import BlcSec from "../components/Blc-sec";
import { Helmet } from "react-helmet";
import Features from "../components/Features";
import ServicesBottom from "../components/Services6";
import CallToAction from "../components/Call-to-action";
import ProjectDetailsVideo from "../components/Project-details-video";
import Footer from "../components/Footer";
import IntroWithSlider1 from "../components/Intro-with-slider1";

const Homepage6 = () => {
  const fixedSlider = useRef(null);
  const MainContent = useRef(null);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    setInterval(() => {
      if (fixedSlider.current) {
        var slidHeight = fixedSlider.current.offsetHeight;
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
  }, [fixedSlider, MainContent, navbarRef]);

  return (
    <DarkTheme>
      <Navbar nr={navbarRef} lr={logoRef} />
      <Helmet>
      <meta name="description" content="LINKS STATION is an innovative creative studio dedicated to crafting extraordinary digital products, building memorable brands, and delivering captivating experiences."/>
      <meta name="keywords" content="Links Station, identity development, brand development, branding services, digital identity, logo design, brand strategy, graphic design, marketing collateral, visual identity"/>
      <meta property="og:type" content="Home Page"/>
        <meta property="og:title" content="Links Station | About Us"/>
        <meta property="og:description" content="LINKS STATION is an innovative creative studio dedicated to crafting extraordinary digital products, building memorable brands, and delivering captivating experiences."/>
        <meta property="og:image" content= 'C:\Users\norhb\Desktop\github\links\public\img\smlogo.png'/>
        <meta property="og:url" content="linkstation.live" />
        <meta property="og:site_name" content="LINKS STATION"/>
      </Helmet>
      <IntroWithSlider1 sliderRef={fixedSlider} />
      <div ref={MainContent} className="main-content">
        <BlcSec />
        <Features />
        <ServicesBottom />
        <ProjectDetailsVideo
        videoUrl="https://www.youtube.com/watch?v=ze1UWYxgdBw"
        />
        <CallToAction theme="dark" />
       <Footer noSubBG /> 
      </div>
    </DarkTheme>
  );
};

export default Homepage6;
