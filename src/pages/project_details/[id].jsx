import React, { useEffect, useState } from 'react';
import DarkTheme from "../../layouts/Dark";
import Navbar from "../../components/Navbar";
import { Helmet } from "react-helmet";
import ProjectDetailsHeader from "../../components/Project-details-header";
import ProjectDetailsIntroduction from "../../components/Project-details2-introduction";
import ProjectDetailsImages from "../../components/Project-details2-images";
import ProjectDetailsDescription from "../../components/Project-details-description";
import ProjectDetailsVideo from "../../components/Project-details-video";
import Works1Slider from "../../components/Works1-slider";
import Footer from "../../components/Footer";
import { useRouter } from 'next/router';
import CallToAction from "../../components/Call-to-action";

const ProjectDetails = () => {
    const navbarRef = React.useRef(null);
    const [loading, setLoading] = useState(true);
    const logoRef = React.useRef(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    const [project, setProject] = useState(null);
    
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

    useEffect(() => {
      let isMounted = true;
  
      const fetchProject = async () => {
          try {
              setLoading(true); // Start loading
              const response = await fetch(`http://localhost:5000/api/projects/${id}`);
              
              if (!response.ok) throw new Error('Project not found');
              const data = await response.json();
              console.log("hhhh0",data);
              if (isMounted) setProject(data);
          } catch (err) {
              if (isMounted) setError(err.message);
          } finally {
              if (isMounted) setLoading(false); // End loading
          }
      };
  
      if (id) {
          fetchProject();
          
      }
  
      return () => {
          isMounted = false;
      };
  }, [id]);
  


   


    return (
      <DarkTheme>
        <Navbar nr={navbarRef} lr={logoRef} />
        <ProjectDetailsHeader img={project?.coverImage} client_type={project?.client_type} title={project?.title} categories={project?.categories} location={project?.location} />
        <Helmet>
        <title>Links Station | Penelope Digital Development</title>
        <meta name="description" content="Essential services provided to Penelope Thalasso & Spa for their participation in Les Termailes Paris: Content production, Digital Marketing Campaigns, Social Paid Advertising, and Social Media Management."/>
        <meta name="keywords" content="Penelope Thalasso & Spa, Les Termailes Paris, content production, promotional videos, commercial photoshoot, digital marketing campaigns, social paid advertising, social media management"/>
        </Helmet>
        <ProjectDetailsIntroduction des={project?.description} bulletPoints={project?.bulletPoints} />
        {project?.images?.length > 1 && <ProjectDetailsImages images={project?.images} />}
        {project?.about_section && <ProjectDetailsDescription title={project?.title} about_section={project?.about_section} />}
        <ProjectDetailsVideo
        videoUrl={project?.youtubeLink}
        />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {project?.behindTheSeance && <Works1Slider behindTheSeancesPictures={project?.behindTheSeancesPictures} />}
        <CallToAction theme="dark" />
        <Footer noSubBG />
      </DarkTheme>
    );
}

export default ProjectDetails;