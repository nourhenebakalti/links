// src/pages/projects.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import AdminDashboard from '../../components/AdminDashboard';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/admin/admin_login');
    } else {
      const fetchProjects = async () => {
        try {
          const response = await axios.get('http://localhost:5000/auth/projects', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setProjects(response.data);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };

      fetchProjects();
    }
  }, [router]);

  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  const handleEdit = (projectId) => {
    // Navigate to the edit page of the specific project
    router.push(`/admin/edit_project/${projectId}`);
  };
  

  const handleDelete = async (projectId) => {
    
    if (window.confirm('Are you sure you want to delete this project?')) {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await axios.delete(`http://localhost:5000/auth/projects/${projectId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          // Remove the deleted project from state
          setProjects(prevProjects => {
            const updatedProjects = prevProjects.filter(project => project._id !== projectId);
            // If the deleted project was selected, clear the selected project
            if (selectedProject && selectedProject._id === projectId) {
              setSelectedProject(null); // Deselect the project
            }
            return updatedProjects;
          });
        } catch (error) {
          console.error('Error deleting project:', error);
        }
      } else {
        console.error('No auth token found');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/admin/admin_login');
  };

  const handleAddProject = () => {
    router.push('/admin/add_project');
  };

  return (
    <AdminDashboard/>
  );
;}

export default ProjectsPage;
