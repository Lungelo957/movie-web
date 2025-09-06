import React, { useState, useEffect } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieDetail from '../../components/MovieDetail/MovieDetail';
import { searchMovies, getMovieDetails } from '../../services/api';

import SearchBar from '../../components/SearchBar/SearchBar';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('movies');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async (query, pageNum = 1) => {
    setLoading(true);
    setError('');
    setSearchQuery(query);
    let type = activeTab === 'movies' ? 'movie' : 'series';
    const data = await searchMovies(query, pageNum, type);
    if (data.Response === 'True') {
      if (type === 'movie') {
        setMovies(data.Search);
      } else {
        setSeries(data.Search);
      }
      setTotalResults(parseInt(data.totalResults, 10));
    } else {
      setError(data.Error);
      if (type === 'movie') {
        setMovies([]);
      } else {
        setSeries([]);
      }
      setTotalResults(0);
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

  useEffect(() => {
    // Fetch default movies/series on initial load
    if (activeTab === 'movies') {
      handleSearch('Avengers', page);
    } else {
      handleSearch('Game', page);
    }
    // eslint-disable-next-line
  }, [activeTab, page]);

  // Pagination controls
  const totalPages = Math.ceil(totalResults / 10);
  const handlePageChange = (newPage) => {
    setPage(newPage);
    handleSearch(searchQuery || (activeTab === 'movies' ? 'Avengers' : 'Game'), newPage);
  };

  // Background images (movie samples from web)
  const bgImages = [
    'https://cdn.wallpapersafari.com/53/79/ajwtby.jpg',
    'https://images.hdqwalls.com/download/venom-movie-2018-hd-lf-1920x1080.jpg',
    'https://wallpapercave.com/wp/8N3DSmd.jpg',
    'https://wallpapercave.com/wp/wp9049761.jpg',
    'https://images.filmibeat.com/img/popcorn/movie_lists/upcoming-bollywood-action-movies-of-2024-20240124135118-79.jpg',
  ];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100vw',
      overflow: 'hidden',
    }}>
      {/* Background image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        backgroundImage: `url(${bgImages[bgIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.25,
        transition: 'background-image 1s',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <header className="header">
          <div className="header-title">MOVIE WEB</div>
          <SearchBar onSearch={handleSearch} />
        </header>

        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '50px 0' }}>
          <button
            style={{
              border: 'none',
              background: 'none',
              fontWeight: activeTab === 'movies' ? 'bold' : 'normal',
              color: activeTab === 'movies' ? '#ffffffff' : '#ffffffff',
              fontSize: '1.2rem',
              marginRight: '32px',
              borderBottom: activeTab === 'movies' ? '2px solid #a11d22' : '2px solid transparent',
              cursor: 'pointer',
              paddingBottom: '8px',
            }}
            onClick={() => setActiveTab('movies')}
          >
            Movies
          </button>
          <button
            style={{
              border: 'none',
              background: 'none',
              fontWeight: activeTab === 'series' ? 'bold' : 'normal',
              color: activeTab === 'series' ? '#ffffffff' : '#ffffffff',
              fontSize: '1.2rem',
              borderBottom: activeTab === 'series' ? '2px solid #a11d22' : '2px solid transparent',
              cursor: 'pointer',
              paddingBottom: '8px',
            }}
            onClick={() => setActiveTab('series')}
          >
            Series
          </button>
        </div>

        {loading && <div className="loading">Searching...</div>}
        {error && <div className="error">{error}</div>}

        {/* Movies or Series grid */}
        {activeTab === 'movies' && (
          <div className="movies-grid">
            {movies.map(movie => (
              <MovieCard 
                key={movie.imdbID} 
                movie={movie} 
                onClick={handleMovieClick}
              />
            ))}
          </div>
        )}
        {activeTab === 'series' && (
          <div className="movies-grid">
            {series.map(seriesItem => (
              <MovieCard 
                key={seriesItem.imdbID} 
                movie={seriesItem} 
                onClick={handleMovieClick}
              />
            ))}
          </div>
        )}

        {selectedMovie && (
          <MovieDetail 
            movie={selectedMovie} 
            onClose={handleCloseDetail}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0', gap: '8px' }}>
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Prev</button>
            {[...Array(totalPages).keys()].slice(0, 5).map(num => (
              <button
                key={num + 1}
                onClick={() => handlePageChange(num + 1)}
                style={{ fontWeight: page === num + 1 ? 'bold' : 'normal' }}
              >
                {num + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;