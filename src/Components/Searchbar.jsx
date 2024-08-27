import React from 'react';
import '../assets/Style.css';
const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search by college name"
      onChange={handleChange}
    />
  );
};

export default SearchBar;