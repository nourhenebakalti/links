import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/index.module.scss';

export default function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchicon}>
        <i className="fas fa-search"></i>
      </div>
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search projects..."
      />
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
