import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/home-page';
import Search from './pages/search/search';
import { BooksProvider } from './context/books-context';
import BookDetails from './pages/book-details/book-details';
import NotFound from './layouts/not-found';
export function App() {
  return (
    <BooksProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BooksProvider>
  );
}

export default App;
