import React from "react";
import { Helmet } from "react-helmet";
import ContactHeader from "../components/Contact-header";
import ContactWithMap from "../components/Contact-with-map";
import Navbar from "../components/Navbar";
import DarkTheme from "../layouts/Dark";
import Header from "../components/About-header";

const Contact = () => {
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
      <title>Links Station | Contact Us</title>
      <meta name="description" content="Get in touch with Links Station today for expert identity and brand development services. Our team is ready to assist you in creating a compelling brand presence."/>
      <meta name="keywords" content="contact, Links Station, identity development, brand development, branding services, contact us, brand presence"/>
      <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="main-content" ref={MainContent}>
        <Header/>
        <ContactWithMap />
      </div>
    </DarkTheme>
  );
};

export default Contact;
