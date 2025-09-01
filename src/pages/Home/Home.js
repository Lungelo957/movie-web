import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieDetail from '../../components/MovieDetail/MovieDetail';
import { searchMovies, getMovieDetails } from '../../services/api';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    setSearchQuery(query);
    
    const data = await searchMovies(query);
    
    if (data.Response === 'True') {
      setMovies(data.Search);
    } else {
      setError(data.Error);
      setMovies([]);
    }
    
    setLoading(false);
  };

  const handleMovieClick = async (id) => {
    const data = await getMovieDetails(id);
    if (data.Response === 'True') {
      setSelectedMovie(data);
    }
  };

  const handleCloseDetail = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <SearchBar onSearch={handleSearch} />
      
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard 
            key={movie.imdbID} 
            movie={movie} 
            onClick={handleMovieClick}
          />
        ))}
      </div>
      
      {selectedMovie && (
        <MovieDetail 
          movie={selectedMovie} 
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default Home;