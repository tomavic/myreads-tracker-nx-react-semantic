import { Route, Routes, useRoutes } from 'react-router-dom';
import HomePage from './pages/home/home-page';
import Search from './pages/search/search';
import { BooksProvider } from './context/booksContext';
import routes from './routes';

export function App() {
  const content = useRoutes(routes);
  return content;

  // return (
  //   <BooksProvider>
  //     <Routes>
  //       <Route path="/" element={<HomePage />} />
  //       <Route path="/search" element={<Search />} />
  //     </Routes>
  //   </BooksProvider>
  // );
}

export default App;
