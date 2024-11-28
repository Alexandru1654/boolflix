import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
const apiKey = 'e99307154c6dfb0b4750f6603256716d'

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovies = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=it-IT`
      );
      setMovies(response.data.results);
    } catch (err) {
      setError('Errore durante la ricerca del film.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    searchMovies();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchMovies();
    }
  };

  return (
    <div className="App">
      <header>
        <h1>BoolFlix</h1>
        <p>Cerca i tuoi film preferiti</p>
      </header>

      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca un film..."
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearchClick}>Cerca</button>
      </div>

      {loading && <p>Caricamento...</p>}

      {error && <p>{error}</p>}

      <div className="results">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h3>{movie.title}</h3>
            <p><strong>Originale:</strong> {movie.original_title}</p>
            <p><strong>Lingua:</strong> {movie.original_language}</p>
            <p><strong>Voto:</strong> {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;