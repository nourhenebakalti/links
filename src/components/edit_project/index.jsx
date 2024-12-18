import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { useRouter } from 'next/router';

const EditProjectForm = ({ projectId }) => {
    const router = useRouter();
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
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/admin/admin_login');
            return;
        }

        const fetchProjectData = async () => {
            if (projectId) {
                try {
                    const response = await axios.get(`http://localhost:5000/auth/projects/${projectId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setProjectData(response.data);
                } catch (error) {
                    console.error('Error fetching project data:', error);
                    setErrorMessage('Error fetching project data. Please try again later.');
                }
            }
        };

        fetchProjectData();
    }, [router, projectId]);

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'coverImage') {
            setProjectData({ ...projectData, coverImage: files[0] });
        } else if (name === 'images') {
            setProjectData({ ...projectData, images: files });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        const formData = new FormData();
    
        // Append all fields to FormData
        for (const key in projectData) {
            if (key === 'coverImage' && projectData[key]) {
                formData.append(key, projectData[key]);
            } else if (key === 'images' && projectData[key].length > 0) {
                Array.from(projectData[key]).forEach(file => formData.append(key, file));
            } else if (projectData[key]) {
                formData.append(key, projectData[key]);
            }
        }
    
        try {
            const response = await axios.put(
                `http://localhost:5000/auth/projects/${projectId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            setSuccessMessage(`Successfully updated project: ${response.data.title}`);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            setErrorMessage('Failed to update the project.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div>
                <label>Title:</label>
                <input type="text" name="title" value={projectData.title} onChange={handleInputChange} />
            </div>
            <div>
                <label>Description:</label>
                <textarea name="description" value={projectData.description} onChange={handleInputChange} />
            </div>
            <div>
                <label>Website Link:</label>
                <input type="url" name="websiteLink" value={projectData.websiteLink} onChange={handleInputChange} />
            </div>
            <div>
                <label>YouTube Link:</label>
                <input type="url" name="youtubeLink" value={projectData.youtubeLink} onChange={handleInputChange} />
            </div>
            <div>
                <label>Client Type:</label>
                <select name="client_type" value={projectData.client_type} onChange={handleInputChange}>
                    <option value="">Select Client Type</option>
                    <option value="Tourism">Tourism</option>
                    <option value="Restaurants">Restaurants</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Events">Events</option>
                    <option value="Others">Others</option>
                </select>
            </div>
            <div>
                <label>About Section:</label>
                <textarea name="about_section" value={projectData.about_section} onChange={handleInputChange} />
            </div>
            <div>
                <label>Cover Image:</label>
                <input type="file" name="coverImage" accept="image/*" onChange={handleFileChange} />
            </div>
            <div>
                <label>Images:</label>
                <input type="file" name="images" accept="image/*" multiple onChange={handleFileChange} />
            </div>
            <button type="submit">Update Project</button>
        </form>
    );
};

export default EditProjectForm;
