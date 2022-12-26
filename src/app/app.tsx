import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/home-page';
import Search from './pages/search/search';
import { BooksProvider } from './context/booksContext';
import BookDetails from './pages/book-details/book-details';

export function App() {
  return (
    <BooksProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BooksProvider>
  );
}

export default App;
