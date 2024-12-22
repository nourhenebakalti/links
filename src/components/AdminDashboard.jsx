import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './ProjectCard/ProjectCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar/SearchBar';
import SideBar from './SideBar/SideBar';
import DeleteBox from './DeleteBox/DeleteBox';
import EditBox from './EditBox/EditBox';
import styles from '../styles/index.module.scss';
import { useRouter } from 'next/router';
function AdminDashboard() {
  const [filterHidden, setFilterHidden] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentId, setCurrentId] = useState(null);
  const [deleteActive, setDeleteActive] = useState(false);
  const [addActive, setAddActive] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/admin/admin_login'); 
  }

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const toggleHiddenDisplay = (value) => setFilterHidden(value);

  const handleSearch = (searchValue) => setSearchText(searchValue);

  const filteredData = data.filter(
    (c) =>
      (filterHidden ? c.hidden : !c.hidden) &&
      (!searchText || c.title.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleProjectAction = (id, actionType) => {
    setCurrentId(id);
    if (actionType === 'delete') {
      setDeleteActive((prev) => !prev);
      setEditActive(false); 
    } else if (actionType === 'edit') {
    
      router.push(`/admin/edit_project/${id}`);

    }
  };

  const addProject = () => {
    setAddActive(true);
    setEditActive(false);
    router.push('/admin/add_project');
  };

  return (
    <div className={styles.all}>
      <div
        className={`${styles.ParamsContainer} ${
          deleteActive || editActive ? styles.ShowParams : styles.DontShowParams
        }`}
      >
        <DeleteBox
          Project={data}
          DeletePopUp={() => handleProjectAction(currentId, 'delete')}
          CurrentId={currentId}
          DeleteActive={deleteActive}
        />
        <EditBox
          EditProject={() => handleProjectAction(currentId, 'edit')}
          CurrentId={currentId}
          AddActive={addActive}
          EditActive={editActive}
        />
      </div>
      <div className={styles.container}>
        <SideBar toggleHiddenDisplay={toggleHiddenDisplay} />
        <main>
          <div className={styles.mainheader}>
            <h1>Total Projects ({filteredData.length})</h1>
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className={styles.cardwrapper}>
            {filteredData.map((c) => (
              <Card
                key={c._id}
                id={c._id}
                name={c.title}
                description={c.description}
                BackgroundImage={c.coverImage}
                hidden={c.hidden}
                DeleteProject={() => handleProjectAction(c._id, 'delete')}
                EditProject={() => handleProjectAction(c._id, 'edit')}
              />
            ))}
            <div onClick={addProject} className={`${styles.card} ${styles.addcard}`}>
              <FontAwesomeIcon className={styles.addicon} icon={faPlus} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
