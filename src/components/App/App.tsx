import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [selectedMovie, setSelectedMovie] =
    useState<Movie | null>(null);

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
        <MovieGrid
          movies={movies}
          onSelect={setSelectedMovie}
        />
      )}

      {!isLoading &&
        !isError &&
        query &&
        movies.length === 0 && <p>No movies found.</p>}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

