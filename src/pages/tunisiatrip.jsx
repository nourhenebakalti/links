import React from "react";
import Navbar from "../components/Navbar";
import DarkTheme from "../layouts/Dark";
import ProjectDetails2Header from "../components/Project-details2-header-tunisiatrip";
import ProjectDetails2Introduction from "../components/Project-details2-introduction-tunisiatrip";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import FigmaEmbed from "../components/Presentation/Index.jsx";

const ShowcaseDark = () => {
  const navbarRef = React.useRef(null);
    const logoRef = React.useRef(null);
    React.useEffect(() => {
      var navbar = navbarRef.current,
        logo = logoRef.current;
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
    }, [navbarRef]);
  return (
    <DarkTheme>
      <Navbar nr={navbarRef} lr={logoRef} />
      <Helmet>
        <title>Links Station | Tunisiatrip.com Your Ultimate Guide to Korean Tourism</title>
        <meta name="description" content="Explore the beauty of Tunisia with Tunisiatrip.com. Our comprehensive guide offers everything Korean tourists need to know, from top attractions to insider tips. Start planning your dream trip today!" />
        <meta name="keywords" content="Tunisia, Korean tourism, Discover, Guide, Attractions, Insider tips, Dream trip, Tourism, Travel, Adventure"/>
      </Helmet>
      <ProjectDetails2Header/>
      <ProjectDetails2Introduction/>
      <FigmaEmbed/>
      <Footer noSubBG />
    </DarkTheme>
  );
};

export default ShowcaseDark;
