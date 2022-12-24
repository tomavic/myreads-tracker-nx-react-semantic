import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BookData } from 'src/app/models/book';
import { PATHS } from 'src/app/models/conf';
import BookGrid from '../../components/book-grid/book-grid';

import { useBooksContext } from 'src/app/context/books-context';
import { Player } from '@lottiefiles/react-lottie-player';
import { Button, Container, Form, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function Search() {
  const { handleSearch, search, loading, results, books } = useBooksContext();

  const SEARCH_INPUT = 'search-input';
  const navigate = useNavigate();

  const updateBookshelf = (book: BookData) => {
    const existingBook = books.find((b) => b.id === book.id);
    return {
      ...book,
      shelf: existingBook ? existingBook.shelf : 'none',
    };
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
        {/* ! Search Bar */}

        <Navbar bg="dark">
          <Container>
            <Link title="Back" to={PATHS.list}>
              <Button className="text-nowrap me-4" variant="dark">
                <FontAwesomeIcon className="me-1" icon={faCircleChevronLeft} />
                Back
              </Button>
            </Link>
            <Form className="d-flex flex w-100">
              <Form.Control
                type="search"
                className="me-2"
                aria-label="Search"
                id={SEARCH_INPUT}
                autoFocus={true}
                placeholder="Search by title, author, or ISBN"
                value={search}
                onChange={handleSearch}
              />
            </Form>
          </Container>
        </Navbar>

        {loading ? (
          <Player
            src="https://assets7.lottiefiles.com/private_files/lf30_x8aowqs9.json"
            className="player"
            style={{ height: '500px', width: '500px' }}
            loop
            autoplay
          />
        ) : (
          <BookGrid
            className="search-books-results"
            books={results.map(updateBookshelf)}
          />
        )}
      </div>
    </DndProvider>
  );
}
