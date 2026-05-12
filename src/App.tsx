import { useEffect, useState } from 'react';
import SearchBar from './components/App/SearchBar/SearchBar';
import MovieGrid from './components/App/MovieGrid/MovieGrid';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { fetchMovies } from './services/movieService';
import type { Movie } from './types/movie';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!query) return;

    async function getMovies() {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await fetchMovies(query);
        setMovies(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovies();
  }, [query]);

  return (
    <div>
      <SearchBar onSubmit={setQuery} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && movies.length > 0 && (
  <MovieGrid movies={movies} />
)}

{!isLoading && !isError && query && movies.length === 0 && (
  <p>No movies found.</p>
)}
    </div>
  );
}

