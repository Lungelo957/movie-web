import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  const handleClick = () => {
    onClick(movie.imdbID);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img 
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://dummyimage.com/300x450/cccccc/000000&text=No+Image'} 
        alt={movie.Title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;