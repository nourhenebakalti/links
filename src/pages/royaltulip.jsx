import React from 'react'
import DarkTheme from "../layouts/Dark";
import Navbar from "../components/Navbar";
import ProjectDetails2Header from "../components/Project-details2-header-royal";
import ProjectDetails2Introduction from "../components/Project-details2-introduction-royal";
import ProjectDetails2Images from "../components/Project-details2-images-royal";
import ProjectDetailsVideo from "../components/Project-details-video-exist";
import Footer from "../components/Footer";

//import NextProject from "../../components/Next-project";
//import SmallFooter from "../../components/Small-footer";


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
        <br></br>
        <ProjectDetailsVideo
        videoBackground="/img/portfolio/project2/bgexist.png"
        videoUrl="https://www.youtube.com/watch?v=DpF6n8ChZn4"
        />
        <br></br>
        <Footer noSubBG />
      </DarkTheme>
    );
}

export default ProjectDetails2Dark
