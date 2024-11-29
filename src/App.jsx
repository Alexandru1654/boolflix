import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
const apiKey = 'e99307154c6dfb0b4750f6603256716d'

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to search for movies and TV series
  const searchMovies = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      // Request for movies
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=it-IT`
      );

      // Request for TV series
      const tvResponse = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=it-IT`
      );

      // Combination of Movie and TV Series Results
      setMovies([...movieResponse.data.results, ...tvResponse.data.results]);
    } catch (err) {
      setError('Errore durante la ricerca del film e serie TV.');
    } finally {
      setLoading(false);
    }
  };

  // Search click management
  const handleSearchClick = () => {
    searchMovies();
  };

  // Enter key press handling
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchMovies();
    }
  };

  // Function to display the flag
  const renderFlag = (languageCode) => {
    return <img src={`https://flagcdn.com/w20/${languageCode.toLowerCase()}.png`} alt={languageCode} />;
  };

  // Function to get the URL of the poster image
  const displayImageUrl = (posterPath) => {
    return posterPath ? `https://image.tmdb.org/t/p/w342/${posterPath}` : 'https://via.placeholder.com/342x500';
  };

  return (
    <div className="App">
      <header>
        <h1>BoolFlix</h1>
        <p>Cerca i tuoi film e serie preferiti</p>
      </header>

      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca un film o una serie..."
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearchClick}>Cerca</button>
      </div>

      {loading && <p>Caricamento...</p>}
      {error && <p>{error}</p>}

      <div className="results">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={displayImageUrl(movie.poster_path)} alt={movie.title || movie.name} />
            <h3>{movie.title || movie.name}</h3>
            <p><strong>Originale:</strong> {movie.original_title || movie.original_name}</p>
            <p><strong>Lingua:</strong> {renderFlag(movie.original_language)}</p>
            <p><strong>Voto:</strong> {movie.vote_average}</p>
            <p><strong>Panoramica:</strong> {movie.overview || 'Nessuna panoramica disponibile.'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
