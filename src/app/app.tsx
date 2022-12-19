import { useState, useEffect } from 'react';
import { BookData, BookRef } from './models/book';
import * as BooksAPI from '../app/api/BooksAPI';
import { Route, Routes } from 'react-router-dom';
import List from './components/list/list';
import Search from './components/search/search';

export function App() {
  const initialBooks = [] as BookData[];
  const [books, setBooks] = useState(initialBooks);

  useEffect(() => {
    BooksAPI.getAll()
      .then((res) => (res.length > 1 ? setBooks(res) : setBooks([])))
      .catch(() => setBooks([]));
  }, []);

  const updateBook = async (book: BookData | BookRef): Promise<void> => {
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

  return (
    <Routes>
      <Route
        path="/"
        element={<List onUpdateBook={updateBook} books={books} />}
      />

      <Route
        path="/search"
        element={<Search onUpdateBook={updateBook} books={books} />}
      />
    </Routes>
  );
}

export default App;
