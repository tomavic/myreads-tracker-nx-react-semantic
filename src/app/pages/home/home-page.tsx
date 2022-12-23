import { Link } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { PATHS } from 'src/app/models/conf';
import Shelf from '../../components/shelf/shelf';
import { shelves } from 'src/app/models/book';
import { useBooksContext } from 'src/app/context/booksContext';
import { Player } from '@lottiefiles/react-lottie-player';

export default function HomePage() {
  const { loading } = useBooksContext();
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <DndProvider backend={HTML5Backend}>
          {loading ? (
            <Player
              src="https://assets4.lottiefiles.com/packages/lf20_4XmSkB.json"
              className="player"
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
      <div className="open-search">
        <Link to={PATHS.search}>Add a book</Link>
      </div>
    </div>
  );
}
