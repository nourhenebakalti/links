import React from 'react'
import DarkTheme from "../layouts/Dark";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import ProjectDetails2Header from "../components/Project-details-header";
import ProjectDetails2Introduction from "../components/Project-details2-introduction";
import ProjectDetails2Images from "../components/Project-details2-images";
import ProjectDetailsVideo from "../components/Project-details-video";
import Footer from "../components/Footer";



const ProjectDetails2Dark = () => {
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
        <title>Links Station | Triangle Sports Event Coverage</title>
        <meta name="description" content="Experience the dynamic world of Triangle Fitness through our captivating event coverage videos. Feel the energy of thrilling sports events and the vibrant spirit of the gym. Curated content perfect for every social media platform."/>
        <meta name="keywords" content="Triangle Fitness, Fitness Day, event coverage, gym, sports events, vibrant spirit, social media content, workouts, inspiring moments"/>
      </Helmet>
        <ProjectDetails2Header />
        <ProjectDetails2Introduction />
        <ProjectDetails2Images />
        <ProjectDetailsVideo
        videoUrl="https://www.youtube.com/watch?v=P1wSEktFVOY"
        />
        <Footer noSubBG />
      </DarkTheme>
    );
}

export default ProjectDetails2Dark
