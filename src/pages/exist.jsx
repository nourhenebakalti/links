import React from 'react'
import DarkTheme from "../layouts/Dark";
import Navbar from "../components/Navbar";
import ProjectDetails2Header from "../components/Project-details2-header-exist";
import ProjectDetails2Introduction from "../components/Project-details2-introduction-exist";
import ProjectDetails2Images from "../components/Project-details2-images-exist";
import ProjectDetailsVideo from "../components/Project-details-video-exist";
import Works1Slider from "../components/Works1-slider-exist";
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
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <ProjectDetailsVideo
        videoBackground="/img/portfolio/project2/bgexist.png"
        videoUrl="https://www.youtube.com/watch?v=rxiOYX2fwP0&list=TLGGoooQlizkwvcwODAxMjAyNA&t"
        />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Works1Slider/>
        <Footer noSubBG />
      </DarkTheme>
    );
}

export default ProjectDetails2Dark
