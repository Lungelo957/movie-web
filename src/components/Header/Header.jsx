import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">MOVIE WEB</div>
      <div className="header-search">
        {/* The search bar will be rendered here by the SearchBar component in Home.jsx */}
      </div>
    </header>
  );
};

export default Header;