const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query, page = 1, type) => {
  try {
    let url = `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`;
    if (type) {
      url += `&type=${type}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return { Response: 'False', Error: 'Failed to fetch movies' };
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return { Response: 'False', Error: 'Failed to fetch movie details' };
  }
};