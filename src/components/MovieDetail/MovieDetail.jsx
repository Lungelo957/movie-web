import React from 'react';

const MovieDetail = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="movie-detail-overlay">
      <div className="movie-detail">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="detail-content">
          <img 
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'} 
            alt={movie.Title}
            className="detail-poster"
          />
          <div className="detail-info">
            <h2>{movie.Title} ({movie.Year})</h2>
            <p><strong>Rated:</strong> {movie.Rated}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>IMDb Rating:</strong> {movie.imdbRating}/10</p>
            {movie.Ratings && movie.Ratings.length > 0 && (
              <div>
                <strong>Other Ratings:</strong>
                <ul>
                  {movie.Ratings.map((rating, index) => (
                    <li key={index}>{rating.Source}: {rating.Value}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;