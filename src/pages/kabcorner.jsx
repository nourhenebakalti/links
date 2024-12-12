import React from 'react'
import DarkTheme from "../layouts/Dark";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import ProjectDetails2Header from "../components/Project-details2-header-kab";
import ProjectDetails2Introduction from "../components/Project-details2-introduction-kab";
import ProjectDetails2Images from "../components/Project-details2-images-kab";
import ProjectDetailsVideo from "../components/Project-details-video";
import Footer from "../components/Footer";

const ProjectDetails2Dark = () => {
    const navbarRef = React.useRef(null);
    const logoRef = React.useRef(null);
    React.useEffect(() => {
      var navbar = navbarRef.current,
        logo = logoRef.current;
      if (window.pageYOffset > 300) {
        navbar.classList.add("nav-scroll"); // Corrected typo here
      } else {
        navbar.classList.remove("nav-scroll"); // Corrected typo here
      }
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
          navbar.classList.add("nav-scroll"); // Corrected typo here
        } else {
          navbar.classList.remove("nav-scroll"); // Corrected typo here
        }
      });
    }, [navbarRef]);
    return (
      <DarkTheme>
        <Navbar nr={navbarRef} lr={logoRef} />
        <Helmet>
        <title>Links Station | KabCorner Identity Development</title>
        <meta name="description" content="We provided integral support to Kabcorner, orchestrating a seamless brand launch, optimizing digital and physical communication for a professional media presence. Our services included crafting precise content, amplifying audience engagement through social paid advertising, optimizing social media management, and creating product photography & digital signage menus."/>
        <meta name="keywords" content="Kabcorner, brand launch, digital communication, physical communication, professional media presence, digital branding, content creation, audience engagement, social paid advertising, social media management, efficiency, product photography, digital signage, menu creation"/>
        </Helmet>
        <ProjectDetails2Header />
        <ProjectDetails2Introduction />
        <ProjectDetails2Images />
        <ProjectDetailsVideo
        videoUrl="https://www.youtube.com/watch?v=EiqYC-xeRd0&list=TLGGtfsnXd3skJowNzAxMjAyNA&t"
        />
        <Footer noSubBG />
      </DarkTheme>
    );
}

export default ProjectDetails2Dark
