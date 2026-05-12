import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({
  movie,
  onClose,
}: MovieModalProps) {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className={css.image}
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
        />

        <div className={css.content}>
          <h2>{movie.title}</h2>

          <p>User score: {movie.vote_average}</p>

          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}