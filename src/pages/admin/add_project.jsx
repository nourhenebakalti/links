import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddProjectForm = () => {
    const router = useRouter(); // Initialize useRouter
    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        websiteLink: '',
        youtubeLink: '',
        client_type: '',
        about_section: '',
        coverImage: null,
        images: [],
    });

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'coverImage') {
            setProjectData({ ...projectData, coverImage: files[0] }); // Handle cover image separately
        } else {
            setProjectData({ ...projectData, images: files }); // Handle other images
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in projectData) {
            if (key === 'coverImage' && projectData.coverImage) {
                formData.append('coverImage', projectData.coverImage); // Append cover image
            } else if (key === 'images') {
                Array.from(projectData.images).forEach(file => {
                    if (file) {
                        formData.append('images', file); // Append image files
                    }
                });
            } else {
                formData.append(key, projectData[key]); // Append other project data
            }
        }

        console.log('Form Data:', Array.from(formData.entries())); // Check form data before submitting

        const token = localStorage.getItem('authToken'); // Retrieve the token from local storage

        try {
            const response = await axios.post('http://localhost:5000/auth/projects', formData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Project created:', response.data);
            // Reset the form data after successful submission
            setProjectData({
                title: '',
                description: '',
                websiteLink: '',
                youtubeLink: '',
                client_type: '',
                about_section: '',
                coverImage: null,
                images: [],
            });
            
        } catch (error) {
            console.error('Error creating project:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={projectData.title}
                    onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={projectData.description}
                    onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                    required
                />
            </div>
            <div>
                <label>Website Link:</label>
                <input
                    type="url"
                    name="websiteLink"
                    value={projectData.websiteLink}
                    onChange={(e) => setProjectData({ ...projectData, websiteLink: e.target.value })}
                />
            </div>
            <div>
                <label>YouTube Link:</label>
                <input
                    type="url"
                    name="youtubeLink"
                    value={projectData.youtubeLink}
                    onChange={(e) => setProjectData({ ...projectData, youtubeLink: e.target.value })}
                />
            </div>
            <div>
                <label>Client Type:</label>
                <input
                    type="text"
                    name="client_type"
                    value={projectData.client_type}
                    onChange={(e) => setProjectData({ ...projectData, client_type: e.target.value })}
                />
            </div>
            <div>
                <label>About Section:</label>
                <textarea
                    name="about_section"
                    value={projectData.about_section}
                    onChange={(e) => setProjectData({ ...projectData, about_section: e.target.value })}
                />
            </div>
            <div>
                <label>Cover Image:</label>
                <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
            </div>
            <div>
                <label>Images:</label>
                <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                />
            </div>
            <button type="submit">Add Project</button>
        </form>
    );
};

export default AddProjectForm;
