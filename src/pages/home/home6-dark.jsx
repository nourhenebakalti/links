import { useRef, useEffect } from "react";
//= ================== Layout ==================//
import DarkTheme from "../../layouts/Dark";
//= ================== Components ==================//
import Navbar from "../../components/Navbar";
import BlcSec from "../../components/Blc-sec";
import Intro from "../../components/Intro-txt2";
import Features from "../../components/Features";
import ServicesBottom from "../../components/Services6";
import Testimonials1 from "../../components/Testimonials1";
import Clients from "../../components/Clients1";
import CallToAction from "../../components/Call-to-action";
import Footer from "../../components/Footer";

const Homepage6 = () => {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
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
      document.body.classList.add('dark2');
      var slidHeight = document.querySelector('.fixed-slider').getBoundingClientRect().height;
      document.querySelector('.main-content').style.setProperty('margin-top', slidHeight + 'px');
    })

    // return () => {
    //   document.body.classList.remove('dark2');
    // }
  }, [navbarRef]);

  return (
    <DarkTheme>
      <Navbar nr={navbarRef} lr={logoRef} />
      <Intro />
      <div className="main-content">
        <BlcSec />
        <Features />
        <ServicesBottom />
        <Testimonials1 />
        <Clients theme="dark" />
        <CallToAction theme="dark" />
        <Footer noSubBG />
      </div>
    </DarkTheme>
  );
};

export default Homepage6;
