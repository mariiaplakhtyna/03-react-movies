
import css from './SearchBar.module.css';
import toast from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  function handleSubmit(formData: FormData) {
    const value = formData.get('query') as string;

   if (!value.trim()) {
  toast.error('Please enter search term!');
  return;
}

    onSubmit(value);
  }

  return (
    <header className={css.header}>
      <form action={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />

        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}