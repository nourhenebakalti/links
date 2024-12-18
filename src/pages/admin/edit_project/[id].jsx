import React from 'react';
import EditProjectForm from '../../../components/edit_project/index'; // Adjust the path based on your folder structure
import { useRouter } from 'next/router';

const EditProject = () => {
    const router = useRouter(); 
    const { id } = router.query; // Get the project ID from the URL

    // Render the EditProjectForm and pass the ID as a prop if needed
    return <EditProjectForm projectId={id} />;
};

export default EditProject;
