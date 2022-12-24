import { createContext, useContext, useEffect, useState } from 'react';
import { BookData, BookDraggedItem } from '../models/book';
import * as BooksAPI from '../../app/api/BooksAPI';
import { MAX_RESULTS } from '../models/conf';

export type AppState = {
  books: BookData[];
  loading: boolean;
  search: string;
  results: BookData[];
  updateBook: (book: BookData | BookDraggedItem) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BooksContext = createContext<AppState>({} as AppState);

function BooksProvider(props: any) {
  const [books, setBooks] = useState<Array<BookData>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<BookData[]>([]);

  const updateBook = async (
    book: BookData | BookDraggedItem
  ): Promise<void> => {
    const existingBook = books.find((b) => b.id === book.id);
    try {
      if (existingBook) {
        const shelf = existingBook.shelf;
        if (shelf === book.shelf) {
          //No change
          console.log('Target and origin are the same', book);
          return;
        } else if (shelf === 'none') {
          //Remove
          await BooksAPI.update(book, book.shelf);
          setBooks(books.filter((b) => b.id !== existingBook.id));
        } else {
          //Change
          await BooksAPI.update(book, book.shelf);
          Object.assign(existingBook, book);
          setBooks([...books]);
        }
      } else {
        await BooksAPI.update(book, book.shelf);
        setBooks([...books, book] as BookData[]);
      }
    } catch (e) {
      console.log('Error updating book:', e);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.trim();
    setSearch(e.target.value);
    if (term.length > 0) {
      setLoading(true);
      BooksAPI.search(term, MAX_RESULTS)
        .then((res) => (res.length > 1 ? setResults(res) : setResults([])))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    console.log('Effect ');
    setLoading(true);
    BooksAPI.getAll()
      .then((res) => (res.length > 1 ? setBooks(res) : setBooks([])))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  const booksData = {
    books,
    updateBook,
    loading,
    handleSearch,
    search,
    results,
  };

  return <BooksContext.Provider value={booksData} {...props} />;
}

// Here we create a custom hook that allows us to consume
// the books context
function useBooksContext() {
  return useContext(BooksContext);
}

export { BooksProvider, useBooksContext };
