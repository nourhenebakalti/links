// src/pages/admin/dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const AdminDashboard = () => {
  const [token, setToken] = useState('');
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    coverImage: '',
    images: [],
    websiteLink: '',
    youtubeLink: '',
    client_type: '',
    about_section: '',
  });
  const [message, setMessage] = useState('');
  const [filePreviews, setFilePreviews] = useState([]); // For image previews
  const router = useRouter();

  useEffect(() => {
    const checkAuthToken = () => {
      const authToken = localStorage.getItem('authToken');
      setToken(authToken);

      if (!authToken) {
        router.push('/admin/admin_login');
      }
    };

    checkAuthToken();
    const interval = setInterval(checkAuthToken, 1000); 
    return () => clearInterval(interval);
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'images') {
      setProjectData({
        ...projectData,
        [name]: value.split(',').map((img) => img.trim()),
      });
    } else {
      setProjectData({
        ...projectData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProjectData((prevState) => ({
      ...prevState,
      images: files,
    }));

    // Generate previews
    setFilePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Append project data to FormData
    for (const key in projectData) {
      if (Array.isArray(projectData[key])) {
        projectData[key].forEach(file => {
          formData.append('images', file); // Append files for images
        });
      } else {
        formData.append(key, projectData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/auth//projects', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Project added successfully!');
      
      // Reset the form fields
      setProjectData({
        title: '',
        description: '',
        coverImage: '',
        images: [],
        websiteLink: '',
        youtubeLink: '',
        client_type: '',
        about_section: '',
      });
      setFilePreviews([]); // Clear previews
    } catch (error) {
      console.error('Error adding project:', error);
      setMessage('Failed to add project');
    }
  };

  if (!token) return null;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Add New Project</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={projectData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={projectData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Cover Image URL:</label>
          <input type="text" name="coverImage" value={projectData.coverImage} onChange={handleChange} />
        </div>
        <div>
          <label>Images:</label>
          <input type="file" name="images" accept="image/*" multiple onChange={handleFileChange} />
        </div>
        <div>
          {filePreviews.map((file, index) => (
            <img key={index} src={file} alt={`Preview ${index}`} style={{ width: '100px', height: 'auto', margin: '5px' }} />
          ))}
        </div>
        <div>
          <label>Website Link:</label>
          <input type="text" name="websiteLink" value={projectData.websiteLink} onChange={handleChange} />
        </div>
        <div>
          <label>YouTube Link:</label>
          <input type="text" name="youtubeLink" value={projectData.youtubeLink} onChange={handleChange} />
        </div>
        <div>
          <label>Client Type:</label>
          <input type="text" name="client_type" value={projectData.client_type} onChange={handleChange} />
        </div>
        <div>
          <label>About Section:</label>
          <textarea name="about_section" value={projectData.about_section} onChange={handleChange} />
        </div>
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
