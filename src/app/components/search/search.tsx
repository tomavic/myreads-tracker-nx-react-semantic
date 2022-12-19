/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React from 'react';
import { BookData, BookRef } from 'src/app/models/book';
import { MAX_RESULTS, PATHS } from 'src/app/models/conf';
import BookGrid from '../book-grid/bookgrid';
import * as BooksAPI from '../../api/BooksAPI';

type SearchProps = {
  books: BookData[];
  onUpdateBook: (book: BookData | BookRef) => void;
};

export default function Search({ onUpdateBook, books }: SearchProps) {
  const SEARCH_INPUT = 'search-input';
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([] as BookData[]);

  const updateBookshelf = (book: BookData) => {
    const existingBook = books.find((b) => b.id === book.id);
    return {
      ...book,
      shelf: existingBook ? existingBook.shelf : 'none',
    };
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.trim();
    setSearch(e.target.value);
    if (term.length > 0) {
      BooksAPI.search(term, MAX_RESULTS)
        .then((res) => (res.length > 1 ? setResults(res) : setResults([])))
        .catch(() => setResults([]));
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    const handleOnEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') navigate(PATHS.list);
    };
    document.addEventListener('keyup', handleOnEsc);
    return () => {
      document.removeEventListener('keyup', handleOnEsc);
    };
  }, [navigate]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to={PATHS.list}>
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              id={SEARCH_INPUT}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={true}
              type="text"
              placeholder="Search by title, author, or ISBN"
              value={search}
              onChange={handleOnChange}
            />
          </div>
        </div>

        <BookGrid
          className="search-books-results"
          books={results.map(updateBookshelf)}
          onUpdateBook={onUpdateBook}
        />
      </div>
    </DndProvider>
  );
}
