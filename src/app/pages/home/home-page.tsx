import { Link } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { PATHS } from 'src/app/models/conf';
import Shelf from '../../components/shelf/shelf';
import { shelves } from 'src/app/models/book';
import { useBooksContext } from 'src/app/context/books-context';
import { Player } from '@lottiefiles/react-lottie-player';
import { Container, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

export default function HomePage() {
  const { loading, getMyBooks } = useBooksContext();

  useEffect(() => {
    const interval = setInterval(() => {
      getMyBooks();
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="list-books">
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand>
            <img
              src="/public/favicon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top rounded"
              alt="MyBooks Tracker"
            />{' '}
            <span className="text-light text-center"> MyBooks Tracker</span>
          </Navbar.Brand>

          <Link to={PATHS.search}>
            <FontAwesomeIcon className="text-light" icon={faSearch} />
          </Link>
        </Container>
      </Navbar>

      <div className="list-books-content mt-5">
        <DndProvider backend={HTML5Backend}>
          {loading ? (
            <Player
              src="https://assets4.lottiefiles.com/packages/lf20_4XmSkB.json"
              className="player"
              style={{ height: '300px', width: '300px' }}
              loop
              autoplay
            />
          ) : (
            <div>
              <Shelf id={'currentlyReading'} title={shelves.currentlyReading} />
              <Shelf id={'wantToRead'} title={shelves.wantToRead} />
              <Shelf id={'read'} title={shelves.read} />
            </div>
          )}
        </DndProvider>
      </div>
      <div className="open-search"></div>
    </div>
  );
}
