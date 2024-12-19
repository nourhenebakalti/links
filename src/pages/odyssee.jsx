import React from 'react'
import DarkTheme from "../layouts/Dark";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import ProjectDetails2Header from "../components/Project-details2-header-odyssee";
import ProjectDetails2Introduction from "../components/Project-details2-introduction-odyssee";
import ProjectDetails2Images from "../components/Project-details2-images";
import ProjectDetailsDescription from "../components/Project-details-description";
import ProjectDetailsVideo from "../components/Project-details-video";
import Works1Slider from "../components/Works1-slider";
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
        <Helmet>
        <title>Links Station | Penelope Digital Development</title>
        <meta name="description" content="Essential services provided to Penelope Thalasso & Spa for their participation in Les Termailes Paris: Content production, Digital Marketing Campaigns, Social Paid Advertising, and Social Media Management."/>
        <meta name="keywords" content="Penelope Thalasso & Spa, Les Termailes Paris, content production, promotional videos, commercial photoshoot, digital marketing campaigns, social paid advertising, social media management"/>
        </Helmet>
        <ProjectDetails2Introduction />
        <ProjectDetails2Images />
        <ProjectDetailsDescription />
        <ProjectDetailsVideo
        videoUrl="https://www.youtube.com/watch?v=TBaGXRPv0N4"
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
