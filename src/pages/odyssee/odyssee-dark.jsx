import React from 'react'
import DarkTheme from "../../layouts/Dark";
import Navbar from "../../components/Navbar";
import ProjectDetails2Header from "../../components/Project-details2-header-odyssee";
import ProjectDetails2Introduction from "../../components/Project-details2-introduction-odyssee";
import ProjectDetails2Images from "../../components/Project-details2-images-odyssee";
import ProjectDetailsDescription from "../../components/Project-details-description";
import ProjectDetailsVideo from "../../components/Project-details-video";
import Footer from "../../components/Footer";

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
        <ProjectDetailsDescription />
        <ProjectDetailsVideo
        videoBackground="/img/portfolio/project2/bg.jpg"
        videoUrl="https://www.facebook.com/OdysseeResortZarzis/videos/1073016356366796/"
        />
        <Footer noSubBG />
      </DarkTheme>
    );
}

export default ProjectDetails2Dark
