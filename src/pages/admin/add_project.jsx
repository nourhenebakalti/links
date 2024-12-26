import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useRouter } from 'next/router';
import Styles from '../../layouts/add_project.module.scss';

const AddProjectForm = () => {
    const router = useRouter(); 
    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        websiteLink: '',
        youtubeLink: '',
        client_type: '',
        about_section: '',
        categories: '',
        location: '',
        coverImage: null,
        images: [],
        bulletPoints: [''], 
        behindTheSeance: false,
        behindTheSeancesPictures: [] 
    });
    const [successMessage, setSuccessMessage] = useState(''); 

    useEffect(() => {
        const token = localStorage.getItem('authToken'); 
        if (!token) {
            router.push('/admin/admin_login'); 
        }
    }, [router]); 

    const handleFileChange = (e) => {
        const { name, files } = e.target;

        if (name === 'coverImage') {
            setProjectData({ ...projectData, coverImage: files[0] }); 
        } else if (name === 'images') {
            // Limit for main images
            if (files.length > 5) {
                alert("You can only upload a maximum of 5 images.");
                e.target.value = ''; // Clear the input
                return;
            }
            setProjectData({ ...projectData, images: files }); 
        } else if (name === 'behindTheSeancesPictures') {
            // Limit for Behind the Seance Pictures
            if (files.length > 5) {
                alert("You can only upload a maximum of 5 behind-the-seance pictures.");
                e.target.value = ''; // Clear the input
                return;
            }
            setProjectData({ ...projectData, behindTheSeancesPictures: files }); // Set for multiple uploads
        }
    };

    const handleBulletPointChange = (index, value) => {
        const newBulletPoints = [...projectData.bulletPoints];
        newBulletPoints[index] = value;
        setProjectData({ ...projectData, bulletPoints: newBulletPoints });
    };

    const addBulletPoint = () => {
        setProjectData({ ...projectData, bulletPoints: [...projectData.bulletPoints, ''] }); // Add a new empty bullet point
    };

    const deleteBulletPoint = (index) => {
        const newBulletPoints = projectData.bulletPoints.filter((_, i) => i !== index); 
        setProjectData({ ...projectData, bulletPoints: newBulletPoints });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in projectData) {
            if (key === 'coverImage' && projectData.coverImage) {
                formData.append('coverImage', projectData.coverImage); 
            } else if (key === 'images') {
                Array.from(projectData.images).forEach(file => {
                    if (file) {
                        formData.append('images', file); 
                    }
                });
            } else if (key === 'behindTheSeancesPictures') {
                Array.from(projectData.behindTheSeancesPictures).forEach(file => {
                    if (file) {
                        formData.append('behindTheSeancesPictures', file); // Append each picture file
                    }
                });
            } else if (key === 'bulletPoints') {
                projectData.bulletPoints.forEach(point => {
                    formData.append('bulletPoints', point); 
                });
            } else {
                formData.append(key, projectData[key]); 
            }
        }

        const token = localStorage.getItem('authToken'); 

        try {
            const response = await axios.post('http://localhost:5000/auth/projects', formData, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccessMessage(`Successfully created project: ${response.data.title}`);
            setProjectData({
                title: '',
                description: '',
                websiteLink: '',
                youtubeLink: '',
                client_type: '',
                about_section: '',
                categories: '',
                location: '',
                coverImage: null,
                images: [],
                bulletPoints: [''],
                behindTheSeance: false,
                behindTheSeancesPictures: [] 
            });
            
        } catch (error) {
            console.error('Error creating project:', error.response ? error.response.data : error.message);
            setSuccessMessage('');
        }
    };

    return (
        <div className={Styles.container}>
            <form className={Styles.form} onSubmit={handleSubmit}>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
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
                    <select
                        name="client_type"
                        value={projectData.client_type}
                        onChange={(e) => setProjectData({ ...projectData, client_type: e.target.value })}
                    >
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
                    <textarea
                        name="about_section"
                        value={projectData.about_section}
                        onChange={(e) => setProjectData({ ...projectData, about_section: e.target.value })}
                    />
                </div>
                <div>
                    <label>Categories:</label>
                    <input
                        type="text"
                        name="categories"
                        value={projectData.categories}
                        onChange={(e) => setProjectData({ ...projectData, categories: e.target.value })}
                        placeholder="Enter categories separated by commas"
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={projectData.location}
                        onChange={(e) => setProjectData({ ...projectData, location: e.target.value })}
                    />
                </div>
                <div>
                    <label>Behind the Seance:</label>
                    <input
                        type="checkbox"
                        checked={projectData.behindTheSeance}
                        onChange={(e) => setProjectData({ ...projectData, behindTheSeance: e.target.checked })}
                    />
                </div>
                {/* Conditionally render Behind Seance Pictures input */}
                {projectData.behindTheSeance && (
                    <div>
                        <label>Behind the Seance Pictures:</label>
                        <input
                            type="file"
                            name="behindTheSeancesPictures"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange} // File input for behindTheSeancesPictures
                        />
                    </div>
                )}
                {/* Bullet Points Section */}
                <div>
                    <label>Bullet Points:</label>
                    {projectData.bulletPoints.map((bulletPoint, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <input
                                type="text"
                                value={bulletPoint}
                                onChange={(e) => handleBulletPointChange(index, e.target.value)}
                                placeholder="Enter bullet point" 
                            />
                            <button type="button" onClick={() => deleteBulletPoint(index)}>Delete</button>
                        </div>
                    ))}
                    <button type="button" onClick={addBulletPoint}>Add Another Bullet Point</button>
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
                <button className={Styles.addbutton} type="submit">Add Project</button>
            </form>
        </div>
    );
};

export default AddProjectForm;
