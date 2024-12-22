import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from '../../styles/index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
export default function SideBar({ toggleHiddenDisplay }) {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState('projects'); 
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); 
    if (buttonName === 'projects') {
      toggleHiddenDisplay(false); 
    } else if (buttonName === 'hiddenProjects') {
      toggleHiddenDisplay(true);
    }
  };

  const ExitDashboard=()=>{
    localStorage.removeItem('authToken');
    router.push('/admin/admin_login');

  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h1><span>Admin</span>Dashboard</h1>
      </div>
      <ul className={styles.navigationList}>
        <li className={`${styles.text} ${activeButton === 'projects' ? styles.active : ''}`}
            onClick={() => handleButtonClick('projects')}>
          <span>
            Projects
          </span>
        </li>
        <li
          className={`${styles.text} ${activeButton === 'hiddenProjects' ? styles.active : ''}`}
          onClick={() => handleButtonClick('hiddenProjects')}
        >
          <span>
            Hidden Projects
          </span>
        </li>
      </ul>
      <div onClick={() => ExitDashboard()} className={styles.ExitButton}>
      <FontAwesomeIcon className={styles.ExitIcon} icon={faRightFromBracket} />
      <span className={styles.ExitText}>Log Out</span>
      </div>
    </aside>
  );
}

SideBar.propTypes = {
  toggleHiddenDisplay: PropTypes.func.isRequired,
};
