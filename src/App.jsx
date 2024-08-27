import React, { useState, useEffect } from 'react';
import CollegeTable from './Components/CollgeTable';
import SearchBar from './Components/Searchbar';
import data from './data.json';
import './assets/Style.css';

const App = () => {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setColleges(data);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredColleges = colleges.filter(college =>
    college.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <CollegeTable colleges={filteredColleges} />
    </div>
  );
};

export default App;