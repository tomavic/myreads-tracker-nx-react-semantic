import { Route, Routes, useRoutes } from 'react-router-dom';
import HomePage from './pages/home/home-page';
import Search from './pages/search/search';
import { BooksProvider } from './context/books-context';
import BookDetails from './components/book-details/book-details';

export function App() {
  return (
    <BooksProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="*"
          element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
        />
      </Routes>
    </BooksProvider>
  );
}

export default App;
