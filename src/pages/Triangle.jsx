import React from 'react'
import DarkTheme from "../layouts/Dark";
import Navbar from "../components/Navbar";
import ProjectDetails2Header from "../components/Project-details2-header";
import ProjectDetails2Introduction from "../components/Project-details2-introduction";
import ProjectDetails2Images from "../components/Project-details2-images";
import ProjectDetailsVideo from "../components/Project-details-video-exist";
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
