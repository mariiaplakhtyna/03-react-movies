import { useEffect } from 'react';
import { createPortal } from 'react-dom';

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
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  function handleBackdropClick() {
    onClose();
  }

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
    >
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={css.closeBtn}
          onClick={onClose}
        >
          X
        </button>

        <img
          className={css.image}
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
        />

        <div className={css.content}>
          <h2>{movie.title}</h2>

          <p>User score: {movie.vote_average}</p>

          <p>Release date: {movie.release_date}</p>

          <p>{movie.overview}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}