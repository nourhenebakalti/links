import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from '../../styles/index.module.scss';

export default function SideBar({ toggleHiddenDisplay }) {

  const [activeButton, setActiveButton] = useState('projects'); 
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); 
    if (buttonName === 'projects') {
      toggleHiddenDisplay(false); 
    } else if (buttonName === 'hiddenProjects') {
      toggleHiddenDisplay(true);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h1><span>Admin</span>Dashboard</h1>
      </div>
      <h2 className={styles.navigationTitle}>Navigation</h2>
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
    </aside>
  );
}

SideBar.propTypes = {
  toggleHiddenDisplay: PropTypes.func.isRequired,
};
