import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styles from '../../styles/index.module.scss';

export default function Card({
  EditProject,
  DeleteProject,
  name,
  description,
  hidden,
  id,
  BackgroundImage,
}) {
  // Function to toggle the hidden property of a project by ID
  const toggleHidden = async (projectId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No auth token found');
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/auth/projects/${projectId}/toggle-hidden`, 
        {}, // Empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Project updated:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error updating project:', error.response?.data || error.message);
    }
  };
  

  const handleToggleHidden = () => {
    toggleHidden(id); 
  };

  const handleAction = (action) => () => {
    action(id);
  };

  return (
    <div className={`${styles.card} ${styles.ProjectCard}`} data-id={id}>
      <div
        className={`${styles.CardBackground}`}
        style={{ backgroundImage: `url(http://localhost:5000${BackgroundImage})` }}
      />
      <div className={styles.leftcontent}>
        <span onClick={handleToggleHidden}>
          {hidden ? (
            <FontAwesomeIcon className={styles.Icon} icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon className={styles.Icon} icon={faEye} />
          )}
        </span>
        <div>
          <h2>{name}</h2>
          <p>{description.length > 60 ? description.slice(0, 80) + '...' : description}</p>
        </div>
      </div>
      <div className={styles.rightcontent}>
        <span onClick={handleAction(EditProject)} className={`${styles.editbutton} `}>
          Edit
        </span>
        <span onClick={handleAction(DeleteProject)} className={styles.deleteButton}>
          <FontAwesomeIcon className={`${styles.DeleteIcon}`} icon={faTrash} />
        </span>
      </div>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  DeleteProject: PropTypes.func.isRequired,
  EditProject: PropTypes.func.isRequired,
  BackgroundImage: PropTypes.string.isRequired,
};
