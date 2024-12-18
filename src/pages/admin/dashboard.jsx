// src/pages/projects.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

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
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center' }}>Projects</h1>
      <div style={buttonContainerStyle}>
        <button onClick={handleAddProject} style={buttonStyle}>Add Project</button>
        <button onClick={handleLogout} style={buttonStyle}>Logout</button>
      </div>
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
              key={project._id}
              className="project-card"
              style={cardStyle}
              onClick={() => handleCardClick(project)}
            >
              
        <img 
        src={`http://localhost:5000${project.coverImage}`} 
        alt={project.title} 
        style={imageStyle}  /> 

              <h2>Title: {project.title}</h2>
              <p>{project.description}</p>
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => handleEdit(project._id)} style={buttonStyle}>Edit</button>
                <button onClick={() => handleDelete(project._id)} style={buttonStyle}>Delete</button>
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

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '20px',
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
  textAlign: 'center',
};

const cardStyle = {
  flex: '1 1 calc(30% - 20px)',
  margin: '10px',
  padding: '15px',
  background: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  cursor: 'pointer',
};

const imageStyle = {
  width: '3%',  // Adjust width as needed
  height: 'auto',  // Maintain aspect ratio
  borderRadius: '4px',  // Optional: round the corners
  marginBottom: '10px',  // Space below the image
};

const buttonStyle = {
  margin: '5px',
  padding: '8px 12px',
  backgroundColor: '#007BFF',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default ProjectsPage;
