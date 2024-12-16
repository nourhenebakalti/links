// src/pages/projects.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Import useRouter from next/router

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Check for the token
    if (!token) {
      // Redirect to login if no token is found
      router.push('/admin/admin_login'); // Use router.push for redirection
    } else {
      const fetchProjects = async () => {
        try {
          const response = await axios.get('http://localhost:5000/auth/projects', {
            headers: {
              Authorization: `Bearer ${token}` // Include token in the Authorization header
            }
          });
          setProjects(response.data);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };

      fetchProjects(); // Call the fetchProjects function to retrieve data
    }
  }, [router]); // Add router as a dependency

  const handleCardClick = (project) => {
    setSelectedProject(project); // Set selected project to show details
  };

  const handleEdit = (projectId) => {
    console.log('Editing project:', projectId);
  };

  const handleDelete = (projectId) => {
    console.log('Deleting project:', projectId);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the token from localStorage
    router.push('/admin/admin_login'); // Redirect to login page
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center' }}>Projects</h1>
      <button onClick={handleLogout} style={buttonStyle}>Logout</button> {/* Logout button */}
      {selectedProject ? (
        <div style={detailStyle}>
          <h2>Title: {selectedProject.title}</h2>
          <p>{selectedProject.description}</p>
          <button onClick={() => setSelectedProject(null)} style={buttonStyle}>
            Back to Projects
          </button>
        </div>
      ) : (
        <div style={cardContainerStyle}>
          {projects.map((project) => (
            <div
              key={project.id} // Ensure `project.id` is unique for each project
              className="project-card"
              style={cardStyle}
              onClick={() => handleCardClick(project)}
            >
              <h2>Title: {project.title}</h2>
              <p>{project.description}</p>
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => handleEdit(project.id)} style={buttonStyle}>Edit</button>
                <button onClick={() => handleDelete(project.id)} style={buttonStyle}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  padding: '20px',
  backgroundColor: '#f4f4f9',
};

const cardContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginTop: '20px',
};

const detailStyle = {
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center'
};

const cardStyle = {
  flex: '1 1 calc(30% - 20px)',
  margin: '10px',
  padding: '15px',
  background: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  cursor: 'pointer'
};

const buttonStyle = {
  margin: '5px',
  padding: '8px 12px',
  backgroundColor: '#007BFF',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default ProjectsPage;
