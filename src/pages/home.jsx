import { useRef, useEffect } from "react";
//= ================== Layout ==================//
import DarkTheme from "../layouts/Dark";
//= ================== Components ==================//
import Navbar from "../components/Navbar";
import BlcSec from "../components/Blc-sec";
//import Intro from "../components/Intro-txt2";
import Features from "../components/Features";
import ServicesBottom from "../components/Services6";
import CallToAction from "../components/Call-to-action";
import NumbersWithVideo from "../components/Numbers-with-video";
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
      <IntroWithSlider1 sliderRef={fixedSlider} />
      <div ref={MainContent} className="main-content">
        <BlcSec />
        <Features />
        <NumbersWithVideo/> 
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        <ServicesBottom />
        <CallToAction theme="dark" />
       <Footer noSubBG /> 
      </div>
    </DarkTheme>
  );
};

export default Homepage6;
