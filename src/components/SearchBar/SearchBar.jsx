import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form className="header-search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search a movie"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* You can add a search icon here if you want */}
    </form>
  );
};

export default SearchBar;