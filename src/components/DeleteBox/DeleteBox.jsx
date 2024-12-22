import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styles from '../../styles/index.module.scss';

export default function DeleteBox({ DeleteActive, DeletePopUp, CurrentId, Project }) {
  const currentProjectIndex = Project.findIndex((p) => p._id === CurrentId);

  if (currentProjectIndex === -1) {
    return null;
  }

  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No auth token found');
        return;
      }

      await axios.delete(`http://localhost:5000/auth/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      DeletePopUp();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return DeleteActive ? (
    <div className={styles.DeleteBox}>
      <span className={styles.Icon} onClick={DeletePopUp}>
        <FontAwesomeIcon className={styles.CancelIcon} icon={faXmark} />
      </span>
      <div className={styles.DeleteContent}>
        <h1>Are You Sure You Want To Delete {Project[currentProjectIndex]?.title}?</h1>
        <p className={styles.confirmationmessage}>
          Are you certain you want to delete this? This action is permanent and cannot be undone.
          Please confirm if you wish to proceed.
        </p>
      </div>
      <button
        className={styles.ApproveDelete}
        onClick={() => deleteProject(CurrentId)}
      >
        Delete Project
      </button>
    </div>
  ) : null;
}

DeleteBox.propTypes = {
  DeleteActive: PropTypes.bool.isRequired,
  DeletePopUp: PropTypes.func.isRequired,
  CurrentId: PropTypes.string,
  Project: PropTypes.array.isRequired,
};
