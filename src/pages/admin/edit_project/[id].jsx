import React, { useEffect } from 'react';
import EditProjectForm from '../../../components/edit_project/index'; // Adjust the path based on your folder structure
import { useRouter } from 'next/router';

const EditProject = () => {
    const router = useRouter(); 
    const { id } = router.query; // Get the project ID from the URL
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            // Redirect to the login page if the token does not exist
            router.push('/admin/admin_login');
        }
    }, [router]); // Adding router to the dependency array to ensure it works correctly

    if (!id) {
        return null; // You can return a loading state or similar while the ID is being retrieved
    }
   
    return <EditProjectForm projectId={id} />;
};

export default EditProject;
